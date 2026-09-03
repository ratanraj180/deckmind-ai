'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ConclusionBoldLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const takeaways = Array.isArray(content.takeaways) && content.takeaways.length > 0
    ? content.takeaways
    : [
        'Successfully engineered low-latency edge biometric verification pipeline achieving sub-50ms SLA.',
        'Eliminated central server hardware dependency, reducing deployment BOM overhead by 87%.',
        'Validated cryptographic audit trail with zero-knowledge tamper resistance under continuous operation.',
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
            // CONCLUSION & STRATEGIC CONTRIBUTIONS
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            DELIVERABLES VERIFIED
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title || 'Summary & Core Deliverables'}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* High-Impact Bold Takeaway Cards */}
      <div className="my-auto py-2 space-y-2.5 flex-1 flex flex-col justify-center">
        {takeaways.slice(0, 3).map((point: string, idx: number) => (
          <div
            key={idx}
            className={`p-4 flex items-center justify-between gap-4 transition-all ${
              isBrutalist
                ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'rounded-xl border'
            }`}
            style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className={`w-7 h-7 flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                  isBrutalist ? 'border border-black bg-emerald-400 text-black' : 'rounded-full text-white'
                }`}
                style={!isBrutalist ? { backgroundColor: pal.accent } : undefined}
              >
                ✓
              </span>
              <p className="text-xs sm:text-sm font-bold leading-relaxed" style={{ color: pal.primary }}>
                {point}
              </p>
            </div>

            <span
              className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase shrink-0 hidden sm:inline"
              style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
            >
              CONTRIBUTION 0{idx + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>PROJECT IMPACT & ARCHITECTURAL VERIFICATION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
