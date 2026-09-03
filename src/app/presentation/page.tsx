'use client';

import React, { useState, useEffect } from 'react';
import { PresentationHeader } from '@/components/presentation/PresentationHeader';
import { SlideThumbnailList } from '@/components/presentation/SlideThumbnailList';
import { SlideViewer } from '@/components/presentation/SlideViewer';
import { SpeakerNotesPanel } from '@/components/presentation/SpeakerNotesPanel';
import { PresentationControls } from '@/components/presentation/PresentationControls';
import { usePresentation } from '@/context/PresentationContext';

export default function PresentationPreviewPage() {
  const { activeProject, currentSlideIndex, setCurrentSlideIndex, currentSlide, hydrated } =
    usePresentation();
  const [showNotes, setShowNotes] = useState(true);

  const totalSlides = activeProject.slides.length;

  const handlePrev = () => {
    setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex(Math.min(totalSlides - 1, currentSlideIndex + 1));
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  // Show a minimal shell until client-side state is rehydrated.
  // This avoids any hydration mismatch because the server and the
  // client's first render both produce this same static shell.
  if (!hydrated) {
    return (
      <div className="h-screen flex flex-col mesh-canvas overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center">
          <span className="text-sm font-bold text-slate-900">DeckMind AI</span>
        </header>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-sm text-slate-400 animate-pulse">Loading presentation…</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col mesh-canvas overflow-hidden">
      {/* Workspace Header */}
      <PresentationHeader
        showNotes={showNotes}
        onToggleNotes={() => setShowNotes(!showNotes)}
      />

      {/* Main Presentation Stage */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Left: Slide Thumbnails */}
        <SlideThumbnailList
          slides={activeProject.slides}
          currentIndex={currentSlideIndex}
          onSelectSlide={setCurrentSlideIndex}
        />

        {/* Center: Large 16:9 Presentation Canvas */}
        <main className="flex-1 bg-transparent overflow-y-auto flex flex-col justify-between">
          <div className="flex-1 flex items-center justify-center p-4">
            <SlideViewer slide={currentSlide} />
          </div>

          {/* Bottom Slide Controller Bar */}
          <PresentationControls
            currentIndex={currentSlideIndex}
            totalSlides={totalSlides}
            onPrev={handlePrev}
            onNext={handleNext}
            showNotes={showNotes}
            onToggleNotes={() => setShowNotes(!showNotes)}
          />
        </main>

        {/* Right: Viva Speaker Notes Drawer */}
        {showNotes && (
          <SpeakerNotesPanel
            slide={currentSlide}
            onClose={() => setShowNotes(false)}
          />
        )}
      </div>
    </div>
  );
}
