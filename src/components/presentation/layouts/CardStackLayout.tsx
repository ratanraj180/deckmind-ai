'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function CardStackLayout({ slide, template }: LayoutProps) {
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
      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3" style={{ borderColor: pal.border }}>
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest block" style={{ color: pal.accent }}>
          // {kicker} • LAYERED STACK
        </span>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Layered Card Stack ──────────────────────────────────── */}
      <div className="my-auto py-2 space-y-3 flex-1 flex flex-col justify-center">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border flex items-center justify-between transition-all"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
              transform: `translateX(${idx * 10}px)`,
              boxShadow: `0 ${4 + idx * 2}px ${12 + idx * 4}px -2px rgba(0,0,0,0.06)`,
            }}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0"
                style={{ backgroundColor: pal.accent + '20', color: pal.accent }}
              >
                0{idx + 1}
              </span>
              <div className="min-w-0 pr-2">
                <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: pal.primary }}>
                  {it.title}
                </h4>
                <p className="text-xs opacity-75 truncate">
                  {it.desc}
                </p>
              </div>
            </div>

            {it.tag && (
              <span
                className="text-[9px] font-mono px-2 py-0.5 rounded border uppercase shrink-0"
                style={{ backgroundColor: pal.background, borderColor: pal.border, color: pal.accent }}
              >
                {it.tag}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-50" style={{ borderColor: pal.border }}>
        <span>CARD STACK ARCHITECTURE • {template.name.toUpperCase()}</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
