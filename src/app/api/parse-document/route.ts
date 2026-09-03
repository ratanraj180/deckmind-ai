import { NextRequest, NextResponse } from 'next/server';
import { DocumentParserFactory } from '@/lib/parser/documentParserFactory';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file was uploaded.' },
        { status: 400 }
      );
    }

    // Validate size and format
    try {
      DocumentParserFactory.validateFile(file.name, file.size);
    } catch (valErr) {
      return NextResponse.json(
        { success: false, error: valErr instanceof Error ? valErr.message : 'Invalid file' },
        { status: 400 }
      );
    }

    // Convert to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get appropriate parser
    const parser = DocumentParserFactory.getParser(file.name, file.type);

    // Parse complete document
    const structuredDoc = await parser.parse(buffer, file.name, file.size);

    return NextResponse.json({
      success: true,
      document: structuredDoc,
    });
  } catch (error) {
    console.error('Document ingestion error:', error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : 'This document could not be read. Please try another file.',
      },
      { status: 500 }
    );
  }
}
