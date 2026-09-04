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

    // 3. Log download history and update user & presentation metrics in MongoDB
    try {
      const session = await getSession();
      const userId = session?.user?.id;
      const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
      const userAgent = request.headers.get('user-agent') || 'unknown';

      // Check for rapid duplicate download triggers within a 5-second window
      const fiveSecondsAgo = new Date(Date.now() - 5000);
      const recentLog = await db.downloadHistory.count({
        presentationId: id,
        ...(userId ? { userId } : { ipAddress: ip }),
        downloadedAt: { $gte: fiveSecondsAgo },
      }).catch(() => 0);

      if (recentLog === 0) {
        // Detect if presentation payment was simulated demo or gateway
        const lastPayment = await db.payment.findFirst({
          where: { presentationId: id, status: 'SUCCESSFUL' },
        }).catch(() => null);

        const isDemo = lastPayment?.isDemo === true || lastPayment?.provider === 'upi_demo';
        const paymentMethod = lastPayment?.provider || 'direct';

        await db.downloadHistory.log({
          presentationId: id,
          userId,
          fileName,
          fileSize: pptxBuffer.length,
          templateId,
          templateFamily: templateSnapshot?.family,
          isDemo,
          paymentMethod,
          ipAddress: ip,
          userAgent,
        });

        // Check if user previously downloaded this specific presentation
        let isFirstTimeForUser = false;
        if (userId) {
          const prevUserDownloads = await db.downloadHistory.count({
            presentationId: id,
            userId,
          }).catch(() => 0);
          // If count was 1 (the one just inserted), this is their first time downloading this deck
          isFirstTimeForUser = prevUserDownloads <= 1;
          await db.user.incrementDownloadCount(userId, isFirstTimeForUser).catch(err =>
            console.warn('[DeckMind Download] Could not update user download counts:', err?.message)
          );
        }

        await db.presentation.upsert({
          where: { id },
          create: {
            id,
            userId: userId || undefined,
            title,
            templateId,
            downloadCount: 1,
            lastDownloadedAt: new Date(),
            status: 'DOWNLOADED',
            slideCount: slides.length,
          },
          update: {
            $inc: { downloadCount: 1 },
            lastDownloadedAt: new Date(),
            status: 'DOWNLOADED',
          },
        });
      }
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
