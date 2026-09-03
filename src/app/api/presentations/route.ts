import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth/session';
import { db, Presentation } from '@/lib/db/client';
import connectToDatabase from '@/lib/db/mongodb';

// GET /api/presentations - Fetch user's saved presentations
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const userId = session?.user?.id;

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const filter: Record<string, any> = {};
    if (userId) {
      filter.userId = userId;
    }

    const presentations = await Presentation.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      presentations: presentations.map(p => ({
        id: p.id,
        title: p.title,
        description: p.description,
        slideCount: p.slideCount || p.slides?.length || 0,
        status: p.status,
        template: p.template,
        document: p.document,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      })),
    });
  } catch (error: any) {
    console.error('[DeckMind API] Failed to fetch presentations:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch presentations' },
      { status: 500 }
    );
  }
}

// POST /api/presentations - Save or update generated presentation in MongoDB Atlas
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const session = await getSession();
    const userId = session?.user?.id || null;

    const body = await request.json();
    const { project } = body;

    if (!project || !project.id || !project.title) {
      return NextResponse.json(
        { success: false, error: 'Valid project object with id and title is required.' },
        { status: 400 }
      );
    }

    const saved = await db.presentation.upsert({
      where: { id: project.id },
      create: {
        id: project.id,
        userId,
        title: project.title,
        description: project.description || '',
        document: project.document || {},
        config: project.config || {},
        template: project.template || {},
        slides: project.slides || [],
        slideCount: project.slides?.length || 0,
        status: project.isPaid ? 'PAID' : 'GENERATED',
      },
      update: {
        title: project.title,
        description: project.description || '',
        document: project.document || {},
        config: project.config || {},
        template: project.template || {},
        slides: project.slides || [],
        slideCount: project.slides?.length || 0,
        updatedAt: new Date(),
      },
    });

    console.log(`[DeckMind DB] ✓ Presentation saved to MongoDB: "${project.title}" (${project.id})`);

    return NextResponse.json({
      success: true,
      message: 'Presentation saved to MongoDB Atlas',
      presentationId: project.id,
    });
  } catch (error: any) {
    console.error('[DeckMind API] Failed to save presentation:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to save presentation to database' },
      { status: 500 }
    );
  }
}
