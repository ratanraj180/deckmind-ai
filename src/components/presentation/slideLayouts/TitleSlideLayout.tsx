'use client';

import React from 'react';
import { SlideLayoutProps } from './types';
import {
  Sparkles,
  Zap,
  Terminal,
  Layers,
  BarChart3,
  CheckCircle2,
  User,
  GraduationCap,
  Cpu,
  Bookmark,
  Activity,
} from 'lucide-react';

export function TitleSlideLayout({ slide, template }: SlideLayoutProps) {
  const pal = template.palette;
  const content = (slide.content || {}) as Record<string, any>;

  const author =
    Array.isArray(content.authors) && content.authors.length > 0
      ? content.authors.join(' • ')
      : (content.author || 'Engineering & Research Lead');
  const institution = content.institution || 'Technical Innovation Defense';
  const academicYear = content.academicYear || '2026 Academic Session';
  const guide = content.guide || 'Faculty Advisor & Review Board';
  const tags =
    Array.isArray(content.tags) && content.tags.length > 0
      ? content.tags
      : ['AI Architecture', 'Production Ready', 'Technical Defense'];

  // Identify template archetype
  const layoutFamily = template.layoutFamily || '';
  const layoutStyle = template.layoutStyle || '';
  const family = template.family || '';

  const isBrutalist =
    layoutFamily === 'brutalist' ||
    layoutStyle === 'neo-brutalist' ||
    family === 'neo_brutalist' ||
    family === 'memphis_pop';

  const isCyber =
    layoutFamily === 'cyber' ||
    layoutStyle === 'cyber-tech' ||
    layoutStyle === 'linear-dark' ||
    layoutStyle === 'dark-immersive' ||
    family === 'future_tech' ||
    family === 'linear_dark' ||
    family === 'isometric_tech';

  const isAurora =
    layoutFamily === 'gradient-mesh' ||
    layoutStyle === 'aurora-gradient' ||
    family === 'aurora_gradient' ||
    family === 'glass_aurora' ||
    family === 'gradient_mesh' ||
    family === 'soft_pastel';

  const isBento =
    layoutFamily === 'bento' ||
    layoutStyle === 'bento-grid' ||
    family === 'bento_grid' ||
    family === 'card_stack';

  const isSwiss =
    layoutFamily === 'swiss-grid' ||
    layoutStyle === 'asymmetric-grid' ||
    family === 'swiss_editorial';

  const isAcademic =
    layoutStyle === 'academic-research' ||
    family === 'academic_research' ||
    family === 'google_editorial' ||
    template.category === 'Academic';

  const isMagazine =
    layoutFamily === 'magazine' ||
    layoutFamily === 'split-screen' ||
    layoutStyle === 'bold-magazine' ||
    layoutStyle === 'split-hero' ||
    family === 'bold_magazine' ||
    family === 'split_screen';

  const isBlueprint =
    layoutFamily === 'blueprint' ||
    layoutStyle === 'blueprint' ||
    family === 'engineering_blueprint';

  const isDashboard =
    layoutFamily === 'dashboard' ||
    layoutStyle === 'data-dashboard' ||
    family === 'data_storytelling';

  // ═══════════════════════════════════════════════════════════════════
  // 1. NEO-BRUTALIST & MEMPHIS POP ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isBrutalist) {
    return (
      <div
        className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          backgroundImage: `radial-gradient(#000000 1.5px, transparent 1.5px)`,
          backgroundSize: '20px 20px',
          color: pal.text,
        }}
      >
        {/* Floating Geometric Ornaments */}
        <div className="absolute top-4 right-8 flex items-center gap-3 z-10">
          <div className="px-3 py-1 font-mono text-xs font-black uppercase tracking-wider bg-yellow-300 text-black border-2 border-black shadow-[3px_3px_0px_#000] rotate-2">
            ★ 100% PRODUCTION READY ★
          </div>
          <div className="px-3 py-1 font-mono text-xs font-black uppercase tracking-wider bg-pink-400 text-white border-2 border-black shadow-[3px_3px_0px_#000] -rotate-3">
            {template.name}
          </div>
        </div>

        {/* Top Identification Stripe */}
        <div className="flex items-center gap-2 z-10 pt-2">
          <span className="px-3 py-1 bg-black text-white font-mono text-xs font-extrabold uppercase tracking-widest border-2 border-black">
            SLIDE 01 // CAPSTONE
          </span>
          <span className="px-3 py-1 bg-white text-black font-mono text-xs font-extrabold uppercase border-2 border-black">
            {institution}
          </span>
        </div>

        {/* Central Hero Block with Hard Drop Shadow */}
        <div
          className="my-auto p-6 sm:p-8 bg-white border-4 border-black shadow-[10px_10px_0px_#000] rounded-2xl relative z-10 max-w-4xl"
          style={{ backgroundColor: pal.cardBg }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500 border border-black" />
            <span className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
            <span className="w-3 h-3 rounded-full bg-green-500 border border-black" />
            <span className="text-[11px] font-mono font-bold uppercase text-slate-500 ml-2">
              PROJECT SPECIFICATION // ID #{String(slide.id ?? '2026').slice(0, 6)}
            </span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase"
            style={{ color: '#000000' }}
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-base sm:text-xl font-bold mt-4 border-l-4 border-black pl-3 text-slate-800">
              {slide.subtitle}
            </p>
          )}

          {/* Tags Chips */}
          <div className="flex flex-wrap gap-2 pt-4">
            {tags.slice(0, 4).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-mono font-black border-2 border-black shadow-[2px_2px_0px_#000]"
                style={{
                  backgroundColor: idx % 2 === 0 ? '#FEF08A' : '#BAE6FD',
                  color: '#000000',
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Brutalist Footer Bar */}
        <div className="flex flex-wrap items-center justify-between p-3 bg-black text-white border-2 border-black font-mono text-xs font-bold z-10">
          <div className="flex items-center gap-3">
            <span className="text-yellow-300">AUTHOR:</span>
            <span>{author}</span>
            <span className="opacity-40">|</span>
            <span className="text-cyan-300">GUIDE:</span>
            <span>{guide}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <span>{academicYear}</span>
            <span className="text-emerald-400">● VERIFIED</span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 2. CYBER TECH & LINEAR DARK ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isCyber) {
    return (
      <div
        className="h-full w-full p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          backgroundImage: `linear-gradient(to right, ${pal.accent}12 1px, transparent 1px), linear-gradient(to bottom, ${pal.accent}12 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          color: pal.text,
        }}
      >
        {/* Top Glowing Laser Strip */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]" />

        {/* Reticle Corner Brackets */}
        <div className="absolute top-5 left-5 font-mono text-xs font-bold opacity-40" style={{ color: pal.accent }}>
          ┌ [SYS_CORE_NODE]
        </div>
        <div className="absolute top-5 right-5 font-mono text-xs font-bold opacity-40" style={{ color: pal.accent }}>
          [HEX: 0x7E2] ┐
        </div>
        <div className="absolute bottom-5 left-5 font-mono text-xs font-bold opacity-40" style={{ color: pal.accent }}>
          └ [TELEMETRY_ON]
        </div>
        <div className="absolute bottom-5 right-5 font-mono text-xs font-bold opacity-40" style={{ color: pal.accent }}>
          [PORT_8080] ┘
        </div>

        {/* Top Status HUD Ribbon */}
        <div className="flex items-center justify-between z-10 pt-2 px-2">
          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] font-bold tracking-wider uppercase border"
              style={{
                backgroundColor: pal.accent + '15',
                borderColor: pal.accent + '50',
                color: pal.accent,
                boxShadow: `0 0 15px ${pal.accent}30`,
              }}
            >
              <Terminal className="h-3 w-3 animate-pulse" />
              <span>LIVE SYSTEM // {institution.toUpperCase()}</span>
            </span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
            <span className="text-emerald-400 font-bold">● ONLINE</span>
            <span>•</span>
            <span>SEC_LVL: PROD</span>
          </div>
        </div>

        {/* Hero Title Section with Glowing Neon Spine */}
        <div className="my-auto py-6 z-10 max-w-4xl relative">
          <div
            className="absolute -left-6 inset-y-0 w-1.5 rounded-full"
            style={{
              backgroundColor: pal.accent,
              boxShadow: `0 0 25px ${pal.accent}`,
            }}
          />

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
              <Cpu className="h-3.5 w-3.5" />
              <span>TECHNICAL DEFENSE & ARCHITECTURE SPECIFICATION</span>
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase font-mono"
              style={{
                color: pal.primary,
                textShadow: `0 0 25px ${pal.accent}40`,
              }}
            >
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p
                className="text-sm sm:text-lg opacity-90 max-w-3xl leading-relaxed font-mono"
                style={{ color: pal.secondary }}
              >
                {slide.subtitle}
              </p>
            )}

            {/* Glowing Tech Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              {tags.slice(0, 4).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 font-mono text-xs font-bold rounded-lg border flex items-center gap-1.5"
                  style={{
                    backgroundColor: pal.cardBg,
                    borderColor: pal.border,
                    color: pal.accent,
                    boxShadow: `0 0 10px ${pal.accent}15`,
                  }}
                >
                  <span className="text-cyan-400 font-bold">#</span>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Cyber HUD Metadata Bar */}
        <div
          className="p-3.5 rounded-xl border font-mono text-xs flex flex-wrap items-center justify-between gap-2 z-10"
          style={{
            backgroundColor: pal.cardBg + 'cc',
            borderColor: pal.border,
          }}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="h-3.5 w-3.5 text-cyan-400" />
              <span className="font-bold">{author}</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="text-slate-400">
              GUIDE: <span className="text-slate-200">{guide}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-violet-400 font-bold">{template.name}</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400">{academicYear}</span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 3. AURORA GRADIENT & GRADIENT MESH ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isAurora) {
    return (
      <div
        className="h-full w-full p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          backgroundImage: `radial-gradient(circle at 10% 20%, ${pal.accent}45 0%, transparent 45%), radial-gradient(circle at 90% 80%, ${pal.primary}45 0%, transparent 45%), radial-gradient(circle at 50% 50%, #ec489925 0%, transparent 55%)`,
          color: pal.text,
        }}
      >
        {/* Ambient Blurred Colored Glow Spheres */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-60"
          style={{ backgroundColor: pal.accent }}
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-50"
          style={{ backgroundColor: pal.primary }}
        />

        {/* Top Aurora Pill */}
        <div className="flex items-center justify-between z-10 pt-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md bg-white/20 border border-white/40 text-xs font-bold shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span className="tracking-wider uppercase">{institution}</span>
          </div>
          <span className="text-xs font-mono font-bold tracking-widest px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
            {template.name}
          </span>
        </div>

        {/* Central Frosted Glass Hero Card */}
        <div
          className="my-auto p-8 sm:p-12 rounded-3xl backdrop-blur-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-10 max-w-4xl space-y-4 transition-all"
          style={{
            backgroundColor: pal.isDark ? 'rgba(15, 23, 42, 0.65)' : 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-violet-500/20 to-pink-500/20 border border-violet-400/30 text-violet-600 dark:text-violet-300">
            <Zap className="h-3.5 w-3.5 text-violet-500" />
            <span>DISSERTATION & SYSTEM OVERVIEW</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight bg-gradient-to-r from-violet-600 via-indigo-600 to-pink-500 bg-clip-text text-transparent">
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-base sm:text-xl font-medium opacity-90 max-w-2xl leading-relaxed">
              {slide.subtitle}
            </p>
          )}

          {/* Tags in Frosted Pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.slice(0, 4).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 shadow-xs"
                style={{ color: pal.primary }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Aurora Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between pt-3 text-xs font-semibold z-10 border-t border-white/20">
          <div className="flex items-center gap-3">
            <span className="font-bold">{author}</span>
            <span className="opacity-40">•</span>
            <span className="opacity-75">{guide}</span>
          </div>
          <div className="opacity-80 font-mono text-[11px]">{academicYear}</div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 4. BENTO GRID HERO ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isBento) {
    return (
      <div
        className="h-full w-full p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          backgroundImage: `linear-gradient(to right, ${pal.border}40 1px, transparent 1px), linear-gradient(to bottom, ${pal.border}40 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          color: pal.text,
        }}
      >
        {/* Top Bento Header */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" />
              <span>BENTO PRESENTATION MATRIX</span>
            </span>
          </div>
          <span className="text-xs font-mono font-bold opacity-60">
            {institution.toUpperCase()}
          </span>
        </div>

        {/* Multi-Card Bento Hero Grid */}
        <div className="my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 py-3">
          {/* Tile 1: Massive Hero Tile (Left 8 Cols) */}
          <div
            className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border flex flex-col justify-between shadow-lg relative overflow-hidden"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.border,
            }}
          >
            <div
              className="absolute top-0 inset-x-0 h-1.5"
              style={{ backgroundColor: pal.accent }}
            />

            <div className="space-y-3">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded-full bg-violet-50 text-violet-700 dark:bg-violet-950/50 dark:text-violet-300 border border-violet-200">
                CORE DELIVERABLE
              </span>
              <h1
                className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight"
                style={{ color: pal.primary }}
              >
                {slide.title}
              </h1>
              {slide.subtitle && (
                <p className="text-sm sm:text-base opacity-80 leading-relaxed" style={{ color: pal.secondary }}>
                  {slide.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              {tags.slice(0, 4).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 text-xs font-semibold rounded-xl border"
                  style={{
                    backgroundColor: pal.background,
                    borderColor: pal.border,
                    color: pal.accent,
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column Stack (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            {/* Tile 2: Saturated Colorful Accent Tile */}
            <div
              className="p-5 rounded-3xl text-white flex flex-col justify-between shadow-lg flex-1 relative overflow-hidden"
              style={{
                backgroundColor: pal.accent,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                  STATUS
                </span>
                <CheckCircle2 className="h-5 w-5 text-white/90" />
              </div>

              <div className="space-y-1 my-2">
                <div className="text-2xl font-black">100% READY</div>
                <div className="text-xs text-white/80 font-medium">
                  Verified Technical Capstone Specification
                </div>
              </div>

              <div className="text-[10px] font-mono text-white/70">
                THEME: {template.name.toUpperCase()}
              </div>
            </div>

            {/* Tile 3: Authorship & Institution Tile */}
            <div
              className="p-5 rounded-3xl border shadow-sm flex flex-col justify-between"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
              }}
            >
              <div className="flex items-center gap-2 text-xs font-bold" style={{ color: pal.primary }}>
                <User className="h-4 w-4 text-violet-600" />
                <span>Presenter & Team</span>
              </div>

              <div className="my-2 space-y-0.5">
                <div className="text-sm font-black" style={{ color: pal.text }}>
                  {author}
                </div>
                <div className="text-xs opacity-70">Adviser: {guide}</div>
              </div>

              <div className="text-[10px] font-mono text-slate-400 border-t pt-2" style={{ borderColor: pal.border }}>
                {academicYear}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bento Status Footer */}
        <div className="flex items-center justify-between text-xs opacity-60 font-mono pt-1">
          <span>SLIDE 01 // OVERVIEW MATRIX</span>
          <span>AUTONOMOUS SYSTEM DEFENSE</span>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 5. SWISS EDITORIAL & ZURICH RED ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isSwiss) {
    return (
      <div
        className="h-full w-full p-8 sm:p-14 flex flex-row relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          color: pal.text,
        }}
      >
        {/* Massive Swiss Red / Accent Structural Spine */}
        <div
          className="w-3 sm:w-4 self-stretch rounded-full shrink-0 mr-8 sm:mr-12"
          style={{ backgroundColor: pal.accent }}
        />

        {/* Watermark 01 */}
        <div
          className="absolute right-8 bottom-4 text-8xl sm:text-9xl font-black opacity-10 pointer-events-none select-none font-sans"
          style={{ color: pal.primary }}
        >
          01
        </div>

        {/* Main Swiss Layout Content */}
        <div className="flex-1 flex flex-col justify-between z-10">
          {/* Top Swiss Metadata Rule */}
          <div className="flex items-center justify-between pb-4 border-b-2" style={{ borderColor: pal.primary }}>
            <div className="font-mono text-xs font-black uppercase tracking-widest" style={{ color: pal.accent }}>
              ZURICH SPECIFICATION // {institution.toUpperCase()}
            </div>
            <div className="font-mono text-xs font-bold opacity-60">DOC_REF: DM-2026-CH</div>
          </div>

          {/* Massive Display Title */}
          <div className="my-auto py-6 space-y-4 max-w-4xl">
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-none uppercase"
              style={{ color: pal.primary }}
            >
              {slide.title}
            </h1>

            {slide.subtitle && (
              <p className="text-base sm:text-2xl font-bold max-w-2xl leading-snug pt-2" style={{ color: pal.secondary }}>
                {slide.subtitle}
              </p>
            )}

            {/* Sharp Swiss Tag Blocks */}
            <div className="flex flex-wrap gap-2 pt-4">
              {tags.slice(0, 4).map((tag: string, idx: number) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs font-mono font-bold uppercase border"
                  style={{
                    backgroundColor: idx === 0 ? pal.primary : pal.cardBg,
                    color: idx === 0 ? pal.background : pal.text,
                    borderColor: pal.primary,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Swiss Tabular Footer Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t-2 font-mono text-xs" style={{ borderColor: pal.primary }}>
            <div>
              <div className="text-[10px] uppercase font-bold opacity-50">AUTHOR</div>
              <div className="font-bold truncate mt-0.5">{author}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold opacity-50">GUIDE</div>
              <div className="font-bold truncate mt-0.5">{guide}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold opacity-50">YEAR</div>
              <div className="font-bold mt-0.5">{academicYear}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold opacity-50">SPEC</div>
              <div className="font-bold mt-0.5" style={{ color: pal.accent }}>
                {template.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 6. ACADEMIC RESEARCH & CAPSTONE DISSERTATION
  // ═══════════════════════════════════════════════════════════════════
  if (isAcademic) {
    return (
      <div
        className="h-full w-full p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          color: pal.text,
        }}
      >
        {/* Double Border Scholarly Frame */}
        <div
          className="absolute inset-4 sm:inset-6 border-2 pointer-events-none rounded-2xl"
          style={{ borderColor: pal.accent + '60' }}
        />
        <div
          className="absolute inset-6 sm:inset-8 border pointer-events-none rounded-xl"
          style={{ borderColor: pal.border }}
        />

        {/* Academic Heraldry Header Banner */}
        <div className="flex flex-col items-center justify-center text-center z-10 pt-4">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-bold tracking-widest uppercase mb-2"
            style={{
              backgroundColor: pal.cardBg,
              borderColor: pal.accent,
              color: pal.accent,
            }}
          >
            <GraduationCap className="h-4 w-4" />
            <span>DISSERTATION DEFENSE & TECHNICAL PROCEEDING</span>
          </div>
          <div className="text-xs font-serif italic text-slate-500">
            {institution}
          </div>
        </div>

        {/* Central Scholarly Title */}
        <div className="my-auto text-center px-6 sm:px-12 py-4 z-10 max-w-4xl mx-auto space-y-4">
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight leading-tight capitalize"
            style={{ color: pal.primary }}
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p
              className="text-base sm:text-xl font-serif italic max-w-2xl mx-auto leading-relaxed"
              style={{ color: pal.secondary }}
            >
              &ldquo;{slide.subtitle}&rdquo;
            </p>
          )}

          {/* Academic Topic Badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-3">
            {tags.slice(0, 4).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-3 py-1 font-serif text-xs font-medium rounded-full border"
                style={{
                  backgroundColor: pal.cardBg,
                  borderColor: pal.border,
                  color: pal.primary,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Structured Dissertation Credential Blocks */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-4 rounded-xl border text-center z-10 mx-6 mb-2"
          style={{
            backgroundColor: pal.cardBg + 'cc',
            borderColor: pal.border,
          }}
        >
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              CANDIDATE / AUTHOR
            </span>
            <span className="text-xs font-bold block mt-0.5" style={{ color: pal.primary }}>
              {author}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              ADVISOR / GUIDE
            </span>
            <span className="text-xs font-bold block mt-0.5" style={{ color: pal.primary }}>
              {guide}
            </span>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
              SESSION / STATUS
            </span>
            <span className="text-xs font-bold block mt-0.5" style={{ color: pal.accent }}>
              {academicYear} • DEFENSE READY
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 7. BOLD MAGAZINE & SPLIT-HERO ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════
  if (isMagazine) {
    return (
      <div
        className="h-full w-full flex flex-col md:flex-row relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          color: pal.text,
        }}
      >
        {/* Left Half: Full-Bleed Saturated Color Block */}
        <div
          className="w-full md:w-5/12 p-8 sm:p-12 flex flex-col justify-between text-white relative shadow-2xl"
          style={{
            backgroundColor: pal.primary,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-white/20">
              VOL. 26 // ISSUE 01
            </span>
            <Bookmark className="h-5 w-5 text-white/80" />
          </div>

          <div className="my-auto py-6 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300 font-bold block">
              FEATURE STORY
            </span>
            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-tight">
              {slide.title}
            </h1>
            <div className="w-16 h-1.5 rounded-full" style={{ backgroundColor: pal.accent }} />
          </div>

          <div className="text-xs font-mono text-white/70">
            {institution}
          </div>
        </div>

        {/* Right Half: Editorial Metadata Panel */}
        <div className="w-full md:w-7/12 p-8 sm:p-12 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs font-mono opacity-60">
            <span>EXECUTIVE BRIEFING</span>
            <span>{template.name}</span>
          </div>

          <div className="my-auto space-y-5 max-w-xl">
            {slide.subtitle && (
              <p className="text-lg sm:text-2xl font-bold leading-relaxed text-slate-800 dark:text-slate-200">
                {slide.subtitle}
              </p>
            )}

            <div className="p-4 rounded-2xl border space-y-2" style={{ backgroundColor: pal.cardBg, borderColor: pal.border }}>
              <div className="text-xs font-bold uppercase" style={{ color: pal.accent }}>
                KEY DELIVERABLES & METRICS
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-xs font-semibold rounded-lg border bg-white dark:bg-slate-900"
                    style={{ borderColor: pal.border }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t text-xs font-medium" style={{ borderColor: pal.border }}>
            <div>
              <span className="opacity-50">PRESENTED BY: </span>
              <span className="font-bold">{author}</span>
            </div>
            <div className="font-mono text-slate-400">
              {academicYear}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 8. ENGINEERING BLUEPRINT & CAD SCHEMATIC
  // ═══════════════════════════════════════════════════════════════════
  if (isBlueprint) {
    return (
      <div
        className="h-full w-full p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden select-none font-mono"
        style={{
          backgroundColor: pal.background,
          backgroundImage: `radial-gradient(${pal.accent}35 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          color: pal.text,
        }}
      >
        {/* Technical Coordinate Alignment Crosshairs */}
        <div className="absolute top-3 left-3 text-xs opacity-50" style={{ color: pal.accent }}>
          + [GRID: A1]
        </div>
        <div className="absolute top-3 right-3 text-xs opacity-50" style={{ color: pal.accent }}>
          [SCALE: 1:1 METRIC] +
        </div>
        <div className="absolute bottom-3 left-3 text-xs opacity-50" style={{ color: pal.accent }}>
          + [TOLERANCE: ±0.01mm]
        </div>

        {/* Blueprint Top Header Line */}
        <div className="flex items-center justify-between border-b-2 pb-2 z-10" style={{ borderColor: pal.accent }}>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-cyan-500 text-black text-[10px] font-black uppercase">
              CAD SCHEMATIC
            </span>
            <span className="text-xs font-bold" style={{ color: pal.accent }}>
              // DECKMIND_AI // {institution.toUpperCase()}
            </span>
          </div>
          <span className="text-xs opacity-70">DWG NO: DM-2026-TITL-01</span>
        </div>

        {/* Blueprint Central Title Section */}
        <div className="my-auto py-6 z-10 max-w-4xl space-y-4">
          <div className="inline-block px-3 py-1 border text-xs font-bold" style={{ borderColor: pal.accent, color: pal.accent }}>
            SPECIFICATION TITLE BLOCK // REV 2.6
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase"
            style={{ color: pal.primary }}
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-sm sm:text-lg opacity-85 leading-relaxed" style={{ color: pal.secondary }}>
              {slide.subtitle}
            </p>
          )}

          {/* Blueprint Specs Pins */}
          <div className="flex flex-wrap gap-2 pt-2">
            {tags.slice(0, 4).map((tag: string, idx: number) => (
              <span
                key={idx}
                className="px-2.5 py-1 text-xs border bg-cyan-950/20 text-cyan-400"
                style={{ borderColor: pal.accent }}
              >
                &lt;{tag.toUpperCase()}&gt;
              </span>
            ))}
          </div>
        </div>

        {/* Official Engineering Title Block (Bottom Right) */}
        <div
          className="border-2 p-3 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] z-10 rounded-lg"
          style={{
            borderColor: pal.accent,
            backgroundColor: pal.cardBg,
          }}
        >
          <div>
            <span className="opacity-50 block text-[9px]">ENGINEER:</span>
            <span className="font-bold truncate block">{author}</span>
          </div>
          <div>
            <span className="opacity-50 block text-[9px]">CHECKED BY:</span>
            <span className="font-bold truncate block">{guide}</span>
          </div>
          <div>
            <span className="opacity-50 block text-[9px]">RELEASE DATE:</span>
            <span className="font-bold block">{academicYear}</span>
          </div>
          <div>
            <span className="opacity-50 block text-[9px]">STATUS:</span>
            <span className="font-black text-emerald-400 block">APPROVED FOR PROD</span>
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 9. DATA DASHBOARD & METRICS HERO
  // ═══════════════════════════════════════════════════════════════════
  if (isDashboard) {
    return (
      <div
        className="h-full w-full p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden select-none"
        style={{
          backgroundColor: pal.background,
          color: pal.text,
        }}
      >
        {/* Top Analytics Status Ribbon */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 animate-pulse text-emerald-600" />
              <span>LIVE TELEMETRY // 99.9% ACCURACY</span>
            </span>
          </div>
          <span className="text-xs font-mono opacity-60">
            {institution}
          </span>
        </div>

        {/* Main Dashboard Hero */}
        <div className="my-auto py-4 z-10 max-w-4xl space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase" style={{ color: pal.accent }}>
            <BarChart3 className="h-4 w-4" />
            <span>EXECUTIVE BRIEFING & DATA METRICS</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase"
            style={{ color: pal.primary }}
          >
            {slide.title}
          </h1>

          {slide.subtitle && (
            <p className="text-base sm:text-xl opacity-80 leading-relaxed" style={{ color: pal.secondary }}>
              {slide.subtitle}
            </p>
          )}

          {/* 3 Metric Cards Strip */}
          <div className="grid grid-cols-3 gap-3 pt-2 max-w-2xl">
            <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: pal.cardBg, borderColor: pal.border }}>
              <div className="text-2xl font-black text-indigo-600">100%</div>
              <div className="text-[11px] font-medium opacity-70">Defense Ready</div>
            </div>
            <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: pal.cardBg, borderColor: pal.border }}>
              <div className="text-2xl font-black text-emerald-600">12.4x</div>
              <div className="text-[11px] font-medium opacity-70">Velocity Speed</div>
            </div>
            <div className="p-3.5 rounded-2xl border" style={{ backgroundColor: pal.cardBg, borderColor: pal.border }}>
              <div className="text-2xl font-black text-amber-600">0.02s</div>
              <div className="text-[11px] font-medium opacity-70">Response Time</div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-3 border-t text-xs z-10" style={{ borderColor: pal.border }}>
          <div className="flex items-center gap-2">
            <span className="font-bold">{author}</span>
            <span className="opacity-40">•</span>
            <span className="opacity-70">{guide}</span>
          </div>
          <div className="font-mono text-slate-400">
            {academicYear}
          </div>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 10. APPLE MINIMAL & CLEAN CANVAS (DEFAULT)
  // ═══════════════════════════════════════════════════════════════════
  return (
    <div
      className="h-full w-full p-8 sm:p-14 flex flex-col justify-between relative overflow-hidden select-none"
      style={{
        backgroundColor: pal.background,
        color: pal.text,
      }}
    >
      {/* Cupertino Radiant Spotlight Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, ${pal.accent} 0%, transparent 70%)`,
        }}
      />

      {/* Top Cupertino Pill Badge */}
      <div className="flex items-center justify-between z-10">
        <div
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-xs"
          style={{
            backgroundColor: pal.cardBg,
            borderColor: pal.border,
            color: pal.accent,
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pal.accent }} />
          <span className="tracking-wider uppercase font-mono text-[11px]">
            {institution}
          </span>
        </div>
        <span className="text-xs font-mono font-semibold opacity-40">
          KEYNOTE 01
        </span>
      </div>

      {/* Main Apple Studio Title Hero */}
      <div className="my-auto py-6 z-10 max-w-4xl space-y-4">
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08]"
          style={{ color: pal.primary }}
        >
          {slide.title}
        </h1>

        {slide.subtitle && (
          <p
            className="text-base sm:text-2xl font-normal opacity-75 max-w-3xl leading-relaxed pt-1"
            style={{ color: pal.secondary }}
          >
            {slide.subtitle}
          </p>
        )}

        {/* Minimal Pill Badges */}
        <div className="flex flex-wrap items-center gap-2 pt-3">
          {tags.slice(0, 4).map((tag: string, idx: number) => (
            <span
              key={idx}
              className="px-3.5 py-1 text-xs font-semibold rounded-full border shadow-2xs"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
                color: pal.text,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Pristine Minimal Footer Bar */}
      <div
        className="flex items-center justify-between pt-4 border-t text-xs font-medium z-10"
        style={{ borderColor: pal.border }}
      >
        <div className="flex items-center gap-3">
          <span className="font-bold" style={{ color: pal.primary }}>
            {author}
          </span>
          <span className="opacity-30">•</span>
          <span className="opacity-60">{guide}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold" style={{ color: pal.accent }}>
            {template.name}
          </span>
          <span className="opacity-30">•</span>
          <span className="opacity-50 text-[11px] font-mono">{academicYear}</span>
        </div>
      </div>
    </div>
  );
}

