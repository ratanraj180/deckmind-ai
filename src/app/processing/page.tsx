'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, FastForward } from 'lucide-react';
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
    <div className="min-h-screen bg-[#fafafb] text-slate-900 flex flex-col justify-between p-4 sm:p-6 lg:p-8">
      {/* Top Header */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-100">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md" title={displayName}>
                {displayName}
              </h1>
              <Badge variant="indigo" className="text-[10px]">
                {config.duration} • {config.purpose.replace('_', ' ')}
              </Badge>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 truncate max-w-md">
              Synthesizing: {displayTitle}
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleSkip}
          className="text-xs text-slate-500 hover:text-slate-900 cursor-pointer"
        >
          <span>Skip Animation</span>
          <FastForward className="h-3.5 w-3.5 ml-1.5" />
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
      <footer className="max-w-md mx-auto w-full text-center text-xs text-slate-400 py-4">
        Applying {selectedTemplate.name} ({selectedTemplate.family.replace('_', ' ')}) layout engine...
      </footer>
    </div>
  );
}
