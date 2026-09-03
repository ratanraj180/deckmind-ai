'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function VivaDefenseLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const qaList = Array.isArray(content.qaList) && content.qaList.length > 0
    ? content.qaList
    : [
        {
          q: 'How does the system mitigate adversarial spoofing or print attacks?',
          a: 'Dual-layer anti-spoofing combines optical flow texture analysis with infrared depth filtering, rejecting flat photographs with 99.8% precision.',
          category: 'Security & Robustness',
        },
        {
          q: 'What is the latency trade-off between FP32 and FP16 inference on edge hardware?',
          a: 'FP16 TensorRT reduces memory footprint by 50% and accelerates throughput by 2.4x while maintaining less than 0.1% loss in top-1 recognition accuracy.',
          category: 'Computational Efficiency',
        },
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
            // VIVA VOCE EXAMINATION DEFENSE
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-amber-50 text-amber-700 border border-amber-200">
            ANTICIPATED EXAMINER QUERIES
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title || 'Technical Scrutiny & Cross-Examination'}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* 2 Detailed Examination Q&A Defense Cards */}
      <div className="my-auto py-2 space-y-3 flex-1 flex flex-col justify-center">
        {qaList.slice(0, 2).map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-4 sm:p-5 flex flex-col justify-between ${
              isBrutalist
                ? 'border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                : 'rounded-xl border'
            }`}
            style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span
                  className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase"
                  style={{ backgroundColor: pal.accent + '20', color: pal.accent }}
                >
                  QUERY 0{idx + 1} // {item.category || 'EXAMINATION'}
                </span>
                <span className="text-[9px] font-mono opacity-50 uppercase">DEFENSE VERIFIED</span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                Q: {item.q}
              </h4>

              <div className="p-3 rounded-lg border border-current/10 bg-current/2 text-xs leading-relaxed opacity-90">
                <span className="font-bold block mb-0.5" style={{ color: pal.accent }}>
                  Technical Defense:
                </span>
                {item.a}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>VIVA VOCE SCRUTINY READINESS</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
