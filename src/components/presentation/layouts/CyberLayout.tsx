'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function CyberLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden font-mono"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
        backgroundImage: `radial-gradient(ellipse at 20% 50%, ${pal.accent}20 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${pal.primary}15 0%, transparent 50%)`,
      }}
    >
      {/* Top glowing laser line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px] z-10"
        style={{ background: `linear-gradient(90deg, ${pal.accent}, ${pal.primary}, transparent)` }}
      />

      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3" style={{ borderColor: pal.border }}>
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            [SYSTEM_CORE] // {kicker}
          </span>
          <div className="flex items-center gap-2 text-[9px] font-mono opacity-70">
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: pal.accent }} />
            <span>ONLINE TELEMETRY</span>
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-70 leading-relaxed font-sans" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Cyber HUD Cards ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-auto py-3 items-stretch">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl border flex flex-col justify-between relative overflow-hidden transition-all hover:border-current"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
              boxShadow: `0 0 25px -5px ${pal.accent}15`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ backgroundColor: pal.accent }}
            />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-[10px] opacity-60">
                <span>[NODE_0{idx + 1}]</span>
                <span style={{ color: pal.accent }}>VERIFIED</span>
              </div>
              <h3 className="text-sm sm:text-base font-bold tracking-tight" style={{ color: pal.primary }}>
                {it.title}
              </h3>
              <p className="text-xs opacity-75 leading-relaxed font-sans">
                {it.desc}
              </p>
            </div>

            <div className="pt-3 border-t mt-3 flex items-center justify-between text-[9px]" style={{ borderColor: pal.border }}>
              <span className="opacity-50">STATUS</span>
              <span className="px-1.5 py-0.5 rounded uppercase font-bold" style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}>
                {it.tag || 'ACTIVE'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] opacity-50" style={{ borderColor: pal.border }}>
        <span>CYBER PROTOCOL • {template.name.toUpperCase()}</span>
        <span>INDEX 0{slide.slideNumber}</span>
      </div>
    </div>
  );
}
