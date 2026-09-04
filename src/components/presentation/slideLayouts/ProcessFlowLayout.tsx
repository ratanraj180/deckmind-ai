'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ProcessFlowLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const steps = Array.isArray(content.steps) && content.steps.length > 0
    ? content.steps
    : [
        { step: '01', name: 'Input Ingestion', desc: 'Captures raw input streams with zero memory buffer bloat.', tech: 'Stream Protocol' },
        { step: '02', name: 'Feature Processing', desc: 'Executes transformation algorithms under deterministic SLAs.', tech: 'Core Transformation' },
        { step: '03', name: 'Verification & Audit', desc: 'Validates integrity against target constraints and thresholds.', tech: 'Consistency Check' },
        { step: '04', name: 'Atomic Commit', desc: 'Persists verified records and triggers downstream events.', tech: 'Atomic Output' },
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
            // METHODOLOGY & EXECUTION PIPELINE
          </span>
          <span className="text-[9px] font-mono opacity-60 uppercase">
            SEQUENTIAL STAGE PIPELINE
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

      {/* Horizontal Flowchart Node Chain */}
      <div className="my-auto py-2 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-stretch relative">
          {steps.slice(0, 4).map((st: any, idx: number) => (
            <div key={idx} className="relative flex flex-col justify-between">
              <div
                className={`p-4 h-full flex flex-col justify-between transition-all ${
                  isBrutalist
                    ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'rounded-xl border'
                }`}
                style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-black px-2 py-0.5 ${
                        isBrutalist ? 'border border-black bg-yellow-300 text-black' : 'rounded'
                      }`}
                      style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
                    >
                      STAGE {st.step || `0${idx + 1}`}
                    </span>
                    <span className="text-[8px] font-mono opacity-50 uppercase">
                      {st.tech || 'CORE'}
                    </span>
                  </div>
                  <h4 className={`text-xs sm:text-sm font-bold leading-tight ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
                    {st.name}
                  </h4>
                  <p className="text-xs opacity-75 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>EXECUTION LIFECYCLE AUDIT</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
