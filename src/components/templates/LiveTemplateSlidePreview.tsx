'use client';

import React from 'react';
import { PresentationTemplate, LayoutFamily } from '@/types/templates';
import { VisualIntensity, ContentDensity } from '@/types/presentation';
import {
  BentoLayout,
  SwissLayout,
  MinimalLayout,
  BrutalistLayout,
  CyberLayout,
  PosterLayout,
  DashboardLayout,
  SplitScreenLayout,
  EditorialLayout,
  TimelineLayout,
  BlueprintLayout,
  CorporateLayout,
  MemphisLayout,
  CardStackLayout,
} from '@/components/presentation/layouts';
import { SlideData } from '@/types/presentation';

interface LiveTemplateSlidePreviewProps {
  template: PresentationTemplate;
  documentTitle?: string;
  visualIntensity?: VisualIntensity;
  density?: ContentDensity;
}

export function LiveTemplateSlidePreview({
  template,
  documentTitle = 'Smart Attendance System using Deep Edge AI',
  visualIntensity = 'balanced',
  density = 'balanced',
}: LiveTemplateSlidePreviewProps) {
  const { palette, layoutStyle, fontMood } = template;

  const fontClasses = {
    clean_sans: 'font-sans',
    editorial: 'font-serif',
    professional: 'font-sans',
    technical: 'font-mono',
    bold_display: 'font-sans font-black tracking-tight',
  }[fontMood];

  // Resolve authentic layout family
  const layoutFamily: LayoutFamily =
    template.layoutFamily ||
    (layoutStyle === 'bento-grid' ? 'bento' :
     layoutStyle === 'asymmetric-grid' ? 'swiss-grid' :
     layoutStyle === 'apple-minimal' || layoutStyle === 'minimal-canvas' ? 'minimal' :
     layoutStyle === 'neo-brutalist' ? 'brutalist' :
     layoutStyle === 'cyber-tech' || layoutStyle === 'linear-dark' || layoutStyle === 'dark-immersive' ? 'cyber' :
     layoutStyle === 'poster' ? 'poster' :
     layoutStyle === 'data-dashboard' ? 'dashboard' :
     layoutStyle === 'split-hero' ? 'split-screen' :
     layoutStyle === 'blueprint' ? 'blueprint' :
     layoutStyle === 'corporate-premium' ? 'corporate' :
     layoutStyle === 'bold-magazine' || layoutStyle === 'magazine' || layoutStyle === 'centered-editorial' ? 'editorial' :
     layoutStyle === 'organic-flow' ? 'memphis' :
     'bento');

  // Synthesize realistic preview slide data
  const previewSlide: SlideData = {
    id: 1,
    slideNumber: 3,
    title: documentTitle,
    subtitle: 'High-throughput edge perception pipeline engineered for low-latency verification.',
    visualType: 'solution_pillars',
    category: 'System Architecture',
    templateId: template.id,
    templateFamily: template.family,
    layoutStyle: template.layoutStyle,
    durationSeconds: 60,
    speakerNotes: 'Slide demonstrates the core system architecture and technical benchmarks.',
    content: {
      pillars: [
        {
          number: '01',
          title: 'Asynchronous Ingestion Core',
          desc: 'Hardware GPU decoding processes RTSP camera feeds with zero frame buffer bloat.',
          tag: 'GPU Accelerated',
        },
        {
          number: '02',
          title: 'Vector Embedding Matcher',
          desc: '128-dimensional facial vectors are mapped across normalized FAISS Euclidean indices.',
          tag: 'FAISS Sub-ms',
        },
        {
          number: '03',
          title: 'Tamper-Resistant Ledger',
          desc: 'Cryptographically signed audit logs stored in local transactional SQLite storage.',
          tag: 'ACID Compliant',
        },
      ],
      metrics: [
        { label: 'Verification SLA', value: '99.4%' },
        { label: 'Latency P99', value: '42ms' },
        { label: 'Hardware BOM', value: '$180' },
      ],
      kicker: 'CORE ENGINEERING ARCHITECTURE',
    },
  };

  const renderLayout = () => {
    switch (layoutFamily) {
      case 'bento':
        return <BentoLayout slide={previewSlide} template={template} />;
      case 'swiss-grid':
        return <SwissLayout slide={previewSlide} template={template} />;
      case 'minimal':
        return <MinimalLayout slide={previewSlide} template={template} />;
      case 'brutalist':
        return <BrutalistLayout slide={previewSlide} template={template} />;
      case 'cyber':
        return <CyberLayout slide={previewSlide} template={template} />;
      case 'poster':
        return <PosterLayout slide={previewSlide} template={template} />;
      case 'dashboard':
        return <DashboardLayout slide={previewSlide} template={template} />;
      case 'split-screen':
        return <SplitScreenLayout slide={previewSlide} template={template} />;
      case 'editorial':
      case 'magazine':
        return <EditorialLayout slide={previewSlide} template={template} />;
      case 'timeline':
        return <TimelineLayout slide={previewSlide} template={template} />;
      case 'blueprint':
        return <BlueprintLayout slide={previewSlide} template={template} />;
      case 'corporate':
        return <CorporateLayout slide={previewSlide} template={template} />;
      case 'memphis':
        return <MemphisLayout slide={previewSlide} template={template} />;
      case 'card-stack':
        return <CardStackLayout slide={previewSlide} template={template} />;
      default:
        return <BentoLayout slide={previewSlide} template={template} />;
    }
  };

  return (
    <div className="space-y-2">
      {/* 16:9 Aspect Ratio Container matching real slides */}
      <div
        className={`w-full aspect-[16/9] rounded-2xl border overflow-hidden relative shadow-xl ${fontClasses} ${
          layoutFamily === 'brutalist' ? 'border-3 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-none' : ''
        }`}
        style={{
          backgroundColor: palette.background,
          borderColor: layoutFamily === 'brutalist' ? '#000000' : palette.border,
          color: palette.text,
        }}
      >
        {renderLayout()}
      </div>

      {/* Template Metadata Pill */}
      <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 font-mono">
        <span className="font-bold text-slate-800 flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: palette.accent }}
          />
          {template.name}
        </span>
        <span className="uppercase text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded border border-slate-200">
          {layoutFamily.replace('-', ' ')}
        </span>
      </div>
    </div>
  );
}
