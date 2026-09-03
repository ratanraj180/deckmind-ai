'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCw, Edit3, Sparkles, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePresentation } from '@/context/PresentationContext';
import { DownloadButton } from '@/components/payment/PaymentModal';

interface PresentationHeaderProps {
  onToggleNotes?: () => void;
  showNotes?: boolean;
}

export function PresentationHeader({ onToggleNotes, showNotes }: PresentationHeaderProps) {
  const router = useRouter();
  const { activeProject, hydrated } = usePresentation();
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Start with a static placeholder that matches server render.
  // Once the context has rehydrated from sessionStorage, sync the real title.
  const [title, setTitle] = useState('DeckMind AI');

  useEffect(() => {
    if (hydrated) {
      setTitle(activeProject.title);
    }
  }, [hydrated, activeProject.title]);

  const handleRegenerate = () => router.push('/create');

  const templateName = hydrated ? (activeProject.template?.name ?? 'Default') : 'Default';
  const slideCount = hydrated ? activeProject.slides.length : 0;
  const purpose = hydrated ? activeProject.config.purpose.replace('_', ' ') : 'presentation';
  const duration = hydrated ? activeProject.config.duration : '';

  return (
    <header className="h-16 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40 shadow-2xs">
      {/* Left: Back & Project Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900 rounded-lg">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>

        <div className="h-4 w-px bg-slate-200 shrink-0" />

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {isEditingTitle ? (
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                onBlur={() => setIsEditingTitle(false)}
                onKeyDown={e => e.key === 'Enter' && setIsEditingTitle(false)}
                autoFocus
                className="text-sm font-bold text-slate-900 border border-indigo-400 rounded-lg px-2 py-0.5 outline-none ring-2 ring-indigo-100 shadow-xs"
              />
            ) : (
              <h1
                onClick={() => setIsEditingTitle(true)}
                className="text-sm font-extrabold text-slate-900 truncate max-w-sm sm:max-w-md cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-1.5 tracking-tight"
                title="Click to edit presentation title"
              >
                <span>{title}</span>
                <Edit3 className="h-3 w-3 text-slate-400" />
              </h1>
            )}

            <Badge variant="gradient" className="text-[10px] py-0 shrink-0 hidden md:inline-flex font-mono font-semibold">
              {purpose}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
            <span className="font-semibold text-slate-700">{slideCount} slides</span>
            <span>·</span>
            <span className="text-indigo-600 font-bold bg-violet-50 px-1.5 py-0.2 rounded border border-violet-200/60">{templateName}</span>
            {duration && (
              <>
                <span>·</span>
                <span className="text-slate-500">{duration}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Speaker Notes Toggle */}
        {onToggleNotes && (
          <Button
            variant={showNotes ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleNotes}
            className="text-xs hidden sm:inline-flex font-semibold shadow-xs"
          >
            <Sparkles className="h-3.5 w-3.5 mr-1 text-indigo-400" />
            <span>Viva Notes</span>
          </Button>
        )}

        {/* Regenerate Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleRegenerate}
          className="text-xs text-slate-700 font-semibold"
        >
          <RotateCw className="h-3.5 w-3.5 mr-1" />
          <span className="hidden md:inline">Regenerate</span>
        </Button>

        {/* Download PPTX — Protected by Auth + Payment */}
        <DownloadButton />
      </div>
    </header>
  );
}
