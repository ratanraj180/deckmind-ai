'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ProcessFlowLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const steps = Array.isArray(content.steps) && content.steps.length > 0
    ? content.steps
    : [
        { step: '01', name: 'Raw Capture', desc: 'RTSP optical frame stream ingestion at 30 FPS.', tech: 'OpenCV' },
        { step: '02', name: 'Alignment', desc: 'Landmark detection and affine warping normalization.', tech: 'InsightFace' },
        { step: '03', name: 'Inference', desc: 'Vector extraction and FAISS cosine distance comparison.', tech: 'TensorRT' },
        { step: '04', name: 'Commit', desc: 'Timestamped write to SQLite audit log with cryptographic hash.', tech: 'FastAPI' },
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
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
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
                      className={`w-6 h-6 flex items-center justify-center font-mono font-bold text-xs ${
                        isBrutalist ? 'border border-black bg-yellow-300 text-black' : 'rounded-full text-white'
                      }`}
                      style={!isBrutalist ? { backgroundColor: pal.accent } : undefined}
                    >
                      {st.step || idx + 1}
                    </span>
                    <span className="text-[9px] font-mono opacity-50 uppercase">STAGE</span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                    {st.name}
                  </h4>
                  <p className="text-[11px] opacity-75 leading-relaxed">
                    {st.desc}
                  </p>
                </div>

                {st.tech && (
                  <div className="pt-2 border-t border-current/10 mt-2">
                    <span className="text-[9px] font-mono font-bold" style={{ color: pal.accent }}>
                      ⚡ {st.tech}
                    </span>
                  </div>
                )}
              </div>

              {/* Arrow indicator between nodes (desktop) */}
              {idx < 3 && (
                <div className="hidden sm:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-xs font-mono font-bold opacity-60">
                  →
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>FLOWCHART EXECUTION LIFECYCLE</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
