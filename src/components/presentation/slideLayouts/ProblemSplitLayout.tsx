'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ProblemSplitLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const bullets = Array.isArray(content.bullets) ? content.bullets : [];
  const comparison = Array.isArray(content.comparison) ? content.comparison : [];

  const challenges = comparison.length > 0
    ? comparison.map((c: any, i: number) => ({
        title: c.aspect || `Challenge 0${i + 1}`,
        desc: c.flaw || c.desc || 'High latency and manual bottleneck compromising throughput.',
        severity: c.severity || 'Critical',
      }))
    : bullets.slice(0, 3).map((b: string, i: number) => ({
        title: `Operational Bottleneck 0${i + 1}`,
        desc: b,
        severity: i === 0 ? 'Critical' : 'High',
      }));

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{ color: pal.text }}
    >
      {/* Slide Header */}
      <div className={`border-b pb-3 ${isBrutalist ? 'border-b-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase" style={{ color: pal.accent }}>
            // PROBLEM STATEMENT & OPERATIONAL FRICTION
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-rose-150 text-rose-800 border border-rose-200">
            CHALLENGES IDENTIFIED
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Asymmetric Split Layout: Left Problem Anchor, Right Pain Points */}
      <div className="grid grid-cols-12 gap-4 my-auto py-2 flex-1 items-stretch">
        {/* Left Pain Point Focal Box (5 cols) */}
        <div
          className={`col-span-5 p-5 flex flex-col justify-between ${
            isBrutalist
              ? 'border-2 border-black bg-rose-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'rounded-2xl border'
          }`}
          style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
        >
          <div className="space-y-2">
            <span className="text-[9px] font-mono uppercase font-bold text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded border border-rose-200 inline-block">
              CORE PROBLEM FORMULATION
            </span>
            <h3 className="text-base sm:text-lg font-bold leading-tight" style={{ color: pal.primary }}>
              The Legacy System Dilemma
            </h3>
            <p className="text-xs opacity-80 leading-relaxed">
              Manual verification, fragmented communication tiers, and computational latency lead to cascading operational errors and single points of failure.
            </p>
          </div>

          <div className="p-3 rounded-xl border border-rose-200 bg-white space-y-1 mt-4">
            <span className="text-[9px] font-mono text-rose-600 font-bold uppercase block">FAILURE RATE</span>
            <span className="text-xl sm:text-2xl font-mono font-black text-rose-600">32.4%</span>
            <span className="text-[10px] text-slate-500 block leading-tight">Unmitigated baseline error overhead</span>
          </div>
        </div>

        {/* Right Structured Challenge List (7 cols) */}
        <div className="col-span-7 flex flex-col gap-2.5 justify-between">
          {challenges.slice(0, 3).map((ch: any, idx: number) => (
            <div
              key={idx}
              className={`p-4 flex-1 flex flex-col justify-between transition-all ${
                isBrutalist
                  ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono font-bold uppercase opacity-50">
                      0{idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                      {ch.title}
                    </h4>
                  </div>
                  <p className="text-xs opacity-75 leading-relaxed line-clamp-2">
                    {ch.desc}
                  </p>
                </div>

                <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 shrink-0 uppercase">
                  {ch.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>PROBLEM FORMULATION & DEFENSE ANALYSIS</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
