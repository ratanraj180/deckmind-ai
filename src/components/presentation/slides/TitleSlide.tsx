"use client";
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
