'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';
import { extractNormalizedContent } from './layoutUtils';

interface LayoutProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function BentoLayout({ slide, template }: LayoutProps) {
  const { items, metrics, kicker, subtitle } = extractNormalizedContent(slide);
  const pal = template.palette;

  const heroItem = items[0] || {
    number: '01',
    title: 'Core Architecture',
    desc: 'Modular operational pipelines delivering high availability.',
  };
  const secondaryItems = items.slice(1, 3);
  const primaryMetric = metrics[0] || { label: 'Benchmark SLA', value: '99.4%' };

  return (
    <div
      className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
        backgroundImage: `linear-gradient(to right, ${pal.border}30 1px, transparent 1px), linear-gradient(to bottom, ${pal.border}30 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }}
    >
      {/* ── Slide Header ────────────────────────────────────────── */}
      <div className="border-b pb-3" style={{ borderColor: pal.border + '50' }}>
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-[10px] font-mono font-bold tracking-widest uppercase"
            style={{ color: pal.accent }}
          >
            // {kicker}
          </span>
          <span
            className="text-[9px] font-mono uppercase px-2 py-0.5 rounded"
            style={{ backgroundColor: pal.accent + '15', color: pal.accent }}
          >
            Bento Modular v2.4
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: pal.primary }}>
          {slide.title}
        </h2>
        {subtitle && (
          <p className="text-xs sm:text-sm mt-1 opacity-75 leading-relaxed" style={{ color: pal.secondary }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ── Asymmetric Bento Grid Canvas ────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 my-auto py-3 items-stretch flex-1">
        {/* Left Hero Bento Box (7 cols) */}
        <div
          className="col-span-7 p-6 rounded-2xl border flex flex-col justify-between relative shadow-sm"
          style={{
            backgroundColor: pal.cardBg,
            borderColor: pal.border,
          }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
            style={{ backgroundColor: pal.accent }}
          />

          <div className="space-y-2">
            <span
              className="text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded"
              style={{ backgroundColor: pal.accent + '20', color: pal.accent }}
            >
              HERO SPECIFICATION // {heroItem.number}
            </span>
            <h3 className="text-lg sm:text-xl font-bold leading-tight" style={{ color: pal.primary }}>
              {heroItem.title}
            </h3>
            <p className="text-xs sm:text-sm opacity-80 leading-relaxed">
              {heroItem.desc}
            </p>
          </div>

          {/* Hero KPI Block at bottom of Hero Bento Box */}
          <div
            className="mt-4 p-3 rounded-xl border flex items-center justify-between"
            style={{ backgroundColor: pal.background, borderColor: pal.border }}
          >
            <div>
              <span className="text-[10px] font-mono opacity-60 block">VERIFIED METRIC</span>
              <span className="text-xs font-bold" style={{ color: pal.primary }}>
                {primaryMetric.label}
              </span>
            </div>
            <span className="text-xl sm:text-2xl font-mono font-black" style={{ color: pal.accent }}>
              {primaryMetric.value}
            </span>
          </div>
        </div>

        {/* Right Stacked Bento Boxes (5 cols) */}
        <div className="col-span-5 flex flex-col gap-3 justify-between">
          {(secondaryItems.length > 0 ? secondaryItems : [heroItem]).map((sec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border flex-1 flex flex-col justify-between relative shadow-sm"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <div className="space-y-1">
                <span className="text-[9px] font-mono opacity-50 uppercase font-bold">
                  MODULE {sec.number || `0${idx + 2}`}
                </span>
                <h4 className="text-sm font-bold leading-tight" style={{ color: pal.primary }}>
                  {sec.title}
                </h4>
                <p className="text-[11px] opacity-75 line-clamp-3 leading-snug">
                  {sec.desc}
                </p>
              </div>
              {sec.tag && (
                <span
                  className="text-[9px] font-mono self-start mt-2 px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: pal.background, color: pal.accent, border: `1px solid ${pal.border}` }}
                >
                  {sec.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Slide Footer ────────────────────────────────────────── */}
      <div className="flex items-center justify-between border-t pt-2.5 text-[9px] font-mono opacity-60" style={{ borderColor: pal.border + '40' }}>
        <span>DeckMind AI • Bento Modular System</span>
        <span>Slide {slide.slideNumber}</span>
      </div>
    </div>
  );
}
