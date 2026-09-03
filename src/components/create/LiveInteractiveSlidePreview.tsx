'use client';

import React from 'react';
import { VisualStyle, ColorTheme, VisualIntensity, ContentDensity } from '@/types/presentation';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Network, BarChart3, CheckCircle2 } from 'lucide-react';

interface LiveInteractiveSlidePreviewProps {
  style: VisualStyle;
  colorTheme: ColorTheme;
  visualIntensity: VisualIntensity;
  density: ContentDensity;
}

export function LiveInteractiveSlidePreview({
  style,
  colorTheme,
  visualIntensity,
  density,
}: LiveInteractiveSlidePreviewProps) {
  // Theme color definitions
  const themeColors = {
    classic_blue: {
      accent: 'bg-blue-600',
      textAccent: 'text-blue-600',
      badgeBg: 'bg-blue-50 text-blue-700 border-blue-200',
      borderAccent: 'border-blue-600',
      cardBg: 'bg-blue-50/50',
    },
    midnight: {
      accent: 'bg-slate-900',
      textAccent: 'text-slate-900',
      badgeBg: 'bg-slate-100 text-slate-800 border-slate-300',
      borderAccent: 'border-slate-800',
      cardBg: 'bg-slate-100/70',
    },
    emerald: {
      accent: 'bg-emerald-600',
      textAccent: 'text-emerald-600',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      borderAccent: 'border-emerald-600',
      cardBg: 'bg-emerald-50/50',
    },
    warm_minimal: {
      accent: 'bg-amber-600',
      textAccent: 'text-amber-700',
      badgeBg: 'bg-amber-50 text-amber-800 border-amber-200',
      borderAccent: 'border-amber-600',
      cardBg: 'bg-amber-50/50',
    },
    monochrome: {
      accent: 'bg-zinc-800',
      textAccent: 'text-zinc-800',
      badgeBg: 'bg-zinc-100 text-zinc-800 border-zinc-300',
      borderAccent: 'border-zinc-800',
      cardBg: 'bg-zinc-50',
    },
  }[colorTheme];

  // Dynamic canvas styling based on style
  const getCanvasStyle = () => {
    switch (style) {
      case 'professional':
        return 'bg-slate-950 text-white border-slate-800 shadow-2xl';
      case 'creative':
        return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border-indigo-800 shadow-2xl';
      case 'modern':
        return 'bg-white text-slate-900 border-indigo-200 shadow-xl';
      case 'minimal':
      default:
        return 'bg-white text-slate-900 border-slate-200 shadow-sm';
    }
  };

  const isDark = style === 'professional' || style === 'creative';

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-600" />
          <h4 className="text-sm font-bold text-slate-900">Live Appearance Preview</h4>
        </div>
        <div className="text-[11px] font-mono text-slate-400 capitalize">
          {style} • {colorTheme.replace('_', ' ')} • {visualIntensity.replace('_', ' ')}
        </div>
      </div>

      {/* 16:9 Dynamic Live Preview Canvas */}
      <div
        className={`w-full aspect-[16/9] rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 select-none overflow-hidden ${getCanvasStyle()}`}
      >
        {/* Slide Top Bar */}
        <div className="flex items-center justify-between border-b pb-3 border-current/15">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                isDark ? 'bg-indigo-400' : themeColors.accent
              }`}
            />
            <span className="text-[10px] font-mono uppercase tracking-wider font-semibold opacity-70">
              Final Year Viva Defense • Phase II
            </span>
          </div>
          <span className="text-[10px] font-mono opacity-50">SLIDE 04 OF 10</span>
        </div>

        {/* Dynamic Title & Subtitle */}
        <div className="my-auto py-2 space-y-3">
          <div className="space-y-1">
            <h3
              className={`text-xl sm:text-2xl font-extrabold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}
            >
              Smart Attendance System
            </h3>
            <p className={`text-xs ${isDark ? 'text-slate-300' : 'text-slate-500'}`}>
              AI-Powered Attendance Management using Jetson Edge Inference
            </p>
          </div>

          {/* Conditional Visual Intensity Elements */}
          {visualIntensity === 'minimal' && (
            <div className="space-y-2 pt-1 text-xs">
              <div
                className={`p-2.5 rounded-lg border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                Zero-touch ambient recognition via 128-dimensional FaceNet embeddings.
              </div>
            </div>
          )}

          {visualIntensity === 'balanced' && (
            <div className="grid grid-cols-3 gap-2 text-[10px] font-mono pt-1">
              <div
                className={`p-2 rounded-lg border text-center ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="opacity-60 block text-[8px]">INPUT</span>
                <span className="font-bold">Sony IMX477</span>
              </div>
              <div
                className={`p-2 rounded-lg border text-center font-bold ${
                  isDark
                    ? 'bg-indigo-600/40 border-indigo-400 text-white'
                    : `${themeColors.cardBg} ${themeColors.borderAccent} ${themeColors.textAccent}`
                }`}
              >
                <span className="opacity-80 block text-[8px]">PROCESSING</span>
                <span>Jetson Nano</span>
              </div>
              <div
                className={`p-2 rounded-lg border text-center ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <span className="opacity-60 block text-[8px]">ACCURACY</span>
                <span className="font-bold">99.4% Acc</span>
              </div>
            </div>
          )}

          {visualIntensity === 'visual_rich' && (
            <div className="space-y-2 pt-1">
              <div className="grid grid-cols-4 gap-2 text-[9px] font-mono text-center">
                <div
                  className={`p-1.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  Camera 4K
                </div>
                <div
                  className={`p-1.5 rounded border font-bold ${
                    isDark ? 'bg-indigo-600 text-white' : themeColors.accent + ' text-white'
                  }`}
                >
                  MTCNN 38ms
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  FaceNet 64ms
                </div>
                <div
                  className={`p-1.5 rounded border ${
                    isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  FAISS Index
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] font-mono opacity-70">
                <span>Latency: 142ms</span>
                <span>False Positives: &lt;0.01%</span>
              </div>
            </div>
          )}

          {/* Density indicators */}
          {density === 'detailed' && (
            <p className={`text-[10px] leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Quantized TensorRT FP16 execution maintains sub-millisecond similarity queries over 500
              student profiles.
            </p>
          )}
        </div>

        {/* Slide Bottom Bar */}
        <div className="border-t pt-2 border-current/15 flex items-center justify-between text-[10px] font-mono opacity-60">
          <span>Density: {density}</span>
          <span>Theme: {colorTheme.replace('_', ' ')}</span>
        </div>
      </div>
    </div>
  );
}
