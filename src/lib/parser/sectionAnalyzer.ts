import { StructuredSection } from './types';

export function analyzeTextSections(rawText: string, totalPages = 1): StructuredSection[] {
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
        pageNumber: 1,
        wordCount: 0,
      },
    ];
  }

  // Heading regex patterns (academic numbered sections, uppercase titles, keywords)
  const headingPatterns = [
    /^(?:chapter|section|\d{1,2}(?:\.\d{1,2})*)\s*[:.-]?\s+(.+)$/i,
    /^(abstract|introduction|background|literature review|problem statement|proposed methodology|system architecture|workflow|implementation|experimental results|discussion|conclusion|references|future scope)$/i,
    /^[A-Z0-9\s]{4,60}$/, // All-caps short line
  ];

  const sections: StructuredSection[] = [];
  let currentTitle = 'Introduction';
  let currentParagraphs: string[] = [];
  let currentSectionIndex = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const isHeading =
      (line.length < 80 && headingPatterns.some(p => p.test(line))) ||
      (i === 0 && line.length < 90);

    if (isHeading && currentParagraphs.length > 0) {
      const content = currentParagraphs.join('\n\n');
      sections.push({
        id: `sec-${currentSectionIndex++}`,
        title: cleanHeadingTitle(currentTitle),
        content: content,
        pageNumber: Math.max(1, Math.ceil((i / lines.length) * totalPages)),
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

  // Add the final section
  if (currentParagraphs.length > 0 || sections.length === 0) {
    const content = currentParagraphs.join('\n\n');
    sections.push({
      id: `sec-${currentSectionIndex}`,
      title: cleanHeadingTitle(currentTitle),
      content: content || 'Section content extracted from document.',
      pageNumber: totalPages,
      wordCount: content.split(/\s+/).filter(Boolean).length,
    });
  }

  // If fewer than 3 sections detected, synthesize standard academic divisions
  if (sections.length < 2 && rawText.length > 300) {
    return partitionLargeContent(rawText, totalPages);
  }

  return sections;
}

function cleanHeadingTitle(title: string): string {
  return title
    .replace(/^(\d+(\.\d+)*\s*[:.-]?\s*)/, '')
    .replace(/^chapter\s*\d+\s*[:.-]?\s*/i, '')
    .trim() || 'Key Findings';
}

function partitionLargeContent(rawText: string, totalPages: number): StructuredSection[] {
  const paragraphs = rawText.split(/\n\s*\n/).filter(p => p.trim().length > 0);
  const titles = [
    'Document Abstract & Scope',
    'Core Methodology & Architecture',
    'Experimental Findings & Results',
    'Summary & Conclusions',
  ];

  const chunkSize = Math.ceil(paragraphs.length / titles.length);
  const sections: StructuredSection[] = [];

  for (let i = 0; i < titles.length; i++) {
    const chunk = paragraphs.slice(i * chunkSize, (i + 1) * chunkSize).join('\n\n');
    if (chunk.trim().length > 0) {
      sections.push({
        id: `sec-${i + 1}`,
        title: titles[i],
        content: chunk,
        pageNumber: Math.max(1, Math.round(((i + 1) / titles.length) * totalPages)),
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
          content: rawText.slice(0, 2000),
          pageNumber: 1,
          wordCount: rawText.split(/\s+/).filter(Boolean).length,
        },
      ];
}

export function extractDocumentTitle(rawText: string, fileName: string): string {
  const lines = rawText
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l.length > 4 && l.length < 120);

  if (lines.length > 0) {
    const candidate = lines[0];
    if (!candidate.toLowerCase().includes('page') && !candidate.startsWith('http')) {
      return candidate;
    }
  }

  return fileName.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
}
