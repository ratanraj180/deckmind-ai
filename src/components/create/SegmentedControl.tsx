'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SegmentItem<T extends string> {
  value: T;
  label: string;
  sublabel: string;
}

interface SegmentedControlProps<T extends string> {
  title: string;
  description?: string;
  options: SegmentItem<T>[];
  value: T;
  onChange: (val: T) => void;
}

export function SegmentedControl<T extends string>({
  title,
  description,
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <h4 className="text-xs font-bold text-slate-900">{title}</h4>
        {description && <span className="text-[11px] text-slate-500">{description}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 rounded-xl bg-slate-100 border border-slate-200">
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                'px-3 py-2 rounded-lg text-left transition-all duration-150 cursor-pointer select-none',
                isSelected
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50/50'
              )}
            >
              <div className="text-xs font-bold">{opt.label}</div>
              <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{opt.sublabel}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
