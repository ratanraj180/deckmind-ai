'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function HardwareSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    items?: { component: string; spec: string; cost: string }[];
    totalCost?: string;
    bullets?: string[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';

  const items = content.items && content.items.length > 0 ? content.items : (content.bullets ?? []).slice(0, 4).map((b, i) => ({
    component: `Hardware Module 0${i + 1}`,
    spec: b,
    cost: `Unit 0${i + 1}`,
  }));

  const bullets = content.bullets && content.bullets.length > 0 ? content.bullets : [
    'All hardware components are enterprise-grade and support 24/7 continuous operation.',
    'System architecture supports hot-swappable edge modules with minimal downtime.',
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
      <div className="border-b pb-3 flex justify-between items-end" style={{ borderColor: pal.border + '50' }}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            {isSwiss && <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />}
            <span
              className="text-[10px] font-mono font-bold tracking-widest uppercase"
              style={{ color: pal.accent }}
            >
              // HARDWARE MATRIX & SYSTEM BOM
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
        {content.totalCost && (
          <div
            className="text-right p-2 sm:p-3 rounded-xl border"
            style={getCardStyle(false)}
          >
            <span className="text-[9px] uppercase font-mono block opacity-60">TOTAL BUDGET</span>
            <span className="text-base sm:text-lg font-mono font-bold" style={{ color: pal.accent }}>
              {content.totalCost}
            </span>
          </div>
        )}
      </div>

      {/* ── Dynamic Content Canvas ──────────────────────────────── */}
      <div className="my-auto py-2 space-y-3 flex-1 flex flex-col justify-center">
        {/* Table Container */}
        <div
          className="rounded-xl overflow-hidden"
          style={getCardStyle()}
        >
          <div
            className="grid grid-cols-12 px-4 py-2 text-[10px] font-mono font-bold uppercase border-b"
            style={{ backgroundColor: pal.accent + '15', borderColor: pal.border, color: pal.accent }}
          >
            <div className="col-span-4">Component</div>
            <div className="col-span-6">Technical Specification</div>
            <div className="col-span-2 text-right">Node</div>
          </div>
          <div className="divide-y" style={{ borderColor: pal.border + '50' }}>
            {items.slice(0, 4).map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 px-4 py-2.5 items-center text-xs"
              >
                <div className="col-span-4 font-bold truncate pr-2" style={{ color: pal.primary }}>
                  {item.component}
                </div>
                <div className="col-span-6 text-[11px] opacity-80 truncate pr-2" style={{ color: pal.text }}>
                  {item.spec}
                </div>
                <div className="col-span-2 text-right font-mono text-[10px] font-bold" style={{ color: pal.accent }}>
                  {item.cost}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Findings Row */}
        <div className="grid grid-cols-2 gap-3">
          {bullets.slice(0, 2).map((bullet, idx) => (
            <div
              key={idx}
              className="p-3 text-xs leading-relaxed flex items-center gap-2"
              style={getCardStyle(false)}
            >
              <span className="font-bold text-xs" style={{ color: pal.accent }}>▸</span>
              <span className="opacity-80 truncate">{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • Specification Matrix</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
