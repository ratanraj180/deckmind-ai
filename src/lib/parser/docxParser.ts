import { DocumentAnalysis, DocumentPage, DocumentSection } from '@/types/document';
import { extractDocumentTitleFromText, extractKeyPointsFromText } from './contentExtractor';
import mammoth from 'mammoth';

export class DOCXParser {
  supports(fileType: string): boolean {
    const ext = fileType.toLowerCase().replace(/^\./, '');
    return ext === 'docx' || fileType.includes('wordprocessingml') || ext === 'doc';
  }

  async parse(buffer: Buffer, fileName: string, fileSize: number): Promise<DocumentAnalysis> {
    console.log(`[DeckMind Parser] File received: ${fileName} (${fileSize} bytes)`);
    console.log('[DeckMind Parser] Type detected: DOCX');

    try {
      // Extract raw text
      const rawResult = await mammoth.extractRawText({ buffer });
      const rawText = rawResult.value ? rawResult.value.trim() : '';

      // Extract HTML structure to capture headings & tables
      const htmlResult = await mammoth.convertToHtml({ buffer });
      const html = htmlResult.value || '';

      if (rawText.length < 30) {
        throw new Error('This Word document contains no readable text or is corrupted.');
      }

      console.log(`[DeckMind Parser] Characters extracted: ${rawText.length}`);

      const wordCount = rawText.split(/\s+/).filter(Boolean).length;
      const estimatedPageCount = Math.max(1, Math.ceil(wordCount / 400));
      console.log(`[DeckMind Parser] Estimated pages: ${estimatedPageCount}`);

      const title = extractDocumentTitleFromText(rawText, fileName);

      // Parse headings from HTML
      const sections = this.parseHtmlSections(html, rawText, estimatedPageCount);
      console.log(`[DeckMind Parser] Sections detected: ${sections.length}`);
      console.log(`[DeckMind Parser] Extracted title: "${title}"`);

      // Synthesize pages from paragraphs
      const pages: DocumentPage[] = this.synthesizePages(rawText, estimatedPageCount);

      const summary =
        sections.length > 0 && sections[0].content
          ? sections[0].content.slice(0, 320) + '...'
          : rawText.slice(0, 320) + '...';

      return {
        id: `docx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        fileName,
        fileType: 'docx',
        fileSize,
        pageCount: estimatedPageCount,
        title,
        summary,
        fullText: rawText,
        pages,
        sections,
        metadata: {
          characterCount: rawText.length,
          wordCount,
          readingTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
        },
        extractedAt: new Date().toISOString(),
      };
    } catch (error) {
      console.error('[DeckMind Parser] DOCX parsing error:', error);
      throw new Error(`Failed to read Word document (.docx): ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private parseHtmlSections(
    html: string,
    fallbackText: string,
    totalPages: number
  ): DocumentSection[] {
    const sections: DocumentSection[] = [];
    const headingRegex = /<h[1-3][^>]*>(.*?)<\/h[1-3]>/gi;
    const matches: { index: number; title: string }[] = [];
    let match: RegExpExecArray | null;

    while ((match = headingRegex.exec(html)) !== null) {
      const cleanTitle = match[1].replace(/<[^>]*>/g, '').trim();
      if (cleanTitle.length > 0 && cleanTitle.length < 90) {
        matches.push({ index: match.index, title: cleanTitle });
      }
    }

    if (matches.length > 0) {
      for (let i = 0; i < matches.length; i++) {
        const start = matches[i].index;
        const end = i < matches.length - 1 ? matches[i + 1].index : html.length;
        const sectionHtml = html.substring(start, end);
        const textContent = sectionHtml
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();

        const words = textContent.split(/\s+/).filter(Boolean);
        const estPage = Math.max(1, Math.round(((i + 1) / matches.length) * totalPages));

        sections.push({
          id: `sec-${i + 1}`,
          title: matches[i].title,
          content: textContent,
          pageNumbers: [estPage],
          keyPoints: extractKeyPointsFromText(textContent),
          wordCount: words.length,
        });
      }
    } else {
      // Fallback to paragraph divisions
      const paragraphs = fallbackText.split(/\n\s*\n/).filter(p => p.trim().length > 30);
      const defaultTitles = [
        'Document Abstract & Introduction',
        'Problem Formulation & Background',
        'Proposed Architecture & Methodology',
        'Empirical Results & Discussion',
        'Conclusion & Future Scope',
      ];

      const chunkSize = Math.max(1, Math.ceil(paragraphs.length / defaultTitles.length));
      for (let i = 0; i < defaultTitles.length; i++) {
        const chunk = paragraphs.slice(i * chunkSize, (i + 1) * chunkSize).join(' ');
        if (chunk.trim().length > 0) {
          sections.push({
            id: `sec-${i + 1}`,
            title: defaultTitles[i],
            content: chunk,
            pageNumbers: [Math.max(1, Math.round(((i + 1) / defaultTitles.length) * totalPages))],
            keyPoints: extractKeyPointsFromText(chunk),
            wordCount: chunk.split(/\s+/).filter(Boolean).length,
          });
        }
      }
    }

    return sections;
  }

  private synthesizePages(rawText: string, pageCount: number): DocumentPage[] {
    const charsPerPage = Math.ceil(rawText.length / Math.max(1, pageCount));
    const pages: DocumentPage[] = [];

    for (let i = 0; i < pageCount; i++) {
      const chunk = rawText.substring(i * charsPerPage, (i + 1) * charsPerPage);
      pages.push({
        pageNumber: i + 1,
        text: chunk,
        characterCount: chunk.length,
      });
    }

    return pages;
  }
}
