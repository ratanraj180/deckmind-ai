'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, FastForward, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AIBrainRadar } from '@/components/processing/AIBrainRadar';
import { ProcessingStages, PROCESSING_STAGES } from '@/components/processing/ProcessingStages';
import { ContextStatusTicker } from '@/components/processing/ContextStatusTicker';
import { usePresentation } from '@/context/PresentationContext';

const CONTEXT_MESSAGES = [
  'Verifying document checksum and structure...',
  'Extracting multi-column text, formulas, and figures...',
  'Understanding key concepts and architectural components...',
  'Selecting the most relevant information for your defense...',
  'Building presentation storyline tailored to your audience...',
  'Applying selected design family typography and layout engine...',
  'Rendering architecture diagrams, flowcharts, and metrics...',
  'Compiling presentation and generating speaker notes...',
  'Presentation ready! Redirecting to preview workspace...',
];

export default function ProcessingPage() {
  const router = useRouter();
  const { documentAnalysis, document, config, selectedTemplate, generateProjectFromCurrentDocument } =
    usePresentation();
  const [progress, setProgress] = useState(5);
  const hasGeneratedRef = useRef(false);

  // Generate the real slides from document immediately upon mounting
  useEffect(() => {
    if (!hasGeneratedRef.current) {
      hasGeneratedRef.current = true;
      generateProjectFromCurrentDocument();
    }
  }, [generateProjectFromCurrentDocument]);

  useEffect(() => {
    const totalDuration = 4500; // ~4.5 seconds
    const intervalMs = 100;
    const increment = 100 / (totalDuration / intervalMs);

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          return 100;
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(timer);
  }, []);

  const currentStageIndex = Math.min(
    PROCESSING_STAGES.length - 1,
    Math.floor((progress / 100) * PROCESSING_STAGES.length)
  );

  useEffect(() => {
    if (progress >= 100) {
      const redirectTimer = setTimeout(() => {
        router.push('/presentation');
      }, 500);
      return () => clearTimeout(redirectTimer);
    }
  }, [progress, router]);

  const currentStageName =
    PROCESSING_STAGES[currentStageIndex]?.label || 'Generating Presentation';
  const currentTickerMessage =
    CONTEXT_MESSAGES[currentStageIndex] || 'Finalizing presentation deck...';

  const handleSkip = () => {
    generateProjectFromCurrentDocument();
    router.push('/presentation');
  };

  const displayName = documentAnalysis?.fileName || document?.name || 'Document Report';
  const displayTitle = documentAnalysis?.title || 'Document Presentation';

  return (
    <div className="min-h-screen mesh-canvas text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Aurora Ambient Mesh Background */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-indigo-500/10 blur-[130px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-purple-500/10 blur-[120px] pointer-events-none -z-10" />

      {/* Top Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200/80">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 rounded-2xl brand-mark text-white shadow-md shadow-blue-500/20">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md tracking-tight" title={displayName}>
                {displayName}
              </h1>
              <Badge variant="gradient" className="text-[10px] font-mono font-semibold">
                {config.duration} • {config.purpose.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">
              Synthesizing: <span className="font-semibold text-slate-700">{displayTitle}</span>
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSkip}
          className="text-xs text-slate-600 hover:text-slate-900 cursor-pointer font-bold border-slate-200/90 bg-white/80 shadow-xs"
        >
          <span>Skip Animation</span>
          <FastForward className="h-3.5 w-3.5 ml-1.5 text-indigo-600" />
        </Button>
      </header>

      {/* Center Intelligence Stage */}
      <main className="max-w-4xl mx-auto w-full py-8 space-y-8">
        {/* Radar & Core Visualization */}
        <AIBrainRadar progress={progress} currentStageName={currentStageName} />

        {/* Live Contextual Status Ticker */}
        <ContextStatusTicker message={currentTickerMessage} />

        {/* Step-by-Step Progress Pipeline */}
        <div className="pt-2">
          <ProcessingStages currentStageIndex={currentStageIndex} />
        </div>
      </main>

      {/* Bottom Footer Notice */}
      <footer className="max-w-md mx-auto w-full text-center text-xs text-slate-400 py-4 flex items-center justify-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
        <span>Applying <span className="font-bold text-indigo-700">{selectedTemplate.name}</span> ({selectedTemplate.family.replace('_', ' ')}) layout engine...</span>
      </footer>
    </div>
  );
}
