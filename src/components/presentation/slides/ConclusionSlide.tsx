"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ConclusionSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    takeaways?: string[];
    thankYou?: string;
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col items-center justify-center text-center" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <h2 className="text-4xl font-extrabold mb-4" style={{ color: template.palette.primary }}>{slide.title}</h2>
      {slide.subtitle && <p className="text-xl mb-12" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}

      {content.takeaways && content.takeaways.length > 0 && (
          <div className="flex flex-col gap-4 max-w-2xl text-left w-full mb-12">
              {content.takeaways.slice(0, 4).map((t, i) => (
                  <div key={i} className="flex gap-4 items-center p-4 rounded-xl border" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold" style={{ backgroundColor: template.palette.accent, color: template.palette.background }}>
                          ✓
                      </div>
                      <span className="text-lg font-medium" style={{ color: template.palette.text }}>{t}</span>
                  </div>
              ))}
          </div>
      )}

      {content.thankYou && (
          <div className="mt-auto pt-8 border-t w-full max-w-md" style={{ borderColor: template.palette.border }}>
              <div className="text-2xl font-bold uppercase tracking-wider" style={{ color: template.palette.accent }}>
                  {content.thankYou}
              </div>
          </div>
      )}
    </div>
  );
}
