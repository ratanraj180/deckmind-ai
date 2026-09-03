'use client';

import React from 'react';
import { ColorTheme } from '@/types/presentation';
import { Check } from 'lucide-react';

interface ColorThemeSelectorProps {
  selectedTheme: ColorTheme;
  onSelect: (theme: ColorTheme) => void;
}

export function ColorThemeSelector({ selectedTheme, onSelect }: ColorThemeSelectorProps) {
  const themes: {
    id: ColorTheme;
    label: string;
    colors: [string, string, string]; // [primary, background/card, accent]
    mood: string;
  }[] = [
    {
      id: 'classic_blue',
      label: 'Classic Blue',
      colors: ['#2563EB', '#1E3A8A', '#EFF6FF'],
      mood: 'Trusted & Academic',
    },
    {
      id: 'midnight',
      label: 'Midnight',
      colors: ['#0F172A', '#334155', '#F8FAFC'],
      mood: 'Deep & Authoritative',
    },
    {
      id: 'emerald',
      label: 'Emerald',
      colors: ['#059669', '#064E3B', '#ECFDF5'],
      mood: 'Clean & Analytical',
    },
    {
      id: 'warm_minimal',
      label: 'Warm Minimal',
      colors: ['#D97706', '#78350F', '#FFFBEB'],
      mood: 'Sophisticated & Editorial',
    },
    {
      id: 'monochrome',
      label: 'Monochrome',
      colors: ['#18181B', '#71717A', '#FAFAFA'],
      mood: 'High Contrast Modern',
    },
  ];

  return (
    <div className="space-y-3">
      <div>
        <h4 className="text-sm font-bold text-slate-900">Presentation Color Mood</h4>
        <p className="text-xs text-slate-500 mt-0.5">
          Sets the primary accent and diagram palette across the slide deck.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {themes.map(th => {
          const isSelected = selectedTheme === th.id;

          return (
            <button
              key={th.id}
              type="button"
              onClick={() => onSelect(th.id)}
              className={`rounded-xl p-3 border text-left transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/20 ring-2 ring-indigo-100 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {/* Visual color swatch circles */}
                <div className="flex items-center -space-x-1.5">
                  <div
                    className="h-5 w-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: th.colors[0] }}
                  />
                  <div
                    className="h-5 w-5 rounded-full border border-white shadow-xs"
                    style={{ backgroundColor: th.colors[1] }}
                  />
                  <div
                    className="h-5 w-5 rounded-full border border-slate-200 shadow-xs"
                    style={{ backgroundColor: th.colors[2] }}
                  />
                </div>

                {isSelected && <Check className="h-3.5 w-3.5 text-indigo-600" />}
              </div>

              <div>
                <span className="text-xs font-bold text-slate-900 block">{th.label}</span>
                <span className="text-[10px] text-slate-500">{th.mood}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
