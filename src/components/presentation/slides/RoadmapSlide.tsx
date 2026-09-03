"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function RoadmapSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    milestones?: { phase: string; title: string; desc: string }[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-8 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 relative flex items-center">
        <div className="absolute left-8 top-4 bottom-4 w-1 rounded" style={{ backgroundColor: template.palette.border }}></div>
        
        <div className="flex flex-col gap-8 w-full z-10 pl-4">
            {content.milestones?.slice(0, 4).map((m, idx) => (
                <div key={idx} className="flex items-start gap-6 relative">
                    <div className="w-8 h-8 rounded-full border-4 flex-shrink-0 mt-1" style={{ backgroundColor: template.palette.background, borderColor: template.palette.accent }}></div>
                    <div className="flex-1 p-5 rounded-xl border shadow-sm" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                        <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: template.palette.accent }}>{m.phase}</div>
                        <h3 className="text-xl font-bold mb-2" style={{ color: template.palette.primary }}>{m.title}</h3>
                        <p className="text-sm" style={{ color: template.palette.text }}>{m.desc}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
}
