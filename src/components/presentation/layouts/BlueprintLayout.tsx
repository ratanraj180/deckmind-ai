'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function BlueprintLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden font-mono select-none"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
        backgroundImage: `radial-gradient(${pal.accent}30 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Blueprint Coordinate Crosshairs */}
      <div className="absolute top-2 left-3 text-[8px] opacity-40">
        REF: SEC-0{slide.slideNumber} // COORD [X:482.12 Y:991.04]
      </div>
      <div className="absolute top-2 right-3 text-[8px] opacity-40">
        SCALE: 1:1 VECTOR CAD
      </div>

      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3 mt-2" style={{ borderColor: pal.border }}>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] uppercase tracking-widest px-1.5 py-0.5 border" style={{ color: pal.accent, borderColor: pal.accent }}>
            {kicker}
          </span>
          <span className="text-[9px] opacity-60">SCHEMATIC PINOUT REV 1.4</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-75 font-sans leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Schematic Architecture Nodes ────────────────────────── */}
      <div className="my-auto py-3 space-y-2.5 flex-1 flex flex-col justify-center">
        {items.slice(0, 4).map((it, idx) => (
          <div
            key={idx}
            className="p-3 border flex items-center justify-between relative"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
            }}
          >
            {/* Left Node Pin */}
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span
                className="text-[10px] font-bold px-2 py-0.5 border shrink-0"
                style={{
                  backgroundColor: pal.background,
                  color: pal.accent,
                  borderColor: pal.border,
                }}
              >
                PIN_0{idx + 1}
              </span>
              <div className="min-w-0 pr-2">
                <span className="text-xs sm:text-sm font-bold block truncate" style={{ color: pal.primary }}>
                  {it.title}
                </span>
                <span className="text-[10px] opacity-75 block truncate font-sans">
                  {it.desc}
                </span>
              </div>
            </div>

            {/* Spec Tag */}
            <span
              className="text-[9px] px-2 py-0.5 border uppercase shrink-0"
              style={{
                backgroundColor: pal.accent + '15',
                color: pal.accent,
                borderColor: pal.accent + '40',
              }}
            >
              {it.tag || 'SPEC_VERIFIED'}
            </span>
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2 text-[8px] opacity-50" style={{ borderColor: pal.border }}>
        <span>ENGINEERING BLUEPRINT • CAD DRAWING NO. {slide.slideNumber}</span>
        <span>STATUS: APPROVED FOR MANUFACTURE</span>
      </div>
    </div>
  );
}
