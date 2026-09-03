'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ProblemSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    bullets?: string[];
    metrics?: { label: string; value: string; sub?: string }[];
    comparison?: { aspect: string; flaw: string; severity: string }[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBento = layout === 'bento-grid';
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';
  const isAcademic = layout === 'academic-research';

  const bullets = content.bullets && content.bullets.length > 0 ? content.bullets : [
    'Traditional manual operations introduce high latency and human error rates.',
    'Lack of automated consensus creates compliance vulnerabilities in distributed workflows.',
    'System bottlenecks limit throughput and prevent real-time operational visibility.',
  ];

  const metrics = content.metrics && content.metrics.length > 0 ? content.metrics : [
    { label: 'Time Wasted', value: '18 mins', sub: 'Per lecture hour' },
    { label: 'Proxy Rate', value: '14.2%', sub: 'Undetected entries' },
    { label: 'Failure Rate', value: '0.00%', sub: 'With proposed AI edge' },
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
      <div className={`border-b pb-3 ${isAcademic ? 'text-center' : ''}`} style={{ borderColor: pal.border + '50' }}>
        <div className="flex items-center gap-2 mb-1">
          {isSwiss && <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />}
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            // PROBLEM FORMULATION & BOTTLENECKS
          </span>
          {isDarkTech && (
            <span className="text-[9px] font-mono ml-auto opacity-60">● SEVERITY: HIGH</span>
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
      <div className="grid grid-cols-12 gap-4 my-auto py-2 items-stretch flex-1">
        {/* Left Side: 3 Structured Challenge Cards (7 cols) */}
        <div className="col-span-7 flex flex-col gap-2.5 justify-between">
          {bullets.slice(0, 3).map((bullet, i) => (
            <div
              key={i}
              className="p-3.5 flex-1 flex items-start gap-3 relative overflow-hidden"
              style={getCardStyle()}
            >
              {isDarkTech && (
                <div
                  className="absolute left-0 top-0 bottom-0 w-1"
                  style={{ backgroundColor: pal.accent }}
                />
              )}
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex-shrink-0 ${isBrutalist ? 'border border-black' : ''}`}
                style={{
                  backgroundColor: isBrutalist ? pal.accent : pal.accent + '20',
                  color: isBrutalist ? '#000000' : pal.accent,
                }}
              >
                0{i + 1}
              </span>
              <div className="space-y-0.5">
                <span className="text-xs font-bold block" style={{ color: pal.primary }}>
                  Challenge Dimension 0{i + 1}
                </span>
                <p className="text-xs opacity-80 leading-relaxed">{bullet}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: 3 Impact Metric Cards (5 cols) */}
        <div className="col-span-5 flex flex-col gap-2.5 justify-between">
          {metrics.slice(0, 3).map((m, i) => (
            <div
              key={i}
              className="p-3.5 flex-1 flex flex-col justify-center relative overflow-hidden"
              style={getCardStyle()}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-mono font-black" style={{ color: pal.accent }}>
                  {m.value}
                </span>
                <span
                  className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase"
                  style={{ backgroundColor: pal.background, color: pal.secondary, border: `1px solid ${pal.border}` }}
                >
                  Validated
                </span>
              </div>
              <div className="text-xs font-bold mt-1" style={{ color: pal.primary }}>
                {m.label}
              </div>
              {m.sub && <p className="text-[10px] opacity-60 mt-0.5">{m.sub}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • Problem Scrutiny</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
