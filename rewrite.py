import os

slides_dir = r'e:\deckmind-ai\src\components\presentation\slides'

components = {
    'TitleSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function TitleSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    authors?: string[];
    guide?: string;
    institution?: string;
    academicYear?: string;
    badge?: string;
    tags?: string[];
  };

  const isDarkImmersive = template.layoutStyle === "dark-immersive";
  const isPoster = template.layoutStyle === "poster";
  const isCentered = template.layoutStyle === "centered-editorial" || template.layoutStyle === "minimal-canvas";
  const isAsymmetric = template.layoutStyle === "asymmetric-grid";
  const isBlueprint = template.layoutStyle === "blueprint";
  const isMagazine = template.layoutStyle === "magazine";

  return (
    <div 
      className={`h-full w-full p-8 sm:p-12 flex flex-col justify-between ${isCentered ? "items-center text-center" : ""} ${isMagazine ? "flex-row" : ""}`}
      style={{ backgroundColor: template.palette.background, color: template.palette.text, fontWeight: template.fontMood === "bold_display" ? "bold" : "normal" }}
    >
      <div className={`flex w-full ${isCentered ? "justify-center" : "justify-between"}`}>
        <div style={{ color: template.palette.accent }} className={isBlueprint ? "font-mono" : ""}>
          {content.institution}
        </div>
        {!isCentered && content.badge && (
          <div style={{ backgroundColor: template.palette.cardBg, color: template.palette.text, borderColor: template.palette.border }} className="px-2 py-1 rounded border text-xs font-bold">
            {content.badge}
          </div>
        )}
      </div>

      <div className={`flex flex-col gap-4 ${isAsymmetric ? "border-l-4 pl-4" : ""} ${isMagazine ? "w-1/2 justify-center" : "w-full"}`} style={{ borderColor: template.palette.accent }}>
        <h1 
          className={`font-bold ${isPoster ? "text-6xl uppercase" : "text-4xl lg:text-5xl"} ${isBlueprint ? "font-mono" : ""}`}
          style={{ 
            color: template.palette.primary, 
            textShadow: isDarkImmersive ? `0 0 15px ${template.palette.accent}` : "none" 
          }}
        >
          {slide.title}
        </h1>
        {slide.subtitle && (
            <p className={`text-lg ${isBlueprint ? "font-mono" : ""}`} style={{ color: template.palette.secondary }}>
            {slide.subtitle}
            </p>
        )}

        <div className={`flex flex-wrap gap-2 mt-4 ${isCentered ? "justify-center" : ""}`}>
          {content.tags?.slice(0, 5).map((tag, idx) => (
            <span key={idx} className="px-3 py-1 text-sm rounded font-mono" style={{ backgroundColor: template.palette.cardBg, color: template.palette.accent, border: `1px solid ${template.palette.border}` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      {isMagazine && (
        <div className="w-1/2 h-full rounded-xl ml-8 flex flex-col items-center justify-center p-8" style={{ backgroundColor: template.palette.primary, color: template.palette.background }}>
           <h2 className="text-3xl font-bold text-center">{content.institution}</h2>
           <p className="mt-4">{content.academicYear}</p>
        </div>
      )}

      <div className={`grid grid-cols-2 gap-8 w-full mt-8 pt-4 border-t ${isCentered ? "text-center" : ""}`} style={{ borderColor: template.palette.border }}>
        <div>
          <h3 className="text-xs uppercase font-bold" style={{ color: template.palette.secondary }}>Authors</h3>
          <div className="mt-2 text-sm font-medium" style={{ color: template.palette.text }}>
            {content.authors?.map((a, i) => <div key={i}>{a}</div>)}
          </div>
        </div>
        <div>
          <h3 className="text-xs uppercase font-bold" style={{ color: template.palette.secondary }}>Guide</h3>
          <div className="mt-2 text-sm font-medium" style={{ color: template.palette.text }}>{content.guide}</div>
          <div className="text-xs mt-1" style={{ color: template.palette.accent }}>{content.academicYear}</div>
        </div>
      </div>
    </div>
  );
}
''',
    'ProblemSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ProblemSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    bullets?: string[];
    metrics?: { label: string; value: string; sub: string }[];
    comparison?: { aspect: string; flaw: string; severity: string }[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-6 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
        {content.bullets && content.bullets.length > 0 && (
          <ul className="space-y-3">
            {content.bullets.slice(0, 5).map((bullet, i) => (
              <li key={i} className="flex gap-3 items-start p-3 rounded-lg border" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <span className="font-bold text-xl leading-none" style={{ color: template.palette.accent }}>•</span>
                <span style={{ color: template.palette.text }}>{bullet}</span>
              </li>
            ))}
          </ul>
        )}
        
        {content.metrics && content.metrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {content.metrics.slice(0, 3).map((m, i) => (
              <div key={i} className="p-5 rounded-xl border shadow-sm flex flex-col items-center text-center" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <div className="text-4xl font-black mb-2" style={{ color: template.palette.accent }}>{m.value}</div>
                <div className="font-bold text-sm" style={{ color: template.palette.text }}>{m.label}</div>
                <div className="text-xs mt-1" style={{ color: template.palette.secondary }}>{m.sub}</div>
              </div>
            ))}
          </div>
        )}

        {content.comparison && content.comparison.length > 0 && (!content.bullets || content.bullets.length === 0) && (
          <div className="flex flex-col gap-3">
            {content.comparison.slice(0, 4).map((row, idx) => (
              <div key={idx} className="p-4 rounded border flex justify-between items-center" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                 <div>
                   <div className="font-bold" style={{ color: template.palette.primary }}>{row.aspect}</div>
                   <div className="text-sm mt-1" style={{ color: template.palette.secondary }}>{row.flaw}</div>
                 </div>
                 <div className="px-3 py-1 rounded text-xs font-bold uppercase" style={{ backgroundColor: template.palette.background, color: template.palette.accent, border: `1px solid ${template.palette.border}` }}>
                   {row.severity}
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
''',
    'SolutionSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function SolutionSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    pillars?: { number: string; title: string; desc: string; tag: string }[];
    bullets?: string[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-6 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col gap-6 justify-center">
        {content.pillars && content.pillars.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {content.pillars.slice(0, 3).map((pillar, i) => (
              <div key={i} className="p-6 rounded-xl border flex flex-col h-full" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <div className="text-sm font-bold mb-4 w-8 h-8 flex items-center justify-center rounded-full" style={{ backgroundColor: template.palette.accent, color: template.palette.background }}>
                  {pillar.number || (i + 1).toString()}
                </div>
                <h3 className="text-xl font-bold mb-2" style={{ color: template.palette.primary }}>{pillar.title}</h3>
                <p className="text-sm flex-1 mb-4" style={{ color: template.palette.secondary }}>{pillar.desc}</p>
                {pillar.tag && (
                    <span className="text-xs px-2 py-1 rounded self-start font-medium" style={{ backgroundColor: template.palette.background, color: template.palette.accent, border: `1px solid ${template.palette.accent}` }}>
                    {pillar.tag}
                    </span>
                )}
              </div>
            ))}
          </div>
        ) : content.bullets && content.bullets.length > 0 ? (
          <ul className="space-y-4">
            {content.bullets.slice(0, 5).map((bullet, i) => (
              <li key={i} className="flex gap-4 items-center p-4 rounded-lg border" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: template.palette.accent }} />
                <span className="text-lg font-medium" style={{ color: template.palette.text }}>{bullet}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
''',
    'ArchitectureSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ArchitectureSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    layers?: { name: string; node: string; details: string; type: string }[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-8 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col gap-4 overflow-y-auto items-center justify-center">
        {content.layers?.slice(0, 5).map((layer, idx) => (
          <div key={idx} className="w-full max-w-3xl rounded-xl border p-4 flex items-center justify-between shadow-sm relative" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
            {idx > 0 && (
               <div className="absolute left-1/2 -top-4 w-0.5 h-4 -ml-[1px]" style={{ backgroundColor: template.palette.accent, opacity: 0.5 }}></div>
            )}
            <div className="flex-1">
              <div className="text-sm font-bold uppercase tracking-wider mb-1" style={{ color: template.palette.secondary }}>{layer.name}</div>
              <div className="text-xl font-bold" style={{ color: template.palette.primary }}>{layer.node}</div>
              <div className="text-sm mt-1" style={{ color: template.palette.text }}>{layer.details}</div>
            </div>
            <div className="ml-4 px-3 py-1 rounded-full text-xs font-semibold border" style={{ backgroundColor: template.palette.background, color: template.palette.accent, borderColor: template.palette.accent }}>
              {layer.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
''',
    'WorkflowSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function WorkflowSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    steps?: { step: string; name: string; tech: string; time: string; desc: string }[];
    totalLatency?: string;
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-8 border-b pb-4 flex justify-between items-end" style={{ borderColor: template.palette.border }}>
        <div>
            <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
            {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
        </div>
        {content.totalLatency && (
            <div className="text-right">
                <div className="text-xs uppercase font-bold" style={{ color: template.palette.secondary }}>Total Time</div>
                <div className="text-xl font-bold font-mono" style={{ color: template.palette.accent }}>{content.totalLatency}</div>
            </div>
        )}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
            {content.steps?.slice(0, 4).map((step, idx) => (
            <div key={idx} className="flex flex-col relative h-full">
                <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg z-10" style={{ backgroundColor: template.palette.accent, color: template.palette.background }}>
                        {step.step || (idx + 1).toString()}
                    </div>
                    {idx < (content.steps?.length || 0) - 1 && idx < 3 && (
                        <div className="flex-1 h-0.5 ml-2" style={{ backgroundColor: template.palette.border }}></div>
                    )}
                </div>
                <div className="p-4 rounded-xl border flex-1" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                    <h3 className="font-bold text-lg mb-1" style={{ color: template.palette.primary }}>{step.name}</h3>
                    <div className="text-xs font-mono mb-2 p-1 inline-block rounded" style={{ backgroundColor: template.palette.background, color: template.palette.accent, border: `1px solid ${template.palette.border}` }}>
                        {step.tech} {step.time ? `• ${step.time}` : ""}
                    </div>
                    <p className="text-sm mt-2" style={{ color: template.palette.secondary }}>{step.desc}</p>
                </div>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
''',
    'ResultsSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function ResultsSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    benchmarks?: { label: string; value: string; change: string; status: string }[];
    bullets?: string[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-6 border-b pb-4" style={{ borderColor: template.palette.border }}>
        <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
        {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {content.benchmarks && content.benchmarks.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {content.benchmarks.slice(0, 4).map((b, i) => (
              <div key={i} className="p-6 rounded-xl border flex flex-col justify-center items-center text-center" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <div className="text-lg font-bold mb-2" style={{ color: template.palette.text }}>{b.label}</div>
                <div className="text-5xl font-black mb-2" style={{ color: template.palette.primary }}>{b.value}</div>
                <div className="flex gap-2 items-center">
                    <span className="text-sm font-bold" style={{ color: template.palette.accent }}>{b.change}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full uppercase tracking-wide border" style={{ backgroundColor: template.palette.background, borderColor: template.palette.border, color: template.palette.secondary }}>{b.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {content.bullets && content.bullets.length > 0 && (
            <ul className="mt-4 space-y-2">
                {content.bullets.slice(0, 3).map((bullet, i) => (
                    <li key={i} className="flex gap-2 items-center text-sm" style={{ color: template.palette.secondary }}>
                        <span style={{ color: template.palette.accent }}>▸</span> {bullet}
                    </li>
                ))}
            </ul>
        )}
      </div>
    </div>
  );
}
''',
    'HardwareSlide.tsx': '''"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function HardwareSlide({ slide, template }: SlideProps) {
  const content = slide.content as {
    items?: { component: string; spec: string; cost: string }[];
    totalCost?: string;
    bullets?: string[];
  };

  return (
    <div className="h-full w-full p-8 sm:p-12 flex flex-col" style={{ backgroundColor: template.palette.background, color: template.palette.text }}>
      <div className="mb-6 border-b pb-4 flex justify-between items-end" style={{ borderColor: template.palette.border }}>
        <div>
            <h2 className="text-3xl font-bold" style={{ color: template.palette.primary }}>{slide.title}</h2>
            {slide.subtitle && <p className="mt-2 text-lg" style={{ color: template.palette.secondary }}>{slide.subtitle}</p>}
        </div>
        {content.totalCost && (
            <div className="text-right p-3 rounded-lg border" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border }}>
                <div className="text-xs uppercase font-bold" style={{ color: template.palette.secondary }}>Total Cost</div>
                <div className="text-2xl font-bold" style={{ color: template.palette.accent }}>{content.totalCost}</div>
            </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-hidden">
        {content.items && content.items.length > 0 && (
            <div className="rounded-xl border overflow-hidden" style={{ borderColor: template.palette.border }}>
                <div className="grid grid-cols-12 px-4 py-3 text-xs font-bold uppercase border-b" style={{ backgroundColor: template.palette.cardBg, borderColor: template.palette.border, color: template.palette.secondary }}>
                    <div className="col-span-4">Component</div>
                    <div className="col-span-6">Specification</div>
                    <div className="col-span-2 text-right">Cost</div>
                </div>
                <div className="divide-y" style={{ borderColor: template.palette.border }}>
                    {content.items.slice(0, 5).map((item, idx) => (
                        <div key={idx} className="grid grid-cols-12 px-4 py-3 items-center text-sm" style={{ backgroundColor: template.palette.background }}>
                            <div className="col-span-4 font-bold" style={{ color: template.palette.primary }}>{item.component}</div>
                            <div className="col-span-6" style={{ color: template.palette.text }}>{item.spec}</div>
                            <div className="col-span-2 text-right font-mono font-medium" style={{ color: template.palette.accent }}>{item.cost}</div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {content.bullets && content.bullets.length > 0 && (
            <div className="grid grid-cols-2 gap-4 mt-auto">
                {content.bullets.slice(0, 4).map((bullet, idx) => (
                    <div key={idx} className="flex gap-2 items-start text-sm" style={{ color: template.palette.secondary }}>
                        <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ backgroundColor: template.palette.accent }} />
                        <span>{bullet}</span>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
}
''',
    'VivaDefenseSlide.tsx': '''"use client";
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
''',
    'RoadmapSlide.tsx': '''"use client";
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
''',
    'ConclusionSlide.tsx': '''"use client";
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
'''
}

for filename, code in components.items():
    filepath = os.path.join(slides_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(code)
    print(f"Wrote {filename}")
