import { PDFParser } from './pdfParser';
import { DOCXParser } from './docxParser';

export class DocumentParserFactory {
  private static pdfParser = new PDFParser();
  private static docxParser = new DOCXParser();

  public static getParser(fileName: string, mimeType?: string) {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';

    if (this.pdfParser.supports(ext) || (mimeType && this.pdfParser.supports(mimeType))) {
      return this.pdfParser;
    }

    if (this.docxParser.supports(ext) || (mimeType && this.docxParser.supports(mimeType))) {
      return this.docxParser;
    }

    throw new Error('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
  }

  public static validateFile(fileName: string, sizeBytes: number): void {
    const maxBytes = 25 * 1024 * 1024; // 25 MB
    if (sizeBytes > maxBytes) {
      throw new Error('File size exceeds the 25 MB limit.');
    }

    const ext = fileName.split('.').pop()?.toLowerCase();
    if (!ext || !['pdf', 'docx', 'doc'].includes(ext)) {
      throw new Error('Unsupported file format. Please upload a PDF or DOCX file.');
    }
  }
}
