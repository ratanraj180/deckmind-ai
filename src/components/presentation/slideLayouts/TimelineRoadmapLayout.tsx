'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function TimelineRoadmapLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const milestones = Array.isArray(content.milestones) && content.milestones.length > 0
    ? content.milestones
    : [
        { phase: 'Phase 1', title: 'Silicon Prototyping & Pipeline Design', desc: 'Hardware benchmarking, sensor calibration, and optical alignment on Jetson.' },
        { phase: 'Phase 2', title: 'Neural Model Optimization & Quantization', desc: 'TensorRT FP16 quantization, loss convergence verification, and FAISS indexing.' },
        { phase: 'Phase 3', title: 'Industrial Deployment & Multi-Node Cluster', desc: 'Air-gapped production roll-out, automated health telemetry, and cloud synchronization.' },
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
            // DEPLOYMENT HORIZON & ROADMAP
          </span>
          <span className="text-[9px] font-mono opacity-60 uppercase">
            3-PHASE EXECUTION
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

      {/* Horizontal Connected Milestone Journey */}
      <div className="my-auto py-2 flex-1 flex flex-col justify-center">
        <div className="relative">
          {/* Horizontal Track Line (desktop) */}
          <div
            className="hidden sm:block absolute top-4 left-6 right-6 h-0.5 z-0"
            style={{ backgroundColor: pal.border }}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 relative z-10 items-stretch">
            {milestones.slice(0, 3).map((m: any, idx: number) => (
              <div key={idx} className="space-y-3">
                {/* Milestone Node */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 flex items-center justify-center font-mono font-black text-xs ${
                      isBrutalist ? 'border-2 border-black bg-yellow-300 text-black' : 'rounded-full text-white'
                    }`}
                    style={!isBrutalist ? { backgroundColor: pal.accent } : undefined}
                  >
                    0{idx + 1}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase opacity-60">
                    {m.phase || `PHASE 0${idx + 1}`}
                  </span>
                </div>

                {/* Milestone Card */}
                <div
                  className={`p-4 h-44 flex flex-col justify-between ${
                    isBrutalist
                      ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                      : 'rounded-xl border'
                  }`}
                  style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
                >
                  <div className="space-y-1">
                    <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                      {m.title}
                    </h4>
                    <p className="text-[11px] opacity-75 leading-relaxed line-clamp-4">
                      {m.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[9px] font-mono opacity-60">
                    <span>STAGE STATUS</span>
                    <span className="font-bold" style={{ color: pal.accent }}>
                      {idx === 0 ? 'COMPLETED' : idx === 1 ? 'CURRENT' : 'PLANNED'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>MILESTONE TIMELINE HORIZON</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
