export interface ExtractedTable {
  headers: string[];
  rows: string[][];
}

export interface StructuredSection {
  id: string;
  title: string;
  content: string;
  pageNumber?: number;
  wordCount: number;
  subsections?: { title: string; content: string }[];
  tables?: ExtractedTable[];
}

export interface StructuredDocumentMetadata {
  author?: string;
  creationDate?: string;
  wordCount: number;
  readingTimeMinutes: number;
  characterCount: number;
}

export interface StructuredDocument {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: number;
  pageCount: number;
  title: string;
  summary: string;
  detectedSections: StructuredSection[];
  metadata: StructuredDocumentMetadata;
  rawTextPreview: string;
  analyzedAt: string;
}

export interface DocumentParser {
  supports(fileType: string): boolean;
  parse(buffer: Buffer, fileName: string, fileSize: number): Promise<StructuredDocument>;
}
