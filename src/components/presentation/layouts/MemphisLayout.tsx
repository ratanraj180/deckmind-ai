'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function MemphisLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden font-sans"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* Decorative Memphis Background Accents */}
      <div
        className="absolute top-4 right-6 w-12 h-12 rounded-full border-4 border-dashed opacity-20 pointer-events-none"
        style={{ borderColor: pal.accent }}
      />
      <div
        className="absolute bottom-6 left-6 w-8 h-8 opacity-20 pointer-events-none rotate-45"
        style={{ backgroundColor: pal.accent }}
      />

      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="space-y-1 z-10">
        <span
          className="text-[10px] font-mono font-black uppercase px-2.5 py-1 rounded-full inline-block"
          style={{ backgroundColor: pal.accent, color: '#000000' }}
        >
          {kicker} ★ POP
        </span>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm font-bold opacity-75" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Asymmetric Memphis Pop Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-3 items-stretch z-10">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border-2 flex flex-col justify-between transition-all ${
              idx === 1 ? '-translate-y-2' : ''
            }`}
            style={{
              backgroundColor: pal.cardBg,
              borderColor: idx === 1 ? pal.accent : pal.border,
              boxShadow: idx === 1 ? `0 8px 20px -4px ${pal.accent}30` : undefined,
            }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs text-white"
                  style={{ backgroundColor: idx === 1 ? pal.accent : pal.primary }}
                >
                  {idx + 1}
                </span>
                <span className="text-[10px] font-mono font-bold">INSIGHT</span>
              </div>
              <h3 className="text-base font-black leading-tight" style={{ color: pal.primary }}>
                {it.title}
              </h3>
              <p className="text-xs font-medium opacity-80 leading-relaxed">
                {it.desc}
              </p>
            </div>

            {it.tag && (
              <div className="pt-3 border-t border-current/10 mt-3">
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: pal.accent + '25', color: pal.accent }}
                >
                  {it.tag}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[10px] font-bold z-10" style={{ borderColor: pal.border }}>
        <span>{template.name.toUpperCase()} CREATIVE STUDIO</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
