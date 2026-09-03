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
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">{title}</h3>
        {description && <p className="text-xs text-slate-500 mt-0.5">{description}</p>}
      </div>

      <div className={cn('grid gap-3.5', colClasses[gridCols])}>
        {options.map(opt => {
          const isSelected = selectedValue === opt.value;
          const Icon = opt.icon;

          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'relative text-left p-4 rounded-2xl border transition-all duration-200 flex flex-col justify-between cursor-pointer select-none group',
                isSelected
                  ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/50 to-purple-50/30 shadow-sm ring-2 ring-indigo-500/20'
                  : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  {Icon && (
                    <div
                      className={cn(
                        'p-2 rounded-xl border transition-all',
                        isSelected
                          ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                          : 'bg-slate-50 border-slate-200/80 text-slate-600 group-hover:text-slate-900'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </div>
                  )}
                  <span
                    className={cn(
                      'text-xs font-bold tracking-tight',
                      isSelected ? 'text-indigo-950' : 'text-slate-800'
                    )}
                  >
                    {opt.label}
                  </span>
                </div>

                {isSelected ? (
                  <div className="h-5 w-5 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                    <Check className="h-3 w-3" />
                  </div>
                ) : (
                  <div className="h-5 w-5 rounded-full border border-slate-300 group-hover:border-indigo-300 shrink-0" />
                )}
              </div>

              {opt.description && (
                <p
                  className={cn(
                    'text-[11px] leading-relaxed',
                    isSelected ? 'text-slate-600' : 'text-slate-500'
                  )}
                >
                  {opt.description}
                </p>
              )}

              {opt.badge && (
                <span className="mt-2.5 inline-block self-start text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200/60">
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
