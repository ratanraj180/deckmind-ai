'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function SolutionSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    pillars?: { number: string; title: string; desc: string; tag?: string }[];
    bullets?: string[];
    metrics?: { label: string; value: string }[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBento = layout === 'bento-grid';
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';
  const isAcademic = layout === 'academic-research';

  const items = content.pillars && content.pillars.length > 0
    ? content.pillars
    : (content.bullets ?? []).map((b, i) => ({
        number: `0${i + 1}`,
        title: `Component 0${i + 1}`,
        desc: b,
        tag: 'Specification',
      }));

  // Helper for card styling based on template layout
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
            {slide.category ? `// ${slide.category.toUpperCase()}` : '// ARCHITECTURE & SPECIFICATION'}
          </span>
          {isDarkTech && (
            <span className="text-[9px] font-mono ml-auto opacity-60">● TELEMETRY ACTIVE</span>
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
      <div className="flex-1 my-auto py-3 flex flex-col justify-center">
        {/* LAYOUT 1: BENTO MODULAR GRID */}
        {isBento ? (
          <div className="grid grid-cols-12 gap-4 h-full items-stretch">
            {/* Left Hero Bento Box (7 columns) */}
            <div
              className="col-span-7 p-5 flex flex-col justify-between relative overflow-hidden"
              style={getCardStyle()}
            >
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ backgroundColor: pal.accent }}
              />
              <div className="space-y-2">
                <span
                  className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded"
                  style={{ backgroundColor: pal.accent + '20', color: pal.accent }}
                >
                  Core Intelligence
                </span>
                <h3 className="text-lg sm:text-xl font-bold" style={{ color: pal.primary }}>
                  {items[0]?.title ?? 'Primary Pillar'}
                </h3>
                <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
                  {items[0]?.desc ?? ''}
                </p>
              </div>

              <div className="pt-3 border-t flex items-center justify-between" style={{ borderColor: pal.border + '50' }}>
                <span className="text-[10px] font-mono opacity-60">Throughput Benchmark</span>
                <span className="text-sm font-mono font-bold" style={{ color: pal.accent }}>
                  99.4% Verified
                </span>
              </div>
            </div>

            {/* Right Stacked Bento Boxes (5 columns) */}
            <div className="col-span-5 flex flex-col gap-3 justify-between">
              {(items.slice(1, 3).length > 0 ? items.slice(1, 3) : [items[0]]).map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 flex-1 flex flex-col justify-between relative"
                  style={getCardStyle()}
                >
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono opacity-50 uppercase font-bold">
                      Module 0{idx + 2}
                    </span>
                    <h4 className="text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                      {p?.title}
                    </h4>
                    <p className="text-[11px] opacity-75 line-clamp-3 leading-snug">
                      {p?.desc}
                    </p>
                  </div>
                  {p?.tag && (
                    <span
                      className="text-[9px] font-mono self-start mt-2 px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
                    >
                      {p.tag}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

        /* LAYOUT 2: STANDARD / MINIMAL / BRUTALIST / SWISS ADAPTIVE GRID */
        ) : (
          <div
            className={`grid gap-4 h-full items-stretch ${
              items.length === 1
                ? 'grid-cols-1'
                : items.length === 2
                ? 'grid-cols-2'
                : items.length === 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-4'
            }`}
          >
            {items.slice(0, 4).map((pillar, i) => (
              <div
                key={i}
                className="p-5 flex flex-col justify-between relative overflow-hidden"
                style={getCardStyle()}
              >
                {/* Top Accent Stripe for Dark Tech */}
                {isDarkTech && (
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: pal.accent }}
                  />
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded ${isBrutalist ? 'border-2 border-black font-black' : ''}`}
                      style={{
                        backgroundColor: isBrutalist ? pal.accent : pal.accent + '20',
                        color: isBrutalist ? '#000000' : pal.accent,
                      }}
                    >
                      {pillar.number || `0${i + 1}`}
                    </span>
                    {isSwiss && (
                      <span className="text-[9px] font-mono opacity-50">ZURICH // {i + 1}</span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold leading-tight" style={{ color: pal.primary }}>
                    {pillar.title}
                  </h3>

                  <p className="text-xs opacity-80 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                {pillar.tag && (
                  <div className="pt-3 border-t mt-3" style={{ borderColor: pal.border + '50' }}>
                    <span
                      className={`text-[9px] font-mono px-2 py-0.5 rounded ${isBrutalist ? 'border border-black font-bold' : ''}`}
                      style={{ backgroundColor: pal.background, color: pal.accent }}
                    >
                      {pillar.tag}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • {template.name} ({template.layoutStyle.replace('-', ' ')})</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
