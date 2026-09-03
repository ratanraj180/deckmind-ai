'use client';

import React, { useState } from 'react';
import { DocumentAnalysis, DocumentSection, DocumentPage } from '@/types/document';
import {
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Layers,
  Sparkles,
  ArrowRight,
  BookOpen,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatFileSize } from '@/lib/utils';

interface DocumentUnderstandingPreviewProps {
  documentAnalysis: DocumentAnalysis;
  onContinue: () => void;
}

export function DocumentUnderstandingPreview({
  documentAnalysis,
  onContinue,
}: DocumentUnderstandingPreviewProps) {
  const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
  const [showRawTextModal, setShowRawTextModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'fullText' | 'pages'>('fullText');

  const toggleSection = (id: string) => {
    setExpandedSectionId(prev => (prev === id ? null : id));
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs font-mono">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>DeckMind Analysis Complete</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Document Overview & Synthesized Structure
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Real text extracted from <span className="font-semibold text-slate-700">{documentAnalysis.fileName}</span>. All presentations will be generated directly from these sections.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowRawTextModal(true)}
            className="text-xs font-bold text-slate-700 hover:text-indigo-600 shadow-xs border-slate-200"
          >
            <Eye className="h-3.5 w-3.5 mr-1.5 text-indigo-600" />
            <span>View Extracted Content</span>
          </Button>

          <Badge variant="gradient" className="uppercase font-mono text-[10px] font-bold">
            {documentAnalysis.fileType}
          </Badge>
        </div>
      </div>

      {/* Real Document Metadata Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 shadow-2xs">
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            File Name
          </span>
          <span className="text-xs font-bold text-slate-900 truncate block mt-0.5" title={documentAnalysis.fileName}>
            {documentAnalysis.fileName}
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Pages & Characters
          </span>
          <span className="text-xs font-bold text-slate-900 block mt-0.5 font-mono">
            {documentAnalysis.pageCount} pages • {documentAnalysis.metadata.characterCount.toLocaleString()} chars
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Extracted Words
          </span>
          <span className="text-xs font-bold text-indigo-700 block mt-0.5 font-mono">
            {documentAnalysis.metadata.wordCount.toLocaleString()} words
          </span>
        </div>
        <div>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
            Detected Sections
          </span>
          <span className="text-xs font-bold text-emerald-700 block mt-0.5 font-mono">
            {documentAnalysis.sections.length} Academic Sections
          </span>
        </div>
      </div>

      {/* Extracted Document Title & Opening Thesis */}
      <div className="space-y-2 p-5 rounded-2xl bg-gradient-to-br from-indigo-50/60 to-purple-50/40 border border-indigo-150">
        <span className="text-[10px] font-mono uppercase text-indigo-700 font-bold block tracking-wider">
          Extracted Document Title
        </span>
        <h3 className="text-lg font-black text-slate-900 leading-snug tracking-tight">
          {documentAnalysis.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-indigo-100/80 font-medium">
          {documentAnalysis.summary}
        </p>
      </div>

      {/* Detected Sections Checklist */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
            Detected Document Sections ({documentAnalysis.sections.length})
          </h4>
          <span className="text-[11px] text-slate-400 font-medium">Click to expand extracted points</span>
        </div>

        <div className="space-y-2">
          {documentAnalysis.sections.map((sec: DocumentSection, idx: number) => {
            const isExpanded = expandedSectionId === sec.id;

            return (
              <div
                key={sec.id || idx}
                className="rounded-2xl border border-slate-200/90 bg-white overflow-hidden transition-colors shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleSection(sec.id)}
                  className="w-full text-left p-3.5 flex items-center justify-between hover:bg-slate-50/80 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-6 w-6 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/80 shadow-2xs">
                      <CheckCircle2 className="h-4 w-4" />
                    </span>
                    <span className="text-xs font-bold text-slate-900 tracking-tight">{sec.title}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 font-mono">
                    <span>Page {sec.pageNumbers.join(', ')}</span>
                    <span>•</span>
                    <span>{sec.wordCount} words</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-slate-600" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-slate-400" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="p-4 border-t border-slate-100 bg-slate-50/70 space-y-3">
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block tracking-wider">
                        Synthesized Key Points for Presentation Slides
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-700">
                        {sec.keyPoints.map((pt: string, i: number) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span className="leading-relaxed">{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2.5 border-t border-slate-200 text-[11px] text-slate-500 leading-relaxed font-sans max-h-36 overflow-y-auto">
                      <span className="font-bold block text-slate-700 mb-1">Raw Text Snippet:</span>
                      {sec.content}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="text-xs text-slate-500 font-medium">
          Extracted {documentAnalysis.sections.length} sections. Ready to configure audience goals and templates.
        </span>
        <Button
          variant="accent"
          size="lg"
          onClick={onContinue}
          className="w-full sm:w-auto shadow-md font-bold px-6"
        >
          <span>Continue to Presentation Setup</span>
          <ArrowRight className="h-4 w-4 ml-1.5" />
        </Button>
      </div>

      {/* Raw Extracted Text Modal for Debugging & User Trust */}
      {showRawTextModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div>
                <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                  Extracted Content Preview: {documentAnalysis.fileName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-mono">
                  Showing actual text extracted by DeckMind ({documentAnalysis.metadata.characterCount.toLocaleString()} characters)
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowRawTextModal(false)}
                className="text-slate-400 hover:text-slate-700 rounded-xl"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex border-b border-slate-100 px-5 pt-2 gap-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('fullText')}
                className={`pb-2.5 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'fullText'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Full Extracted Text ({documentAnalysis.metadata.wordCount.toLocaleString()} words)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('pages')}
                className={`pb-2.5 border-b-2 cursor-pointer transition-colors ${
                  activeTab === 'pages'
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-900'
                }`}
              >
                Page Breakdown ({documentAnalysis.pages.length} pages)
              </button>
            </div>

            <div className="p-5 overflow-y-auto max-h-[60vh] text-xs font-mono text-slate-700 bg-slate-50/50 leading-relaxed whitespace-pre-wrap">
              {activeTab === 'fullText' ? (
                documentAnalysis.fullText
              ) : (
                <div className="space-y-6">
                  {documentAnalysis.pages.map((page: DocumentPage) => (
                    <div key={page.pageNumber} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs">
                      <div className="text-[10px] font-bold text-indigo-600 uppercase border-b border-slate-100 pb-1.5 mb-2 font-mono">
                        Page {page.pageNumber} ({page.characterCount} chars)
                      </div>
                      <div className="text-[11px] text-slate-700 whitespace-pre-wrap leading-relaxed">{page.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end bg-slate-50/80">
              <Button variant="secondary" size="sm" onClick={() => setShowRawTextModal(false)} className="font-semibold">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
