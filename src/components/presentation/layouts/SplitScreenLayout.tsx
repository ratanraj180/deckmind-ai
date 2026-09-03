'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function SplitScreenLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full flex relative overflow-hidden font-sans"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* ── Left Solid Brand Panel (38% width) ──────────────────── */}
      <div
        className="w-[38%] p-6 sm:p-10 flex flex-col justify-between shrink-0 relative"
        style={{
          backgroundColor: pal.primary,
          color: pal.isDark ? '#FFFFFF' : '#FFFFFF',
        }}
      >
        <div className="space-y-3">
          <span
            className="text-[9px] font-mono font-bold tracking-widest uppercase px-2 py-0.5 rounded inline-block"
            style={{ backgroundColor: pal.accent, color: '#000000' }}
          >
            {kicker}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-white">
            {slide.title}
          </h2>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {subtitle}
            </p>
          )}
        </div>

        <div className="pt-4 border-t border-white/20 text-[10px] font-mono text-slate-400">
          DECKMIND // SPLIT HERO
        </div>
      </div>

      {/* ── Right Content Cards (62% width) ─────────────────────── */}
      <div className="w-[62%] p-6 sm:p-10 flex flex-col justify-between overflow-y-auto">
        <div className="my-auto space-y-3">
          {items.slice(0, 3).map((it, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border flex items-start gap-4 transition-all"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <span
                className="text-xs font-mono font-black px-2 py-1 rounded-md shrink-0"
                style={{
                  backgroundColor: pal.accent + '20',
                  color: pal.accent,
                }}
              >
                0{idx + 1}
              </span>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                  {it.title}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-50" style={{ borderColor: pal.border }}>
          <span>{template.name}</span>
          <span>Slide {slide.slideNumber}</span>
        </div>
      </div>
    </div>
  );
}
