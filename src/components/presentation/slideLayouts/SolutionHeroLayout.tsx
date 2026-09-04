'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function SolutionHeroLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const pillars = Array.isArray(content.pillars) && content.pillars.length > 0
    ? content.pillars
    : Array.isArray(content.bullets) && content.bullets.length > 0
    ? content.bullets.map((b: string, i: number) => ({
        number: `0${i + 1}`,
        title: b.match(/\*\*([^*]+)\*\*/)?.[1] || `Core Capability 0${i + 1}`,
        desc: b.replace(/^\*\*[^*]+\*\*:\s*/, ''),
      }))
    : [
        { number: '01', title: 'Decoupled Core Architecture', desc: 'Modular micro-architecture ensuring low latency and high stability.' },
        { number: '02', title: 'Optimized Transformation Engine', desc: 'Streamlined processing pipeline executing under deterministic SLAs.' },
        { number: '03', title: 'Verified Persistence & Delivery', desc: 'End-to-end telemetry and validation with zero single point of failure.' },
      ];

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{ color: pal.text }}
    >
      {/* Slide Header */}
      <div className={`border-b pb-3 ${isBrutalist ? 'border-b-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: pal.accent }}>
            // SOLUTION ARCHITECTURE & VALUE PROPOSITION
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            PROPOSED BREAKTHROUGH
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isEditorial ? 'font-serif capitalize' : ''}`} style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Central Big Concept Hero Visual Box */}
      <div
        className={`my-auto p-5 sm:p-6 flex flex-col justify-between ${
          isBrutalist
            ? 'border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
            : 'rounded-2xl border'
        }`}
        style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
      >
        <div className="space-y-2 text-center max-w-2xl mx-auto py-1">
          <span
            className="text-[10px] font-mono uppercase font-black px-2.5 py-1 rounded-full border inline-block"
            style={{ backgroundColor: pal.accent + '15', borderColor: pal.accent + '40', color: pal.accent }}
          >
            THE PROPOSED PARADIGM
          </span>
          <h3 className={`text-lg sm:text-xl font-black ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
            {slide.title}
          </h3>
          <p className="text-xs opacity-80 leading-relaxed max-w-xl mx-auto">
            {slide.subtitle || 'Engineered to replace manual friction with an autonomous, high-throughput modular pipeline.'}
          </p>
        </div>

        {/* 3 Core Solution Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t" style={{ borderColor: pal.border }}>
          {pillars.slice(0, 3).map((pil: any, idx: number) => (
            <div
              key={idx}
              className={`p-3.5 flex flex-col justify-between transition-all ${
                isBrutalist
                  ? 'border border-black bg-slate-50'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.background, borderColor: pal.border } : undefined}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-mono font-black px-2 py-0.5 ${
                      isBrutalist ? 'border border-black bg-emerald-400 text-black' : 'rounded'
                    }`}
                    style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
                  >
                    {pil.number || `0${idx + 1}`}
                  </span>
                  <span className="text-[8px] font-mono opacity-50 uppercase">PILLAR</span>
                </div>
                <h4 className={`text-xs font-bold leading-tight pt-1 ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
                  {pil.title}
                </h4>
                <p className="text-[11px] opacity-75 leading-relaxed">
                  {pil.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>SOLUTION SPECIFICATION & VALUE PROPOSITION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
