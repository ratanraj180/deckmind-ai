'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function VivaDefenseLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const qaList = Array.isArray(content.qaList) && content.qaList.length > 0
    ? content.qaList
    : [
        {
          q: 'What is the theoretical justification for the methodology chosen in this study?',
          a: 'The approach minimizes empirical error rates by enforcing calibrated thresholding rather than heuristic matching.',
          badge: 'Methodology',
        },
        {
          q: 'How does the system handle edge cases and environmental variance?',
          a: 'Normalized feature extraction and secondary verification prevent failure under noisy inputs.',
          badge: 'Reliability',
        },
        {
          q: 'What are the scalability constraints for production deployment?',
          a: 'Decoupled architecture ensures local nodes operate independently of central server latency, enabling horizontal scaling.',
          badge: 'Scalability',
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
            // VIVA VOCE & TECHNICAL DEFENSE
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase bg-purple-50 text-purple-700 border border-purple-200">
            COMMITTEE SCRUTINY
          </span>
        </div>
        <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isEditorial ? 'font-serif capitalize' : ''}`} style={{ color: pal.primary }}>
          {slide.title || 'Technical Examination & Defense Points'}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Q&A Cards */}
      <div className="my-auto py-2 space-y-2.5 flex-1 flex flex-col justify-center">
        {qaList.slice(0, 3).map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-3.5 flex flex-col justify-between gap-1.5 transition-all ${
              isBrutalist
                ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'rounded-xl border'
            }`}
            style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded uppercase" style={{ backgroundColor: pal.accent + '20', color: pal.accent }}>
                  Q0${idx + 1}
                </span>
                <h4 className={`text-xs sm:text-sm font-bold ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
                  {item.q}
                </h4>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded uppercase border" style={{ borderColor: pal.border, color: pal.secondary }}>
                {item.badge}
              </span>
            </div>
            <p className="text-xs opacity-75 leading-relaxed pl-8">
              <span className="font-bold text-emerald-600 mr-1">Defense:</span>
              {item.a}
            </p>
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>VIVA VOCE EXAMINATION SCRUTINY</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
