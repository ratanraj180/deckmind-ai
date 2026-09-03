import { DocumentSection, DocumentPage } from '@/types/document';

export function extractDocumentSections(
  rawText: string,
  pages: DocumentPage[]
): DocumentSection[] {
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 0);

  if (lines.length === 0) {
    return [
      {
        id: 'sec-1',
        title: 'Document Overview',
        content: 'No readable text was detected in the document body.',
        pageNumbers: [1],
        keyPoints: ['No readable text found.'],
        wordCount: 0,
      },
    ];
  }

  // Heading regex patterns:
  // - Numbered headings: "1. Introduction", "2.1 Problem Statement", "Chapter 3: System Design"
  // - Standard academic and project keywords: Abstract, Introduction, Background, etc.
  // - All-caps short titles
  const headingPatterns = [
    /^(?:chapter|section|\d{1,2}(?:\.\d{1,2})*)\s*[:.-]?\s+([A-Za-z0-9\s,&-]+)$/i,
    /^(abstract|introduction|background|literature review|problem statement|proposed methodology|system architecture|workflow|implementation|experimental results|discussion|conclusion|references|future scope|system design|dataset|evaluation|security)$/i,
    /^[A-Z0-9\s,&-]{4,60}$/,
  ];

  const sections: DocumentSection[] = [];
  let currentTitle = lines[0].length < 80 ? lines[0] : 'Introduction';
  let currentParagraphs: string[] = [];
  let sectionIndex = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeading =
      line.length < 80 &&
      headingPatterns.some(p => p.test(line)) &&
      !line.endsWith('.') &&
      !line.includes('http');

    if (isHeading && currentParagraphs.length > 0) {
      const content = currentParagraphs.join(' ');
      const estimatedPage = calculatePageNumber(i, lines.length, pages.length);

      sections.push({
        id: `sec-${sectionIndex++}`,
        title: cleanHeadingTitle(currentTitle),
        content,
        pageNumbers: [estimatedPage],
        keyPoints: extractKeyPointsFromText(content),
        wordCount: content.split(/\s+/).filter(Boolean).length,
      });

      currentTitle = line;
      currentParagraphs = [];
    } else if (isHeading && currentParagraphs.length === 0) {
      currentTitle = line;
    } else {
      currentParagraphs.push(line);
    }
  }

  // Final section
  if (currentParagraphs.length > 0) {
    const content = currentParagraphs.join(' ');
    const estimatedPage = pages.length || 1;

    sections.push({
      id: `sec-${sectionIndex}`,
      title: cleanHeadingTitle(currentTitle),
      content,
      pageNumbers: [estimatedPage],
      keyPoints: extractKeyPointsFromText(content),
      wordCount: content.split(/\s+/).filter(Boolean).length,
    });
  }

  // If too few sections were extracted (e.g. raw text without explicit heading keywords),
  // partition content into logical narrative units
  if (sections.length < 3 && rawText.length > 300) {
    return partitionContentIntoSections(rawText, pages.length);
  }

  return sections;
}

function calculatePageNumber(lineIndex: number, totalLines: number, totalPages: number): number {
  if (totalPages <= 1) return 1;
  return Math.min(totalPages, Math.max(1, Math.ceil((lineIndex / totalLines) * totalPages)));
}

function cleanHeadingTitle(title: string): string {
  return (
    title
      .replace(/^(\d+(\.\d+)*\s*[:.-]?\s*)/, '')
      .replace(/^(chapter|section)\s*\d+\s*[:.-]?\s*/i, '')
      .trim() || 'Key Concepts'
  );
}

export function extractKeyPointsFromText(text: string): string[] {
  // Split into sentences
  const sentences = text
    .split(/(?<=[.?!])\s+/)
    .map(s => s.trim())
    .filter(s => s.length > 25 && s.length < 180 && !s.includes('http'));

  if (sentences.length === 0) {
    return [text.slice(0, 120) + '...'];
  }

  // Pick the most informative sentences
  return sentences.slice(0, 4);
}

function partitionContentIntoSections(rawText: string, totalPages: number): DocumentSection[] {
  const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 30);
  const titles = [
    'Document Abstract & Executive Summary',
    'Core Methodology & Architectural Design',
    'Implementation & Experimental Pipeline',
    'Results, Discussion & Key Findings',
    'Conclusion & Future Scope',
  ];

  const chunkSize = Math.max(1, Math.ceil(paragraphs.length / titles.length));
  const sections: DocumentSection[] = [];

  for (let i = 0; i < titles.length; i++) {
    const chunk = paragraphs.slice(i * chunkSize, (i + 1) * chunkSize).join(' ');
    if (chunk.trim().length > 0) {
      sections.push({
        id: `sec-${i + 1}`,
        title: titles[i],
        content: chunk,
        pageNumbers: [Math.max(1, Math.round(((i + 1) / titles.length) * totalPages))],
        keyPoints: extractKeyPointsFromText(chunk),
        wordCount: chunk.split(/\s+/).filter(Boolean).length,
      });
    }
  }

  return sections.length > 0
    ? sections
    : [
        {
          id: 'sec-1',
          title: 'Document Content',
          content: rawText.slice(0, 1500),
          pageNumbers: [1],
          keyPoints: extractKeyPointsFromText(rawText),
          wordCount: rawText.split(/\s+/).filter(Boolean).length,
        },
      ];
}

export function extractDocumentTitleFromText(rawText: string, fileName: string): string {
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 5 && l.length < 120);

  // Look for the first prominent title-like line
  for (const line of lines.slice(0, 5)) {
    const lower = line.toLowerCase();
    if (
      !lower.startsWith('page') &&
      !lower.startsWith('http') &&
      !lower.includes('all rights reserved') &&
      !lower.startsWith('copyright') &&
      !lower.startsWith('abstract') &&
      !/^\d+$/.test(line)
    ) {
      return line.replace(/^#+\s*/, '').trim();
    }
  }

  // Fallback to cleaned filename
  return fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
}
