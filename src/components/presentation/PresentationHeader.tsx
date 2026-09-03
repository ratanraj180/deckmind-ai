'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, RotateCw, Edit3, Sparkles } from 'lucide-react';
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
  const { activeProject } = usePresentation();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(activeProject.title);

  const handleRegenerate = () => router.push('/create');

  const templateName = activeProject.template?.name ?? 'Default';

  return (
    <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-40">
      {/* Left: Back & Project Title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link href="/dashboard">
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
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
                className="text-sm font-bold text-slate-900 border border-indigo-300 rounded px-1.5 py-0.5 outline-none ring-2 ring-indigo-100"
              />
            ) : (
              <h1
                onClick={() => setIsEditingTitle(true)}
                className="text-sm font-bold text-slate-900 truncate max-w-sm sm:max-w-md cursor-pointer hover:text-indigo-600 transition-colors flex items-center gap-1.5"
                title="Click to edit presentation title"
              >
                <span>{title}</span>
                <Edit3 className="h-3 w-3 text-slate-400" />
              </h1>
            )}

            <Badge variant="indigo" className="text-[10px] py-0 shrink-0 hidden md:inline-flex">
              {activeProject.config.purpose.replace('_', ' ')}
            </Badge>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <span>{activeProject.slides.length} slides</span>
            <span>·</span>
            <span className="text-indigo-600 font-medium">{templateName}</span>
            <span>·</span>
            <span>{activeProject.config.duration}</span>
          </div>
        </div>
      </div>

      {/* Right Action Buttons */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Speaker Notes Toggle */}
        {onToggleNotes && (
          <Button
            variant={showNotes ? 'primary' : 'outline'}
            size="sm"
            onClick={onToggleNotes}
            className="text-xs hidden sm:inline-flex"
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
          className="text-xs text-slate-700"
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
