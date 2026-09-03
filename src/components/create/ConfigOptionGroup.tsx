'use client';

import React from 'react';
import { LucideIcon, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface OptionItem<T extends string> {
  value: T;
  label: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
}

interface ConfigOptionGroupProps<T extends string> {
  title: string;
  description?: string;
  options: OptionItem<T>[];
  selectedValue: T;
  onChange: (value: T) => void;
  gridCols?: '2' | '3' | '4' | '5';
}

export function ConfigOptionGroup<T extends string>({
  title,
  description,
  options,
  selectedValue,
  onChange,
  gridCols = '3',
}: ConfigOptionGroupProps<T>) {
  const colClasses = {
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-2 sm:grid-cols-4',
    '5': 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5',
  };

  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 tracking-tight">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className={cn('grid gap-3', colClasses[gridCols])}>
        {options.map(opt => {
          const isSelected = selectedValue === opt.value;
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'relative text-left p-3.5 rounded-xl border transition-all duration-150 flex flex-col justify-between cursor-pointer select-none group',
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/30 shadow-xs ring-1 ring-indigo-600'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  {Icon && (
                    <Icon
                      className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        isSelected
                          ? 'text-indigo-600'
                          : 'text-slate-500 group-hover:text-slate-800'
                      )}
                    />
                  )}
                  <span
                    className={cn(
                      'text-xs font-semibold tracking-tight',
                      isSelected ? 'text-indigo-950' : 'text-slate-800'
                    )}
                  >
                    {opt.label}
                  </span>
                </div>

                {isSelected ? (
                  <div className="h-4 w-4 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                    <Check className="h-2.5 w-2.5" />
                  </div>
                ) : (
                  <div className="h-4 w-4 rounded-full border border-slate-300 group-hover:border-slate-400 shrink-0" />
                )}
              </div>

              {opt.description && (
                <p
                  className={cn(
                    'text-[11px] leading-relaxed',
                    isSelected ? 'text-indigo-900/80' : 'text-slate-500'
                  )}
                >
                  {opt.description}
                </p>
              )}

              {opt.badge && (
                <span className="mt-2 inline-block self-start text-[9px] font-mono font-medium px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  {opt.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
