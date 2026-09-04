'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function TechEcosystemLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const items = Array.isArray(content.items) && content.items.length > 0
    ? content.items
    : [
        { component: 'Core Compute Layer', spec: 'High-throughput execution engine with memory-mapped caching', cost: 'Optimized' },
        { component: 'Ingestion & Telemetry', spec: 'Low-latency optical / stream sensors with adaptive calibration', cost: 'Hardware Verified' },
        { component: 'Processing Runtime', spec: 'Precision execution engine with sub-linear matching lookup', cost: 'Production Ready' },
        { component: 'Storage & Ledger', spec: 'Encrypted persistence store with local WAL sync & replication', cost: 'Embedded' },
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
            // TECHNOLOGY STACK & HARDWARE BOM
          </span>
          <span className="text-[9px] font-mono opacity-60 uppercase">
            SPECIFICATION MATRIX
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

      {/* 4-Quadrant Technology Grid */}
      <div className="my-auto py-2 grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 items-stretch">
        {items.slice(0, 4).map((it: any, idx: number) => (
          <div
            key={idx}
            className={`p-4 flex flex-col justify-between transition-all ${
              isBrutalist
                ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'rounded-xl border'
            }`}
            style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-mono font-bold uppercase opacity-50">
                  QUADRANT 0${idx + 1}
                </span>
                <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded uppercase" style={{ backgroundColor: pal.background, color: pal.accent }}>
                  {it.cost || 'Verified'}
                </span>
              </div>
              <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
                {it.component}
              </h4>
              <p className="text-xs opacity-75 leading-relaxed pt-1">
                {it.spec}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>HARDWARE & SYSTEM SPECIFICATIONS</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
