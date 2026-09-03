export interface DocumentPage {
  pageNumber: number;
  text: string;
  characterCount: number;
}

export interface ExtractedTable {
  headers: string[];
  rows: string[][];
}

export interface DocumentSection {
  id: string;
  title: string;
  content: string;
  pageNumbers: number[];
  keyPoints: string[];
  wordCount: number;
  tables?: ExtractedTable[];
}

export interface DocumentMetadata {
  author?: string;
  creationDate?: string;
  characterCount: number;
  wordCount: number;
  readingTimeMinutes: number;
}

export interface DocumentAnalysis {
  id: string;
  fileName: string;
  fileType: 'pdf' | 'docx' | 'txt';
  fileSize: number;
  pageCount: number;
  title: string;
  summary: string;
  fullText: string;
  pages: DocumentPage[];
  sections: DocumentSection[];
  metadata: DocumentMetadata;
  isScanned?: boolean;
  needsOcr?: boolean;
  extractedAt: string;
}

export interface ParseResult {
  success: boolean;
  document?: DocumentAnalysis;
  error?: string;
  errorCode?: 'SCANNED_PDF' | 'PASSWORD_PROTECTED' | 'CORRUPTED' | 'UNSUPPORTED' | 'SIZE_LIMIT' | 'UNKNOWN';
}
