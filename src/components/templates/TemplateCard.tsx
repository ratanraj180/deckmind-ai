'use client';

import React from 'react';
import { PresentationTemplate } from '@/types/templates';
import { Check, Sparkles, BarChart2 } from 'lucide-react';

interface TemplateCardProps {
  template: PresentationTemplate;
  isSelected: boolean;
  onSelect: (template: PresentationTemplate) => void;
}

export function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  const { palette, previewSnippet, layoutStyle, fontMood } = template;

  const fontClass = {
    clean_sans: 'font-sans',
    editorial: 'font-serif',
    professional: 'font-sans',
    technical: 'font-mono',
    bold_display: 'font-sans font-black tracking-tighter',
  }[fontMood];

  const family =
    template.layoutFamily ||
    (layoutStyle === 'bento-grid' ? 'bento' :
     layoutStyle === 'asymmetric-grid' ? 'swiss-grid' :
     layoutStyle === 'apple-minimal' ? 'minimal' :
     layoutStyle === 'neo-brutalist' ? 'brutalist' :
     layoutStyle === 'cyber-tech' || layoutStyle === 'linear-dark' ? 'cyber' :
     layoutStyle === 'poster' ? 'poster' :
     layoutStyle === 'data-dashboard' ? 'dashboard' :
     layoutStyle === 'blueprint' ? 'blueprint' :
     layoutStyle === 'corporate-premium' ? 'corporate' :
     layoutStyle === 'bold-magazine' || layoutStyle === 'magazine' ? 'editorial' :
     layoutStyle === 'split-hero' ? 'split-screen' :
     'bento');

  // Render genuinely distinct miniature slide compositions based on layoutFamily
  const renderMiniatureSlide = () => {
    switch (family) {
      case 'bento':
        return (
          <div className="h-full flex flex-col justify-between p-2">
            <div className="flex items-center justify-between">
              <span className="text-[6px] font-mono font-bold" style={{ color: palette.accent }}>
                BENTO // 01
              </span>
              <span className="text-[5px] font-mono opacity-50">MODULAR</span>
            </div>
            <div className="grid grid-cols-12 gap-1 my-auto">
              <div
                className="col-span-7 p-1 rounded border flex flex-col justify-between"
                style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}
              >
                <div className="text-[7px] font-bold line-clamp-1">{previewSnippet.title}</div>
                <div className="text-[7px] font-mono font-black" style={{ color: palette.accent }}>
                  {previewSnippet.statValue || '99.4%'}
                </div>
              </div>
              <div className="col-span-5 flex flex-col gap-1">
                <div className="h-4 rounded border p-0.5" style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}>
                  <span className="text-[5px] block truncate opacity-70">Mod A</span>
                </div>
                <div className="h-4 rounded border p-0.5" style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}>
                  <span className="text-[5px] block truncate opacity-70">Mod B</span>
                </div>
              </div>
            </div>
            <div className="text-[5px] font-mono opacity-40">2026 UI GRID</div>
          </div>
        );

      case 'swiss-grid':
        return (
          <div className="h-full flex flex-col justify-between p-2 relative">
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: palette.accent }} />
            <div className="flex items-center justify-between border-b pb-0.5 pl-1.5 border-current/20">
              <span className="text-[6px] font-mono tracking-wider font-bold">SWISS GRID</span>
              <span className="text-[5px] font-mono opacity-60">ZURICH</span>
            </div>
            <div className="grid grid-cols-12 gap-1 my-auto pl-1.5">
              <div className="col-span-8 space-y-0.5">
                <div className="text-[8px] font-black leading-none line-clamp-2">
                  {previewSnippet.title}
                </div>
                <div className="text-[5px] opacity-70 line-clamp-1">{previewSnippet.subtitle}</div>
              </div>
              <div className="col-span-4 border-l pl-1 border-current/20 flex flex-col justify-between">
                <span className="text-[5px] opacity-60">CH. 01</span>
                <span className="text-[7px] font-mono font-bold" style={{ color: palette.accent }}>
                  {previewSnippet.statValue || '100%'}
                </span>
              </div>
            </div>
            <div className="text-[5px] font-mono opacity-50 pl-1.5">DISCIPLINE // NORMATIVE</div>
          </div>
        );

      case 'brutalist':
        return (
          <div className="h-full flex flex-col justify-between p-2 border-2 border-black bg-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between">
              <span
                className="text-[6px] font-black uppercase px-1 border border-black"
                style={{ backgroundColor: palette.accent, color: '#000' }}
              >
                POP
              </span>
              <span className="text-[5px] font-mono font-bold text-black">RAW</span>
            </div>
            <div className="my-auto space-y-0.5">
              <div className="text-[8px] font-black uppercase leading-tight line-clamp-2 text-black">
                {previewSnippet.title}
              </div>
              <div className="text-[6px] font-bold text-slate-700">{previewSnippet.statValue}</div>
            </div>
            <div className="text-[5px] font-mono font-black uppercase text-black">BRUTALIST ARCH</div>
          </div>
        );

      case 'cyber':
        return (
          <div className="h-full flex flex-col justify-between p-2 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 h-0.5"
              style={{ background: `linear-gradient(90deg, ${palette.accent}, transparent)` }}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <span className="h-1 w-1 rounded-full animate-ping" style={{ backgroundColor: palette.accent }} />
                <span className="text-[6px] font-mono font-bold" style={{ color: palette.accent }}>
                  SYS_ACTIVE
                </span>
              </div>
              <span className="text-[5px] font-mono opacity-50">HUD</span>
            </div>
            <div className="my-auto space-y-1">
              <div className="text-[8px] font-bold line-clamp-1">{previewSnippet.title}</div>
              <div className="text-[6px] font-mono opacity-70">{previewSnippet.statValue} LATENCY</div>
            </div>
            <div className="text-[5px] font-mono opacity-40">TENSOR STREAM</div>
          </div>
        );

      case 'blueprint':
        return (
          <div className="h-full flex flex-col justify-between p-2 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:6px_6px] relative">
            <div className="flex items-center justify-between">
              <span className="text-[6px] font-mono font-bold text-sky-400">CAD // SCHEMATIC</span>
              <span className="text-[5px] font-mono opacity-60">1:1</span>
            </div>
            <div className="my-auto p-1 rounded border border-sky-500/50 bg-sky-950/40 space-y-0.5">
              <div className="text-[7px] font-mono font-bold text-white line-clamp-1">
                {previewSnippet.title}
              </div>
              <div className="text-[5px] font-mono text-sky-300">
                <span>PIN_01 → </span>
                <span className="font-bold text-white">{previewSnippet.statValue}</span>
              </div>
            </div>
            <div className="text-[5px] font-mono text-sky-400/80">BOM SPEC VERIFIED</div>
          </div>
        );

      case 'minimal':
        return (
          <div className="h-full flex flex-col justify-between p-2.5">
            <span className="text-[5px] font-mono opacity-40">// MINIMAL</span>
            <div className="my-auto space-y-0.5">
              <div className="text-[9px] font-black tracking-tight leading-tight line-clamp-2">
                {previewSnippet.title}
              </div>
              <div className="text-[6px] opacity-60 line-clamp-1">{previewSnippet.subtitle}</div>
            </div>
            <div className="flex items-center justify-between border-t pt-0.5 text-[5px] opacity-40">
              <span>Cupertino</span>
              <span>100%</span>
            </div>
          </div>
        );

      case 'dashboard':
        return (
          <div className="h-full flex flex-col justify-between p-2">
            <div className="flex items-center justify-between">
              <span className="text-[6px] font-mono font-bold opacity-70">TELEMETRY</span>
              <BarChart2 className="h-2 w-2" style={{ color: palette.accent }} />
            </div>
            <div className="my-auto grid grid-cols-2 gap-1">
              <div
                className="p-1 rounded border text-center"
                style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}
              >
                <span className="text-[5px] opacity-60 block">SLA</span>
                <span className="text-[8px] font-bold font-mono" style={{ color: palette.accent }}>
                  {previewSnippet.statValue || '99.4%'}
                </span>
              </div>
              <div
                className="p-1 rounded border text-center"
                style={{ backgroundColor: palette.cardBg, borderColor: palette.border }}
              >
                <span className="text-[5px] opacity-60 block">P99</span>
                <span className="text-[8px] font-bold font-mono">42ms</span>
              </div>
            </div>
            <div className="text-[5px] font-mono opacity-50">AUDITED DATA</div>
          </div>
        );

      case 'editorial':
      case 'magazine':
        return (
          <div className="h-full flex flex-col justify-between p-2 text-center font-serif">
            <div className="text-[5px] tracking-widest uppercase border-b pb-0.5 border-current/20">
              EDITORIAL VOLUME
            </div>
            <div className="my-auto space-y-0.5">
              <div className="text-[8px] font-serif font-bold leading-tight line-clamp-2">
                {previewSnippet.title}
              </div>
              <div className="text-[5px] italic opacity-70 line-clamp-1">
                &ldquo;{previewSnippet.subtitle}&rdquo;
              </div>
            </div>
            <div className="text-[5px] opacity-50">PAGE 03</div>
          </div>
        );

      case 'timeline':
        return (
          <div className="h-full flex flex-col justify-between p-2">
            <span className="text-[6px] font-mono font-bold" style={{ color: palette.accent }}>
              // CHRONO FLOW
            </span>
            <div className="my-auto flex items-center justify-between px-1">
              {[1, 2, 3].map(n => (
                <div key={n} className="flex flex-col items-center gap-0.5">
                  <div
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[6px] font-bold text-white"
                    style={{ backgroundColor: palette.accent }}
                  >
                    0{n}
                  </div>
                  <span className="text-[4px] font-mono opacity-60">Phase</span>
                </div>
              ))}
            </div>
            <div className="text-[5px] font-mono opacity-50">PROGRESSION PATH</div>
          </div>
        );

      case 'split-screen':
      default:
        return (
          <div className="h-full flex">
            <div
              className="w-1/3 p-1.5 flex flex-col justify-between text-white"
              style={{ backgroundColor: palette.primary }}
            >
              <span className="text-[5px] font-mono font-bold">SPLIT</span>
              <div className="text-[6px] font-bold leading-tight line-clamp-2">
                {previewSnippet.title}
              </div>
              <span className="text-[4px] opacity-60">50/50</span>
            </div>
            <div
              className="w-2/3 p-1.5 flex flex-col justify-between"
              style={{ backgroundColor: palette.cardBg }}
            >
              <span className="text-[5px] opacity-60">CARDS</span>
              <div className="h-3 rounded border p-0.5" style={{ borderColor: palette.border }}>
                <span className="text-[5px] block truncate font-bold">{previewSnippet.statValue || 'Detail'}</span>
              </div>
              <span className="text-[5px] font-mono opacity-40">HERO PANEL</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      onClick={() => onSelect(template)}
      className={`group relative flex flex-col rounded-2xl border text-left transition-all duration-200 cursor-pointer overflow-hidden ${
        isSelected
          ? 'border-indigo-600 ring-2 ring-indigo-500 shadow-md bg-white'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-sm bg-white'
      }`}
    >
      {/* Visual Canvas 16:9 Container */}
      <div
        className={`aspect-[16/9] w-full overflow-hidden relative border-b select-none ${fontClass}`}
        style={{
          backgroundColor: palette.background,
          borderColor: palette.border,
          color: palette.text,
        }}
      >
        {renderMiniatureSlide()}

        {/* Selected Checkmark Badge */}
        {isSelected && (
          <div className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-white shadow-md z-20">
            <Check className="h-3 w-3 stroke-[3]" />
          </div>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-1.5 mb-1">
            <h3 className="font-bold text-xs text-slate-900 truncate">
              {template.name}
            </h3>
            {template.isFeatured && (
              <span className="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                <Sparkles className="h-2.5 w-2.5" />
                <span>Featured</span>
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        {/* Footer: Palette Swatches & Layout Family Pill */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1">
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs shrink-0"
              style={{ backgroundColor: palette.primary }}
              title="Primary"
            />
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs shrink-0"
              style={{ backgroundColor: palette.accent }}
              title="Accent"
            />
            <span
              className="h-3 w-3 rounded-full border border-black/10 shadow-2xs shrink-0"
              style={{ backgroundColor: palette.cardBg }}
              title="Surface"
            />
          </div>

          <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-bold border border-slate-200">
            {family.replace('-', ' ')}
          </span>
        </div>
      </div>
    </div>
  );
}
