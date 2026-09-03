'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function SolutionHeroLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const pillars = Array.isArray(content.pillars) && content.pillars.length > 0
    ? content.pillars
    : Array.isArray(content.bullets) && content.bullets.length > 0
    ? content.bullets.map((b: string, i: number) => ({ number: `0${i + 1}`, title: `Capability 0${i + 1}`, desc: b }))
    : [
        { number: '01', title: 'Decoupled Micro-Pipeline', desc: 'Asynchronous event streaming ensures sub-50ms latency.' },
        { number: '02', title: 'Edge Hardware Acceleration', desc: 'Embedded FP16 TensorRT inference on low-power silicon.' },
        { number: '03', title: 'Zero-Trust Telemetry Ledger', desc: 'Cryptographically signed audit logs with tamper resistance.' },
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
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
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
            ? 'border-3 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
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
          <h3 className="text-xl sm:text-2xl font-black tracking-tight" style={{ color: pal.primary }}>
            Autonomous Edge Perception Engine
          </h3>
          <p className="text-xs sm:text-sm opacity-80 leading-relaxed font-medium">
            Eliminating central cloud latency by decentralizing biometric verification and inference logic directly to embedded edge hardware nodes.
          </p>
        </div>

        {/* 3 Core Capability Blocks Inside Solution Hero */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-current/10 mt-4">
          {pillars.slice(0, 3).map((p: any, idx: number) => (
            <div
              key={idx}
              className={`p-3 text-left ${
                isBrutalist
                  ? 'border border-black bg-slate-50'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.background, borderColor: pal.border } : undefined}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-mono font-bold" style={{ color: pal.accent }}>
                  0{idx + 1}
                </span>
                <h4 className="text-xs font-bold truncate" style={{ color: pal.primary }}>
                  {p.title}
                </h4>
              </div>
              <p className="text-[11px] opacity-75 line-clamp-2 leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>SOLUTION SPECIFICATION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
