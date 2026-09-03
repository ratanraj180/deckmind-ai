'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function TitleSlideLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isCyber = template.layoutFamily === 'cyber' || template.layoutStyle === 'cyber-tech' || template.layoutStyle === 'linear-dark';

  const author = Array.isArray(content.authors) && content.authors.length > 0 ? content.authors[0] : (content.author || 'Engineering Lead');
  const institution = content.institution || 'Technical Presentation';
  const tags = Array.isArray(content.tags) && content.tags.length > 0 ? content.tags : ['System Architecture', 'Production Ready'];

  return (
    <div
      className="h-full w-full p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden"
      style={{ color: pal.text }}
    >
      {/* Top Badge */}
      <div className="flex items-center justify-between z-10">
        <span
          className={`text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 ${
            isBrutalist ? 'border-2 border-black bg-yellow-300 text-black' : 'rounded-full'
          }`}
          style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
        >
          {isCyber ? `[SYS_HERO] // ${institution.toUpperCase()}` : institution.toUpperCase()}
        </span>
        <span className="text-[10px] font-mono opacity-50">SLIDE 01 // OVERVIEW</span>
      </div>

      {/* Main Title Hero */}
      <div className="my-auto py-4 space-y-3 z-10 max-w-4xl">
        <h1
          className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase ${
            template.fontMood === 'editorial' ? 'font-serif capitalize' : ''
          }`}
          style={{ color: pal.primary }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p className="text-sm sm:text-lg opacity-80 max-w-2xl leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}

        {/* Tags / Pill Indicators */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {tags.slice(0, 4).map((tag: string, idx: number) => (
            <span
              key={idx}
              className={`text-[10px] font-mono font-bold px-2 py-0.5 ${
                isBrutalist ? 'border border-black bg-white text-black' : 'rounded-md border'
              }`}
              style={!isBrutalist ? { borderColor: pal.border, backgroundColor: pal.cardBg, color: pal.accent } : undefined}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Metadata Bar */}
      <div className={`flex items-center justify-between pt-3 border-t text-xs z-10 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <div className="flex items-center gap-3">
          <span className="font-bold" style={{ color: pal.primary }}>
            {author}
          </span>
          <span className="opacity-40">•</span>
          <span className="opacity-60 text-[11px] font-mono">Verified Production Specification</span>
        </div>
        <span className="text-[10px] font-mono font-bold" style={{ color: pal.accent }}>
          {template.name}
        </span>
      </div>
    </div>
  );
}
