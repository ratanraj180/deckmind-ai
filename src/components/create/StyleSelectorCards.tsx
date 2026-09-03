'use client';

import React from 'react';
import { VisualStyle } from '@/types/presentation';
import { Check, Sparkles } from 'lucide-react';

interface StyleSelectorCardsProps {
  selectedStyle: VisualStyle;
  onSelect: (style: VisualStyle) => void;
}

export function StyleSelectorCards({ selectedStyle, onSelect }: StyleSelectorCardsProps) {
  const styles: {
    id: VisualStyle;
    name: string;
    description: string;
    bestFor: string;
    previewComponent: React.ReactNode;
  }[] = [
    {
      id: 'minimal',
      name: 'Minimal Canvas',
      description: 'Monochrome precision, crisp typography, generous whitespace.',
      bestFor: 'Academic papers & research theses',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-xl bg-white border border-slate-200/90 p-3 flex flex-col justify-between text-left shadow-2xs">
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-slate-400 rounded-full" />
            <div className="text-[11px] font-bold text-slate-900 tracking-tight">
              Smart Attendance System
            </div>
            <div className="text-[8px] text-slate-500 font-mono">Autonomous Edge FaceNet</div>
          </div>
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="h-1 w-full bg-slate-200 rounded-full" />
            <div className="h-1 w-3/4 bg-slate-200 rounded-full" />
          </div>
        </div>
      ),
    },
    {
      id: 'professional',
      name: 'Professional Rigor',
      description: 'Structured layout, elegant navy tones, academic and corporate rigor.',
      bestFor: 'Project viva & committee defense',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-xl bg-slate-950 text-white p-3 flex flex-col justify-between text-left shadow-2xs">
          <div className="space-y-1">
            <div className="h-1.5 w-10 bg-indigo-400 rounded-full" />
            <div className="text-[11px] font-bold text-white tracking-tight">
              Smart Attendance System
            </div>
            <div className="text-[8px] text-slate-300 font-mono">Final Year Viva Defense</div>
          </div>
          <div className="grid grid-cols-2 gap-1.5 pt-1">
            <div className="p-1 rounded bg-slate-800 border border-slate-700 text-[7px] text-slate-300 font-mono text-center">
              Jetson Nano
            </div>
            <div className="p-1 rounded bg-indigo-600 text-white font-bold text-[7px] font-mono text-center">
              99.4% Acc
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'creative',
      name: 'Creative Studio',
      description: 'Bold accents, dynamic card containers, high visual memorability.',
      bestFor: 'Design portfolios & startup pitches',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-xl bg-gradient-to-br from-indigo-50 via-purple-50 to-cyan-50 border border-indigo-200/80 p-3 flex flex-col justify-between text-left shadow-2xs">
          <div className="space-y-1">
            <div className="flex gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </div>
            <div className="text-[11px] font-black text-indigo-950 tracking-tight leading-tight">
              Smart Attendance System
            </div>
          </div>
          <div className="flex gap-1.5">
            <div className="flex-1 p-1 rounded-md bg-white border border-indigo-100 text-[7px] font-bold text-indigo-700 shadow-2xs text-center">
              Vision AI
            </div>
            <div className="flex-1 p-1 rounded-md bg-white border border-indigo-100 text-[7px] font-bold text-purple-700 shadow-2xs text-center">
              FAISS DB
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Modern Blueprint',
      description: 'Monospaced indices, circuit aesthetics, dark technical blueprints.',
      bestFor: 'System architectures & benchmarks',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-xl bg-[#090d16] text-white p-3 flex flex-col justify-between text-left font-mono border border-cyan-900/50 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[7px] text-cyan-400 font-bold tracking-wider block">
              01 • ARCHITECTURE
            </span>
            <div className="text-[11px] font-black text-white leading-tight">
              Smart Attendance System
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1 border-t border-cyan-950 text-[7px]">
            <span className="text-slate-400">Edge Latency</span>
            <span className="text-emerald-400 font-mono font-bold">142ms</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-bold text-slate-900 tracking-tight">Presentation Appearance Style</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Select the visual layout language for your slides.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {styles.map(st => {
          const isSelected = selectedStyle === st.id;
          return (
            <button
              key={st.id}
              type="button"
              onClick={() => onSelect(st.id)}
              className={`rounded-3xl p-4 border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-indigo-500 bg-gradient-to-b from-indigo-50/40 via-purple-50/20 to-white shadow-md ring-2 ring-indigo-500/20'
                  : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-3 right-3 h-5 w-5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xs z-10">
                  <Check className="h-3 w-3" />
                </div>
              )}

              {/* Mini Slide Preview Canvas */}
              <div className="mb-3.5 w-full">{st.previewComponent}</div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold tracking-tight ${
                      isSelected ? 'text-indigo-950' : 'text-slate-900'
                    }`}
                  >
                    {st.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">{st.description}</p>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-indigo-700 font-semibold font-mono">
                  Best for: {st.bestFor}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
