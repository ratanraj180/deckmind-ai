"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function VivaDefenseSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    qaList?: { q: string; a: string; badge: string }[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-6 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
        {content.qaList?.slice(0, 3).map((qa, idx) => (
          <div key={idx} className="rounded-xl border p-5 flex flex-col gap-3" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
            <div className="flex justify-between items-start gap-4">
                <h3 className="font-bold text-lg leading-tight" style={{ color: template.palette.primary }}>
                    <span className="mr-2" style={{ color: template.palette.accent }}>Q:</span>
                    {qa.q}
                </h3>
                {qa.badge && (
                    <span className="text-xs px-2 py-1 rounded font-bold whitespace-nowrap border" style={{ backgroundColor: template.palette.background, color: template.palette.accent, borderColor: template.palette.accent }}>
                        {qa.badge}
                    </span>
                )}
            </div>
            <div className="pl-6 border-l-2 py-1 text-sm leading-relaxed" style={{ borderColor: template.palette.border, color: template.palette.text }}>
                <span className="font-bold mr-2" style={{ color: template.palette.secondary }}>A:</span>
                {qa.a}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
