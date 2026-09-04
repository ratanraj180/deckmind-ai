"use client";
import React from "react";
import { SlideData } from "@/types/presentation";
import { PresentationTemplate } from "@/types/templates";
import { TitleSlideLayout } from "../slideLayouts/TitleSlideLayout";

interface SlideProps {
  slide: SlideData;
  template: PresentationTemplate;
}

export function TitleSlide({ slide, template }: SlideProps) {
  return <TitleSlideLayout slide={slide} template={template} />;
}
