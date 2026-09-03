'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ThankYouLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const author = Array.isArray(content.authors) && content.authors.length > 0 ? content.authors[0] : (content.author || 'Engineering Team');
  const institution = content.institution || 'Technical Defense Panel';

  return (
    <div
      className="h-full w-full p-8 sm:p-14 flex flex-col justify-between items-center text-center relative overflow-hidden"
      style={{ color: pal.text }}
    >
      {/* Top Badge */}
      <span
        className={`text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-1 ${
          isBrutalist ? 'border-2 border-black bg-yellow-300 text-black' : 'rounded-full'
        }`}
        style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
      >
        // PRESENTATION CONCLUSION
      </span>

      {/* Main Closing Visual Center */}
      <div className="my-auto space-y-4 max-w-2xl">
        <h1
          className={`text-4xl sm:text-6xl font-black tracking-tight leading-tight uppercase ${
            template.fontMood === 'editorial' ? 'font-serif capitalize' : ''
          }`}
          style={{ color: pal.primary }}
        >
          {slide.title || 'Thank You'}
        </h1>

        <p className="text-base sm:text-xl font-medium opacity-80 max-w-xl mx-auto leading-relaxed" style={{ color: pal.secondary }}>
          {slide.subtitle || 'Open for Questions & Discussion'}
        </p>

        {/* Credentials Pill Box */}
        <div
          className={`p-4 max-w-md mx-auto mt-6 flex items-center justify-around text-xs font-mono ${
            isBrutalist
              ? 'border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'rounded-xl border'
          }`}
          style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
        >
          <div>
            <span className="text-[9px] opacity-60 block uppercase">INVESTIGATOR</span>
            <span className="font-bold" style={{ color: pal.primary }}>{author}</span>
          </div>
          <div className="h-6 w-px bg-current/20" />
          <div>
            <span className="text-[9px] opacity-60 block uppercase">FORUM</span>
            <span className="font-bold" style={{ color: pal.accent }}>{institution}</span>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle */}
      <div className="text-[10px] font-mono opacity-50 flex items-center gap-2">
        <span>DECKMIND AI PRESENTATION ENGINE</span>
        <span>•</span>
        <span>{template.name}</span>
      </div>
    </div>
  );
}
