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
      name: 'Minimal',
      description: 'Monochrome precision, crisp typography, generous whitespace.',
      bestFor: 'Academic papers & research theses',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-lg bg-white border border-slate-200 p-3 flex flex-col justify-between text-left">
          <div className="space-y-1">
            <div className="h-1.5 w-12 bg-slate-400 rounded" />
            <div className="text-[11px] font-bold text-slate-900 tracking-tight">
              Smart Attendance System
            </div>
            <div className="text-[8px] text-slate-500">Autonomous Edge FaceNet</div>
          </div>
          <div className="space-y-1 pt-2 border-t border-slate-100">
            <div className="h-1 w-full bg-slate-200 rounded" />
            <div className="h-1 w-3/4 bg-slate-200 rounded" />
          </div>
        </div>
      ),
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Structured layout, elegant navy tones, academic and corporate rigor.',
      bestFor: 'Project viva & committee defense',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-lg bg-slate-900 text-white p-3 flex flex-col justify-between text-left">
          <div className="space-y-1">
            <div className="h-1.5 w-10 bg-indigo-400 rounded" />
            <div className="text-[11px] font-bold text-white tracking-tight">
              Smart Attendance System
            </div>
            <div className="text-[8px] text-slate-300">Final Year Viva Defense</div>
          </div>
          <div className="grid grid-cols-2 gap-1 pt-1">
            <div className="p-1 rounded bg-slate-800 border border-slate-700 text-[7px] text-slate-300">
              Jetson Nano
            </div>
            <div className="p-1 rounded bg-slate-800 border border-slate-700 text-[7px] text-slate-300">
              99.4% Acc
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary geometry, subtle indigo accents, strong visual hierarchy.',
      bestFor: 'Seminars & technical presentations',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-lg bg-indigo-50/60 border border-indigo-200 p-3 flex flex-col justify-between text-left">
          <div className="space-y-1">
            <span className="text-[7px] font-mono px-1 py-0.5 rounded bg-indigo-100 text-indigo-700 font-bold">
              EDGE AI
            </span>
            <div className="text-[11px] font-bold text-indigo-950 tracking-tight">
              Smart Attendance System
            </div>
          </div>
          <div className="flex items-center gap-1 text-[7px] font-mono">
            <span className="p-1 rounded bg-white border border-indigo-200 text-indigo-700">
              Pipeline
            </span>
            <span className="text-indigo-400">→</span>
            <span className="p-1 rounded bg-indigo-600 text-white font-bold">142ms</span>
          </div>
        </div>
      ),
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Dynamic visual balance, high contrast callouts, narrative storytelling.',
      bestFor: 'Project exhibitions & hackathons',
      previewComponent: (
        <div className="w-full aspect-[16/10] rounded-lg bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-3 flex flex-col justify-between text-left">
          <div className="space-y-0.5">
            <span className="text-[7px] font-mono text-emerald-400 uppercase font-bold">
              01 • Overview
            </span>
            <div className="text-[11px] font-black text-white leading-tight">
              Smart Attendance System
            </div>
          </div>
          <div className="flex items-baseline justify-between pt-1 border-t border-indigo-800/60 text-[7px]">
            <span className="text-indigo-300">Edge Inference</span>
            <span className="text-emerald-400 font-mono font-bold">99.4%</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-bold text-slate-900">Presentation Appearance Style</h4>
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
              className={`rounded-2xl p-3.5 border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between relative group ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/20 shadow-md ring-2 ring-indigo-100'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {/* Selected Checkmark Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs z-10">
                  <Check className="h-3 w-3" />
                </div>
              )}

              {/* Mini Slide Preview Canvas */}
              <div className="mb-3">{st.previewComponent}</div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold ${
                      isSelected ? 'text-indigo-950' : 'text-slate-900'
                    }`}
                  >
                    {st.name}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">{st.description}</p>
                <div className="pt-2 border-t border-slate-100 text-[10px] text-indigo-700 font-medium">
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
