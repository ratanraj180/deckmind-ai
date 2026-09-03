'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function WorkflowSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    steps?: { step: string; name: string; tech?: string; time?: string; desc: string }[];
    totalLatency?: string;
    bullets?: string[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';

  const steps = content.steps && content.steps.length > 0 ? content.steps : (content.bullets ?? []).slice(0, 4).map((b, i) => ({
    step: `${i + 1}`,
    name: `Stage 0${i + 1}`,
    tech: 'Automated Stage',
    desc: b,
  }));

  const getCardStyle = (extraShadow = true) => {
    if (isBrutalist) {
      return {
        backgroundColor: '#FFFFFF',
        color: '#000000',
        border: '2px solid #000000',
        boxShadow: extraShadow ? '4px 4px 0px 0px #000000' : 'none',
        borderRadius: '0px',
      };
    }
    return {
      backgroundColor: pal.cardBg,
      color: pal.text,
      border: `1px solid ${pal.border}`,
      borderRadius: isMinimal ? '1rem' : '0.75rem',
      boxShadow: isDarkTech ? `0 0 20px -5px ${pal.accent}20` : '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
    };
  };

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{ backgroundColor: pal.background, color: pal.text }}
    >
      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3 flex justify-between items-end" style={{ borderColor: pal.border + '50' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isSwiss && <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />}
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{ color: pal.accent }}
            >
              // WORKFLOW & EXECUTION PIPELINE
            </span>
          </div>
          <h2
            className={`font-black tracking-tight leading-tight ${isMinimal ? 'text-3xl sm:text-4xl' : 'text-2xl sm:text-3xl'}`}
            style={{ color: pal.primary }}
          >
            {slide.title}
          </h2>
          {slide.subtitle && (
            <p className="text-xs sm:text-sm mt-1 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
              {slide.subtitle}
            </p>
          )}
        </div>
        {content.totalLatency && (
          <div className="text-right">
            <span className="text-[10px] uppercase font-mono block opacity-60">SLA LATENCY</span>
            <span className="text-lg font-mono font-bold" style={{ color: pal.accent }}>
              {content.totalLatency}
            </span>
          </div>
        )}
      </div>

      {/* ── Dynamic Content Canvas ──────────────────────────────── */}
      <div className="my-auto py-3 flex-1 flex flex-col justify-center">
        <div
          className={`grid gap-4 w-full h-full items-stretch ${
            steps.length === 2
              ? 'grid-cols-2'
              : steps.length === 3
              ? 'grid-cols-1 sm:grid-cols-3'
              : 'grid-cols-2 sm:grid-cols-4'
          }`}
        >
          {steps.slice(0, 4).map((step, idx) => (
            <div
              key={idx}
              className="p-4 flex flex-col justify-between relative overflow-hidden"
              style={getCardStyle()}
            >
              {isDarkTech && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: pal.accent }}
                />
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isBrutalist ? 'border-2 border-black font-black' : ''
                    }`}
                    style={{
                      backgroundColor: pal.accent,
                      color: isBrutalist ? '#000000' : '#FFFFFF',
                    }}
                  >
                    {step.step || (idx + 1).toString()}
                  </div>
                  {idx < steps.length - 1 && (
                    <span className="text-xs opacity-40 font-mono">⟶</span>
                  )}
                </div>

                <h3 className="font-bold text-sm leading-tight" style={{ color: pal.primary }}>
                  {step.name}
                </h3>

                {step.tech && (
                  <span
                    className="text-[9px] font-mono px-1.5 py-0.5 rounded inline-block"
                    style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
                  >
                    {step.tech}
                  </span>
                )}

                <p className="text-xs opacity-80 leading-relaxed line-clamp-4">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • Pipeline Progression</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
