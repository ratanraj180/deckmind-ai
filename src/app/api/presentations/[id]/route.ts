import { NextRequest, NextResponse } from 'next/server';
import { Presentation } from '@/lib/db/client';
import connectToDatabase from '@/lib/db/mongodb';

// GET /api/presentations/[id] - Fetch single presentation with full slides
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const presentation = await Presentation.findOne({ id }).lean();

    if (!presentation) {
      return NextResponse.json(
        { success: false, error: 'Presentation not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      presentation,
    });
  } catch (error: any) {
    console.error(`[DeckMind API] Failed to fetch presentation ${id}:`, error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch presentation' },
      { status: 500 }
    );
  }
}
