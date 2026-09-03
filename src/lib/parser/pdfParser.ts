import { DocumentAnalysis, DocumentPage } from '@/types/document';
import { extractDocumentSections, extractDocumentTitleFromText } from './contentExtractor';
import { PDFParse } from 'pdf-parse';

export class PDFParser {
  supports(fileType: string): boolean {
    const ext = fileType.toLowerCase().replace(/^\./, '');
    return ext === 'pdf' || fileType.includes('pdf');
  }

  async parse(buffer: Buffer, fileName: string, fileSize: number): Promise<DocumentAnalysis> {
    console.log(`[DeckMind Parser] File received: ${fileName} (${fileSize} bytes)`);
    console.log('[DeckMind Parser] Type detected: PDF');

    let parser: InstanceType<typeof PDFParse> | null = null;
    try {
      parser = new PDFParse({ data: buffer });
      const textResult = await parser.getText();
      const infoResult = await parser.getInfo().catch(() => null);

      const pageCount = textResult?.total || 1;
      console.log(`[DeckMind Parser] Pages found: ${pageCount}`);

      // Extract individual pages
      const pages: DocumentPage[] = [];
      if (textResult?.pages && Array.isArray(textResult.pages)) {
        for (const p of textResult.pages) {
          const pageText = p.text || '';
          pages.push({
            pageNumber: p.num || pages.length + 1,
            text: pageText,
            characterCount: pageText.length,
          });
        }
      }

      // Combine full text
      const fullText = textResult?.text || pages.map(p => p.text).join('\n\n');
      const cleanText = fullText.replace(/--\s*\d+\s*of\s*\d+\s*--/g, '').trim();

      console.log(`[DeckMind Parser] Characters extracted: ${cleanText.length}`);

      // Validation: Check for empty / scanned PDF
      if (cleanText.length < 50) {
        console.warn('[DeckMind Parser] Warning: Insufficient text detected. Likely scanned PDF.');
        throw new Error(
          'We could not extract readable text from this PDF. This appears to be a scanned or image-only PDF. OCR processing will be required.'
        );
      }

      const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
      const title = extractDocumentTitleFromText(cleanText, fileName);
      const sections = extractDocumentSections(cleanText, pages);

      console.log(`[DeckMind Parser] Sections detected: ${sections.length}`);
      console.log(`[DeckMind Parser] Extracted title: "${title}"`);

      const summary =
        sections.length > 0 && sections[0].content
          ? sections[0].content.slice(0, 320) + '...'
          : cleanText.slice(0, 320) + '...';

      return {
        id: `pdf-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        fileName,
        fileType: 'pdf',
        fileSize,
        pageCount,
        title,
        summary,
        fullText: cleanText,
        pages,
        sections,
        metadata: {
          author: (infoResult?.info as { Author?: string } | undefined)?.Author || undefined,
          creationDate: new Date().toISOString(),
          characterCount: cleanText.length,
          wordCount,
          readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
        },
        extractedAt: new Date().toISOString(),
      };
    } catch (error) {
      const errStr = error instanceof Error ? error.message : String(error);
      if (errStr.toLowerCase().includes('password') || errStr.toLowerCase().includes('encrypt')) {
        throw new Error('This PDF is password-protected or encrypted and cannot be read.');
      }
      throw error;
    } finally {
      if (parser && typeof (parser as { destroy?: () => Promise<void> }).destroy === 'function') {
        try {
          await (parser as { destroy: () => Promise<void> }).destroy();
        } catch {
          // ignore cleanup errors
        }
      }
    }
  }
}
