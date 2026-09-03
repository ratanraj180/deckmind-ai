'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileUp,
  FileText,
  X,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
  BookOpen,
  Layers,
  Sparkles,
  Wand2,
  Sliders,
  Compass,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePresentation } from '@/context/PresentationContext';
import { formatFileSize } from '@/lib/utils';
import { parseDocumentFile } from '@/lib/parser/clientParser';
import { createAnalysisFromPrompt } from '@/lib/parser/promptParser';
import { PresentationPurpose } from '@/types/presentation';

export function UploadDropzone() {
  const router = useRouter();
  const {
    document,
    setDocument,
    documentAnalysis,
    setDocumentAnalysis,
    loadSampleDocument,
    updateConfig,
  } = usePresentation();

  const [mode, setMode] = useState<'upload' | 'prompt'>('upload');

  // Document Upload State
  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingStage, setParsingStage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Prompt Mode State
  const [promptTopic, setPromptTopic] = useState('');
  const [promptInstructions, setPromptInstructions] = useState('');
  const [promptSlideCount, setPromptSlideCount] = useState<number>(10);
  const [promptPurpose, setPromptPurpose] = useState<PresentationPurpose>('project_viva');
  const [isGeneratingPrompt, setIsGeneratingPrompt] = useState(false);

  // Quick Suggestion Chips
  const promptSuggestions = [
    {
      topic: 'Autonomous Quadcopter Navigation using Visual SLAM',
      desc: 'Focus on sensor fusion, ROS2 architecture, Jetson edge deployment, and viva defense.',
    },
    {
      topic: 'Real-Time Edge AI Smart Attendance System',
      desc: 'Include camera ingestion pipeline, FAISS vector embeddings, latency benchmarks, and SQLite ledger.',
    },
    {
      topic: 'Event-Driven Microservices with Kafka & Kubernetes',
      desc: 'Deconstruct cluster topology, CQRS pattern, fault-tolerance SLAs, and disaster recovery.',
    },
    {
      topic: 'AI Startup Pitch: Presentation Intelligence Platform',
      desc: 'Highlight market opportunity, LLM orchestration, unit economics, and 2026 product roadmap.',
    },
  ];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = async (file: File) => {
    setError(null);
    const validExtensions = ['.pdf', '.docx'];
    const hasValidExt = validExtensions.some(ext =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!hasValidExt) {
      setError('Unsupported file format. Please upload a PDF (.pdf) or Word document (.docx).');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('File size exceeds the 25 MB limit.');
      return;
    }

    setIsParsing(true);
    setParsingStage('Reading document structure...');

    try {
      const analysis = await parseDocumentFile(file, stage => {
        setParsingStage(stage);
      });

      setDocumentAnalysis(analysis);
      setIsParsing(false);
    } catch (err: any) {
      console.error('[DeckMind] File parsing error:', err);
      setError(err?.message || 'Failed to extract text from document. Please try again or load sample.');
      setIsParsing(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      await processFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await processFile(file);
    }
  };

  const handleRemoveFile = () => {
    setDocument(null);
    setDocumentAnalysis(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handlePromptSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptTopic.trim()) {
      setError('Please enter a presentation topic or project title.');
      return;
    }

    setIsGeneratingPrompt(true);
    setError(null);

    try {
      // Synthesize rich DocumentAnalysis from the user's prompt
      const analysis = createAnalysisFromPrompt(
        promptTopic,
        promptInstructions,
        promptSlideCount,
        promptPurpose
      );

      setDocumentAnalysis(analysis);
      updateConfig('purpose', promptPurpose);
      updateConfig('duration', promptSlideCount <= 6 ? '5m' : promptSlideCount <= 10 ? '10m' : '15m');
      updateConfig('customInstructions', promptInstructions);

      setIsGeneratingPrompt(false);
      router.push('/create');
    } catch (err) {
      console.error('[DeckMind Prompt] Synthesis failed:', err);
      setError('Failed to synthesize presentation from prompt. Please try again.');
      setIsGeneratingPrompt(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Mode Switcher Tabs */}
      {!documentAnalysis && !isParsing && (
        <div className="flex items-center p-1 bg-white/80 rounded-2xl w-fit mx-auto border border-slate-200/80 shadow-xs backdrop-blur-sm">
          <button
            type="button"
            onClick={() => {
              setMode('upload');
              setError(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'upload'
                ? 'bg-white text-slate-950 shadow-md border border-slate-200/80'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <FileUp className={`h-4 w-4 ${mode === 'upload' ? 'text-blue-600' : 'text-slate-400'}`} />
            <span>Upload Document (PDF / DOCX)</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('prompt');
              setError(null);
            }}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              mode === 'prompt'
                ? 'bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/20'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
            }`}
          >
            <Sparkles className={`h-4 w-4 ${mode === 'prompt' ? 'text-white' : 'text-purple-600'}`} />
            <span>Generate with AI Prompt</span>
          </button>
        </div>
      )}

      {/* ── MODE 1: FILE DROPZONE ─────────────────────────────────── */}
      {mode === 'upload' && !documentAnalysis && !isParsing && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`group relative flex flex-col items-center justify-center rounded-3xl border-2 border-dashed p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 bg-white/90 backdrop-blur-sm ${
            isDragging
              ? 'border-blue-500 bg-blue-50/60 ring-4 ring-blue-100/70 scale-[1.01]'
              : 'border-[#d9d3c7] hover:border-amber-400 hover:bg-amber-50/30 shadow-xs'
          }`}
        >
          <div
            className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-200 ${
              isDragging
                ? 'bg-gradient-to-tr from-blue-600 to-violet-600 text-white scale-110 shadow-lg shadow-violet-500/30'
                : 'bg-amber-50 text-amber-700 group-hover:bg-gradient-to-tr group-hover:from-blue-600 group-hover:to-violet-600 group-hover:text-white group-hover:shadow-md border border-amber-200/70'
            }`}
          >
            <FileUp className="h-8 w-8 transition-transform group-hover:scale-105" />
          </div>

          <h3 className="text-xl font-extrabold text-slate-900 mb-1 tracking-tight">
            Drop your document here
          </h3>

          <p className="text-xs text-slate-500 mb-5 font-mono">
            PDF or DOCX · Maximum 25 MB · Confidential & Encrypted
          </p>

          <Button
            variant="secondary"
            size="sm"
            className="border-slate-200 pointer-events-none group-hover:border-indigo-300 font-bold px-5 shadow-xs"
          >
            Browse files
          </Button>

          {error && (
            <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-rose-50 p-3.5 text-xs text-rose-700 border border-rose-200 max-w-md text-left shadow-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-rose-600" />
              <div>
                <span className="font-bold block">Notice:</span>
                <span>{error}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── MODE 2: AI PROMPT BUILDER ─────────────────────────────── */}
      {mode === 'prompt' && !documentAnalysis && !isParsing && (
        <form
          onSubmit={handlePromptSubmit}
          className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-sm p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden"
        >
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-bar" />

          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 shadow-xs">
                <Wand2 className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Describe the presentation you want to create
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              DeckMind will synthesize a structured outline, technical sections, and presentation storyline from your prompt.
            </p>
          </div>

          {/* Topic / Title Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
              Presentation Topic or Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={promptTopic}
              onChange={e => setPromptTopic(e.target.value)}
              placeholder="e.g. Autonomous Quadcopter Navigation using Deep Learning & Visual SLAM"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 shadow-2xs font-medium"
            />
          </div>

          {/* Custom Prompt / Instructions Textarea */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
                Key Points, Outline, or Custom Instructions (Optional)
              </label>
              <span className="text-[10px] text-slate-400 font-mono">Detailed outline</span>
            </div>
            <textarea
              rows={3}
              value={promptInstructions}
              onChange={e => setPromptInstructions(e.target.value)}
              placeholder="e.g. Include problem statement on sensor drift, ROS2 node architecture, latency benchmarks on Jetson Nano, and 4 questions examiners might ask during viva defense."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50/50 leading-relaxed shadow-2xs"
            />
          </div>

          {/* Prompt Preset Suggestions */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono text-slate-400 font-bold block">
              Quick Suggestions (Click to auto-populate):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {promptSuggestions.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setPromptTopic(s.topic);
                    setPromptInstructions(s.desc);
                  }}
                  className="text-left p-3 rounded-2xl border border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/40 hover:shadow-xs transition-all text-xs group cursor-pointer bg-white"
                >
                  <span className="font-bold text-slate-800 group-hover:text-indigo-600 block truncate">
                    {s.topic}
                  </span>
                  <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                    {s.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Configuration Controls: Slide Count & Purpose */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-150">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 font-mono">Target Deck Size</label>
              <div className="grid grid-cols-3 gap-2">
                {[6, 10, 14].map(num => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPromptSlideCount(num)}
                    className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      promptSlideCount === num
                        ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white border-transparent shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {num} Slides
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 font-mono">Presentation Goal</label>
              <select
                value={promptPurpose}
                onChange={e => setPromptPurpose(e.target.value as PresentationPurpose)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs bg-white text-slate-700 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              >
                <option value="project_viva">Project Viva Defense (Academic)</option>
                <option value="engineering_seminar">Engineering Seminar / Technical Talk</option>
                <option value="research_defense">Research Paper Defense</option>
                <option value="executive_brief">Executive / Startup Pitch</option>
              </select>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
              <span>{error}</span>
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isGeneratingPrompt}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 hover:opacity-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isGeneratingPrompt ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Synthesizing Outline & Sections...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate Presentation with AI</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* ── State 2: Document Ingestion In Progress ───────────────── */}
      {isParsing && (
        <div className="rounded-3xl border-2 border-blue-400 bg-white/90 backdrop-blur-md p-12 text-center shadow-xl shadow-blue-500/10 space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/25">
            <Loader2 className="h-7 w-7 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">{parsingStage}</h3>
            <p className="text-xs text-slate-500">
              DeckMind is extracting headings, paragraphs, and tables from every page...
            </p>
          </div>
          <div className="w-56 mx-auto h-2 rounded-full bg-slate-100 overflow-hidden p-0.5">
            <div className="h-full bg-gradient-to-r from-blue-500 via-violet-500 to-amber-400 rounded-full animate-pulse w-4/5" />
          </div>
        </div>
      )}

      {/* ── State 3: Document or Prompt Ready ─────────────────────── */}
      {documentAnalysis && !isParsing && (
        <div className="rounded-3xl border-2 border-emerald-400 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-xl shadow-emerald-500/10 space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 rainbow-bar" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 border border-indigo-200/80 shrink-0 shadow-xs">
                <FileText className="h-7 w-7" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-base font-extrabold text-slate-900 truncate max-w-[280px] sm:max-w-md">
                    {documentAnalysis.title || documentAnalysis.fileName}
                  </h4>
                  <Badge variant="indigo" className="uppercase text-[10px] font-mono font-bold">
                    {documentAnalysis.fileName.endsWith('.prompt') ? 'AI PROMPT' : documentAnalysis.fileType}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-1">
                  <span>{formatFileSize(documentAnalysis.fileSize)}</span>
                  <span>•</span>
                  <span className="text-indigo-600 font-semibold">{documentAnalysis.sections.length} sections synthesized</span>
                  <span>•</span>
                  <span>{documentAnalysis.pageCount} pages</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRemoveFile}
              className="self-end sm:self-center p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
              title="Remove and upload different file"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Synthesized Sections Preview */}
          <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Synthesized Outline & Sections ({documentAnalysis.sections.length})
              </span>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ Ready for Presentation Design
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {documentAnalysis.sections.slice(0, 6).map((sec, i) => (
                <div
                  key={sec.id || i}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 truncate shadow-2xs"
                >
                  <span className="h-2 w-2 rounded-full bg-indigo-500 shrink-0" />
                  <span className="font-bold text-slate-800 shrink-0 font-mono">0{i + 1}.</span>
                  <span className="truncate font-medium">{sec.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <span className="text-xs text-slate-400">
              Click continue to select your presentation template and customize design styles.
            </span>
            <Button
              variant="accent"
              size="lg"
              onClick={() => router.push('/create')}
              className="w-full sm:w-auto shadow-lg shadow-violet-500/25 gap-2 cursor-pointer font-bold px-6 h-11"
            >
              <span>Choose Template Design</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Sample report fallback test helper */}
      {!documentAnalysis && !isParsing && mode === 'upload' && (
        <div className="p-4 rounded-2xl border border-slate-200/90 bg-white/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 shadow-2xs">
          <span className="font-medium">Want to test right away with a pre-parsed engineering report?</span>
          <button
            type="button"
            onClick={loadSampleDocument}
            className="text-indigo-600 font-bold hover:text-indigo-800 underline cursor-pointer bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-200/60 shadow-2xs"
          >
            Load Sample Report (3.4 MB)
          </button>
        </div>
      )}
    </div>
  );
}
