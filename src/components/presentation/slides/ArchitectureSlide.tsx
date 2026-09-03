'use client';
import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ArchitectureSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    layers?: { name: string; node: string; details: string; type: string }[];
    bullets?: string[];
  };

  const pal = template.palette;
  const layout = template.layoutStyle;
  const isBrutalist = layout === 'neo-brutalist';
  const isDarkTech = layout === 'linear-dark' || layout === 'cyber-tech';
  const isSwiss = layout === 'asymmetric-grid';
  const isMinimal = layout === 'apple-minimal';

  const layers = content.layers && content.layers.length > 0 ? content.layers : (content.bullets ?? []).slice(0, 4).map((b, i) => ({
    name: `Tier 0${i + 1}`,
    node: `Component Layer 0${i + 1}`,
    details: b,
    type: i === 0 ? 'Input Ingestion' : i === 3 ? 'Persistence Store' : 'Processing Core',
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
      <div className="border-b pb-3" style={{ borderColor: pal.border + '50' }}>
        <div className="flex items-center gap-2 mb-1">
          {isSwiss && <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />}
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            // SYSTEM ARCHITECTURE & COMPONENT STACK
          </span>
          {isDarkTech && (
            <span className="text-[9px] font-mono ml-auto opacity-60">● SCHEMATIC VERIFIED</span>
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
      <div className="my-auto py-2 space-y-2.5 flex-1 flex flex-col justify-center">
        {layers.slice(0, 4).map((layer, idx) => {
          const isTop = idx === 0;
          const isBottom = idx === layers.length - 1;

          return (
            <div
              key={idx}
              className="p-3.5 flex items-center justify-between relative overflow-hidden"
              style={getCardStyle()}
            >
              {/* Left Node Badge */}
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span
                  className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg flex-shrink-0 ${isBrutalist ? 'border border-black' : ''}`}
                  style={{
                    backgroundColor: isTop || isBottom ? pal.accent : pal.background,
                    color: isTop || isBottom ? (isBrutalist ? '#000000' : '#FFFFFF') : pal.accent,
                    border: `1px solid ${pal.border}`,
                  }}
                >
                  {layer.name}
                </span>

                <div className="space-y-0.5 flex-1 min-w-0 pr-2">
                  <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: pal.primary }}>
                    {layer.node}
                  </h4>
                  <p className="text-[11px] opacity-75 truncate" style={{ color: pal.text }}>
                    {layer.details}
                  </p>
                </div>
              </div>

              {/* Tier Type Tag */}
              <span
                className={`text-[9px] font-mono px-2 py-0.5 rounded-full uppercase flex-shrink-0 ${isBrutalist ? 'border border-black font-bold' : 'border'}`}
                style={{
                  backgroundColor: pal.background,
                  color: isTop || isBottom ? pal.accent : pal.secondary,
                  borderColor: pal.border,
                }}
              >
                {layer.type}
              </span>
            </div>
          );
        })}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • System Topology</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
