'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function SwissLayout({ slide, template }: LayoutProps) {
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
      {/* Swiss Left Vertical Accent Spine */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[5px] z-10"
        style={{ backgroundColor: pal.accent }}
      />

      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3 pl-3" style={{ borderColor: pal.border }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="h-2 w-8" style={{ backgroundColor: pal.accent }} />
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            ZURICH TYPOGRAPHIC SPECIFICATION // {kicker}
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tighter" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-70 leading-relaxed font-medium" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Asymmetric Swiss Grid ───────────────────────────────── */}
      <div className="grid grid-cols-12 gap-5 my-auto py-3 items-stretch flex-1 pl-3">
        {/* Left Concept Pillar (4 cols) */}
        <div
          className="col-span-4 p-5 rounded-none border-l-2 flex flex-col justify-between"
          style={{ borderColor: pal.accent, backgroundColor: pal.cardBg }}
        >
          <div className="space-y-2">
            <span className="text-2xl sm:text-3xl font-mono font-black" style={{ color: pal.accent }}>
              01
            </span>
            <h3 className="text-base font-black uppercase tracking-tight" style={{ color: pal.primary }}>
              {items[0]?.title || 'Core Principle'}
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              {items[0]?.desc}
            </p>
          </div>
          <div className="pt-3 border-t border-current/10 text-[9px] font-mono opacity-60">
            SYSTEM DISCIPLINE // NORMATIVE
          </div>
        </div>

        {/* Right Asymmetric Card Columns (8 cols) */}
        <div className="col-span-8 flex flex-col gap-3 justify-between">
          {items.slice(1, 4).map((it, idx) => (
            <div
              key={idx}
              className="p-4 rounded-none border flex items-start gap-4"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <span
                className="text-xs font-mono font-bold px-2 py-1 rounded-none border shrink-0"
                style={{
                  backgroundColor: pal.background,
                  color: pal.accent,
                  borderColor: pal.accent,
                }}
              >
                0{idx + 2}
              </span>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-sm font-bold uppercase tracking-tight" style={{ color: pal.primary }}>
                  {it.title}
                </h4>
                <p className="text-xs opacity-75 leading-relaxed">
                  {it.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 pl-3 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border }}>
        <span>SWISS EDITORIAL GRID • SYSTEM {template.name.toUpperCase()}</span>
        <span>PAGE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
