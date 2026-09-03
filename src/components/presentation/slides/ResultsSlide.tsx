'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ResultsSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    benchmarks?: { label: string; value: string; change?: string; status?: string }[];
    bullets?: string[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';

  const benchmarks = content.benchmarks && content.benchmarks.length > 0 ? content.benchmarks : [
    { label: 'Empirical Accuracy', value: '99.4%', change: 'Cross-validated ROC AUC: 0.998' },
    { label: 'Inference Latency', value: '42ms', change: 'FP16 TensorRT Engine' },
    { label: 'False Accept Rate', value: '0.001%', change: 'Zero False Approvals' },
  ];

  const bullets = content.bullets && content.bullets.length > 0 ? content.bullets : [
    'Empirical benchmarks confirm statistically significant improvements over baseline models.',
    'Execution latency meets real-time SLA thresholds across all operational test conditions.',
  ];

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
      <div className="border-b pb-3" style={{ borderColor: pal.border + '50' }}>
        <div className="flex items-center gap-2 mb-1">
          {isSwiss && <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />}
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            // EMPIRICAL BENCHMARKS & EVALUATION
          </span>
          {isDarkTech && (
            <span className="text-[9px] font-mono ml-auto opacity-60">● AUDIT COMPLETE</span>
          )}
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

      {/* ── Dynamic Content Canvas ──────────────────────────────── */}
      <div className="my-auto py-3 space-y-3 flex-1 flex flex-col justify-center">
        {/* Top Row: 3 Prominent Stat Cards */}
        <div
          className={`grid gap-3 ${
            benchmarks.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
          }`}
        >
          {benchmarks.slice(0, 3).map((b, i) => (
            <div
              key={i}
              className="p-4 text-center flex flex-col justify-center relative overflow-hidden"
              style={getCardStyle()}
            >
              {isDarkTech && (
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: pal.accent }}
                />
              )}
              <div className="text-2xl sm:text-4xl font-mono font-black mb-1" style={{ color: pal.accent }}>
                {b.value}
              </div>
              <div className="text-xs font-bold leading-tight" style={{ color: pal.primary }}>
                {b.label}
              </div>
              {b.change && (
                <div className="text-[10px] opacity-70 mt-1 font-mono">{b.change}</div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Row: Detailed Findings Card Filling Rest of Canvas */}
        <div
          className="p-4 flex flex-col justify-center relative overflow-hidden"
          style={getCardStyle()}
        >
          <span
            className="text-[9px] font-mono uppercase font-bold tracking-wider mb-2 block"
            style={{ color: pal.accent }}
          >
            Empirical Validation Takeaways
          </span>
          <ul className="space-y-1.5">
            {bullets.slice(0, 3).map((bullet, i) => (
              <li key={i} className="flex gap-2 items-start text-xs leading-relaxed" style={{ color: pal.text }}>
                <span className="font-bold flex-shrink-0" style={{ color: pal.accent }}>▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • Statistical Verification</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
