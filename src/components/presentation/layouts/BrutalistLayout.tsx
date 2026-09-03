'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function BrutalistLayout({ slide, template }: LayoutProps) {
  const { items, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden font-sans select-none"
      style={{
        backgroundColor: pal.background,
        color: '#000000',
      }}
    >
      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b-3 border-black pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span
            className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 border-2 border-black"
            style={{ backgroundColor: pal.accent, color: '#000000' }}
          >
            {kicker}
          </span>
          <span className="text-[10px] font-mono font-bold">● POP BRUTALISM</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black tracking-tight uppercase">
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 font-bold text-slate-700 leading-snug">
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Brutalist Solid Shadow Cards ────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 my-auto py-3 items-stretch">
        {items.slice(0, 3).map((it, idx) => (
          <div
            key={idx}
            className="p-5 border-3 border-black rounded-none flex flex-col justify-between shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ backgroundColor: '#FFFFFF' }}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-xs font-black px-2 py-0.5 border-2 border-black"
                  style={{ backgroundColor: pal.accent, color: '#000000' }}
                >
                  #{it.number || `0${idx + 1}`}
                </span>
                <span className="text-[9px] font-mono font-bold uppercase">POINT</span>
              </div>
              <h3 className="text-base font-black uppercase leading-tight text-black">
                {it.title}
              </h3>
              <p className="text-xs font-medium text-slate-800 leading-relaxed">
                {it.desc}
              </p>
            </div>

            {it.tag && (
              <div className="pt-3 border-t-2 border-black mt-3">
                <span className="text-[9px] font-mono font-black uppercase px-2 py-0.5 border border-black bg-yellow-200 text-black">
                  {it.tag}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t-3 border-black pt-2 text-[10px] font-black uppercase">
        <span>DECKMIND AI // RAW BRUTALIST ARCHITECTURE</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
