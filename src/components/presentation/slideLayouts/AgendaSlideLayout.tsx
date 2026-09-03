'use client';

import React from 'react';
import { SlideLayoutProps } from './types';

export function AgendaSlideLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;
  const isBrutalist = template.layoutFamily === 'brutalist' || template.layoutStyle === 'neo-brutalist';

  const agendaItems = Array.isArray(content.agenda) && content.agenda.length > 0
    ? content.agenda
    : Array.isArray(content.pillars) && content.pillars.length > 0
    ? content.pillars
    : [
        { number: '01', title: 'Problem Context & Operational Bottlenecks', time: '2 min', tag: 'Discovery' },
        { number: '02', title: 'Core Architectural Paradigm & Components', time: '3 min', tag: 'Design' },
        { number: '03', title: 'End-to-End Processing & Algorithmic Flow', time: '3 min', tag: 'Execution' },
        { number: '04', title: 'Empirical Verification & KPI Metrics', time: '2 min', tag: 'Validation' },
        { number: '05', title: 'Deployment Roadmap & Key Deliverables', time: '2 min', tag: 'Impact' },
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
            // 02. PRESENTATION ROADMAP & INDEX
          </span>
          <span className="text-[9px] font-mono opacity-60 uppercase">
            5 CHAPTERS
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title || 'Table of Contents & Agenda'}
        </h2>
        {slide.subtitle && (
          <p className="text-xs sm:text-sm mt-0.5 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {slide.subtitle}
          </p>
        )}
      </div>

      {/* Numbered Agenda Navigation Grid */}
      <div className="my-auto py-2 space-y-2 flex-1 flex flex-col justify-center">
        {agendaItems.slice(0, 5).map((item: any, idx: number) => (
          <div
            key={idx}
            className={`p-3 sm:p-3.5 flex items-center justify-between transition-all ${
              isBrutalist
                ? 'border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                : 'rounded-xl border'
            }`}
            style={!isBrutalist ? { backgroundColor: pal.cardBg, borderColor: pal.border } : undefined}
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <span
                className={`text-xs font-mono font-black px-2 py-1 shrink-0 ${
                  isBrutalist ? 'border border-black bg-yellow-300 text-black' : 'rounded-md'
                }`}
                style={!isBrutalist ? { backgroundColor: pal.accent + '20', color: pal.accent } : undefined}
              >
                {item.number || `0${idx + 1}`}
              </span>
              <div className="min-w-0">
                <h4 className="text-xs sm:text-sm font-bold truncate" style={{ color: pal.primary }}>
                  {item.title}
                </h4>
                {item.desc && (
                  <p className="text-[11px] opacity-70 truncate">{item.desc}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {item.tag && (
                <span
                  className="text-[9px] font-mono px-2 py-0.5 rounded uppercase hidden sm:inline"
                  style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
                >
                  {item.tag}
                </span>
              )}
              <span className="text-[10px] font-mono font-bold opacity-60">
                {item.time || `${idx + 1}m`}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Footer */}
      <div className={`flex items-center justify-between border-t pt-2 text-[9px] font-mono opacity-60 ${isBrutalist ? 'border-t-2 border-black' : ''}`} style={{ borderColor: pal.border }}>
        <span>AGENDA TIMELINE NAVIGATION</span>
        <span>SLIDE {slide.slideNumber}</span>
      </div>
    </div>
  );
}
