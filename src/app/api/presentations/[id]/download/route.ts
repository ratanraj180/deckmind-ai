import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { db } from '@/lib/db/client';
import { generatePptxFromProject } from '@/lib/pptx/pptxGenerator';
import { PresentationProject, SlideData, TemplateSnapshot } from '@/types/presentation';

interface DownloadPayload {
  project?: PresentationProject;
  title?: string;
  templateId?: string;
  templateSnapshot?: TemplateSnapshot;
  slides?: SlideData[];
  config?: Record<string, unknown>;
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const body = (await request.json().catch(() => ({}))) as DownloadPayload;
    const project = body.project;

    // 1. Extract presentation details with priority given to client project
    const title = project?.title || body.title || 'DeckMind Presentation';
    const templateId =
      project?.template?.id ||
      project?.config?.templateId ||
      body.templateId ||
      'swiss-red';
    const templateSnapshot = project?.template || body.templateSnapshot;
    const slides = project?.slides || body.slides || [];
    const config = (project?.config || body.config || {}) as Record<string, unknown>;

    // Verify payment before allowing download when Razorpay is configured
    if (process.env.RAZORPAY_KEY_SECRET) {
      const isProjectPaid = project?.isPaid === true;
      if (!isProjectPaid) {
        const dbPresentation = await db.presentation.findUnique({
          where: { id },
          select: { status: true },
        }).catch(() => null);

        if (!dbPresentation || dbPresentation.status !== 'PAID') {
          return NextResponse.json(
            { success: false, error: 'Payment of ₹10 is required to download this presentation.' },
            { status: 402 }
          );
        }
      }
    }

    // 2. Generate standards-compliant PPTX
    const pptxBuffer = await generatePptxFromProject({
      title,
      templateId,
      slides,
      config,
      templateSnapshot,
    });

    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').slice(0, 50);
    const fileName = `${safeTitle || 'Presentation'}_DeckMind.pptx`;

    // 3. Log download history and update presentation download count in MongoDB Atlas
    try {
      const session = await getSession();
      const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      await db.downloadHistory.log({
        presentationId: id,
        userId: session?.user?.id,
        fileName,
        fileSize: pptxBuffer.length,
        templateId,
        templateFamily: templateSnapshot?.family,
        ipAddress: ip,
        userAgent,
      });

      await db.presentation.upsert({
        where: { id },
        create: {
          id,
          title,
          templateId,
          downloadCount: 1,
          lastDownloadedAt: new Date(),
          status: 'DOWNLOADED',
          slideCount: slides.length,
        },
        update: {
          downloadCount: 1,
          lastDownloadedAt: new Date(),
          status: 'DOWNLOADED',
        },
      });
    } catch (logErr) {
      console.warn('[DeckMind Download] Could not log download history to MongoDB:', logErr);
    }

    console.log(`[DeckMind Download] ✓ Streaming PPTX: ${fileName} (${pptxBuffer.length} bytes, template=${templateId})`);

    return new NextResponse(new Uint8Array(pptxBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(pptxBuffer.length),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[DeckMind Download] PPTX generation error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate presentation file.' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const session = await getSession();
    const userId = session?.user?.id;

    // Check if presentation exists in database
    let title = 'DeckMind Presentation';
    let templateId = 'swiss-red';
    let slides: SlideData[] = [];
    let config: Record<string, unknown> = {};

    if (userId) {
      const presentation = await db.presentation.findUnique({
        where: { id },
      });

      if (presentation) {
        title = presentation.title;
        templateId = presentation.templateId || 'swiss-red';
        try {
          slides = JSON.parse(presentation.slidesJson || '[]');
          config = JSON.parse(presentation.configJson || '{}');
        } catch {}
      }
    }

    // Generate PPTX
    const pptxBuffer = await generatePptxFromProject({
      title,
      templateId,
      slides,
      config,
    });

    const safeTitle = title.replace(/[^a-z0-9]/gi, '_').replace(/_+/g, '_').slice(0, 50);
    const fileName = `${safeTitle || 'Presentation'}_DeckMind.pptx`;

    return new NextResponse(new Uint8Array(pptxBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Content-Length': String(pptxBuffer.length),
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('[DeckMind Download] GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate presentation file.' },
      { status: 500 }
    );
  }
}
