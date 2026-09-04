'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function ArchitectureDiagramLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';
  const isEditorial = template.fontMood === 'editorial';

  const layers = Array.isArray(content.layers) && content.layers.length > 0
    ? content.layers
    : [
        { node: 'Tier 1: Ingestion Gateway', details: 'Hardware-accelerated input stream capture with zero-copy buffers.', type: 'Ingestion Layer' },
        { node: 'Tier 2: Analytical Core', details: 'Embedded inference engine optimized for low latency and high accuracy.', type: 'Compute Core' },
        { node: 'Tier 3: Persistence Store', details: 'Encrypted storage with transactional indexing and integrity verification.', type: 'Vector Database' },
        { node: 'Tier 4: Service Delivery', details: 'Decoupled API gateway providing authenticated client presentation.', type: 'Persistence Layer' },
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
            // SYSTEM ARCHITECTURE & TIER DECOMPOSITION
          </span>
          <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded uppercase border" style={{ borderColor: pal.border, color: pal.accent }}>
            4-TIER TOPOLOGY
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

      {/* Connected Architecture Flow Diagram */}
      <div className="my-auto py-2 space-y-2 flex-1 flex flex-col justify-center">
        {layers.slice(0, 4).map((l: any, idx: number) => (
          <div key={idx} className="flex flex-col items-center">
            {/* Tier Box */}
            <div
              className={`w-full p-3 flex items-center justify-between transition-all ${
                isBrutalist
                  ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'rounded-xl border'
              }`}
              style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
            >
              <div className="flex items-center gap-3 min-w-0">
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-1 shrink-0 ${
                    isBrutalist ? 'border border-black bg-yellow-300 text-black' : 'rounded'
                  }`}
                  style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
                >
                  {l.name || `TIER 0${idx + 1}`}
                </span>
                <div className="min-w-0">
                  <h4 className={`text-xs sm:text-sm font-bold truncate ${isEditorial ? 'font-serif' : ''}`} style={{ color: pal.primary }}>
                    {l.node}
                  </h4>
                  <p className="text-[11px] opacity-75 truncate">{l.details}</p>
                </div>
              </div>

              <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded border hidden sm:inline shrink-0" style={{ borderColor: pal.border, color: pal.accent }}>
                {l.type || 'SYSTEM NODE'}
              </span>
            </div>

            {/* Connecting Chevron/Arrow (between tiers) */}
            {idx < 3 && (
              <div className="h-2 w-0.5 my-0.5 opacity-40" style={{ backgroundColor: pal.accent }} />
            )}
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>MULTI-TIER ARCHITECTURAL SPECIFICATION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
