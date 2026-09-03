'use client';

import React from 'react';
import { SlideData } from '@/types/presentation';
import { PresentationTemplate, LayoutFamily } from '@/types/templates';
import { usePresentation } from '@/context/PresentationContext';
import {
  TitleSlideLayout,
  AgendaSlideLayout,
  ProblemSplitLayout,
  SolutionHeroLayout,
  ArchitectureDiagramLayout,
  ProcessFlowLayout,
  ComparisonTableLayout,
  KpiDashboardLayout,
  TechEcosystemLayout,
  TimelineRoadmapLayout,
  VivaDefenseLayout,
  ConclusionBoldLayout,
  ThankYouLayout,
} from './slideLayouts';
import {
  BentoLayout,
  SwissLayout,
  MinimalLayout,
  BrutalistLayout,
  CyberLayout,
  PosterLayout,
  DashboardLayout,
  SplitScreenLayout,
  EditorialLayout,
  TimelineLayout,
  BlueprintLayout,
  CorporateLayout,
  MemphisLayout,
  CardStackLayout,
} from './layouts';

interface SlideViewerProps {
  slide: SlideData;
}

export function SlideViewer({ slide }: SlideViewerProps) {
  const { selectedTemplate, activeProject } = usePresentation();

  // Use the template embedded in the project (captured at generation time)
  // falling back to the currently selected template
  const resolvedPalette = activeProject.template?.palette ?? selectedTemplate.palette;
  const resolvedLayout = (slide.layoutStyle || activeProject.template?.layoutStyle || selectedTemplate.layoutStyle) as string;
  const resolvedFontMood = activeProject.template?.fontMood ?? selectedTemplate.fontMood;
  const resolvedFamily = (slide.templateFamily || activeProject.template?.family || selectedTemplate.family) as string;

  // Build a resolved template object to pass to child slides
  const resolvedTemplate: PresentationTemplate = {
    ...selectedTemplate,
    palette: resolvedPalette,
    layoutStyle: resolvedLayout as PresentationTemplate['layoutStyle'],
    fontMood: resolvedFontMood as PresentationTemplate['fontMood'],
    family: resolvedFamily as PresentationTemplate['family'],
    id: slide.templateId || selectedTemplate.id,
    name: activeProject.template?.name ?? selectedTemplate.name,
    layoutFamily: selectedTemplate.layoutFamily,
  };

  // Derive layout family from template metadata or layout style
  const layoutFamily: LayoutFamily =
    selectedTemplate.layoutFamily ||
    (resolvedLayout === 'bento-grid' ? 'bento' :
     resolvedLayout === 'asymmetric-grid' ? 'swiss-grid' :
     resolvedLayout === 'apple-minimal' || resolvedLayout === 'minimal-canvas' ? 'minimal' :
     resolvedLayout === 'neo-brutalist' ? 'brutalist' :
     resolvedLayout === 'cyber-tech' || resolvedLayout === 'linear-dark' || resolvedLayout === 'dark-immersive' ? 'cyber' :
     resolvedLayout === 'poster' ? 'poster' :
     resolvedLayout === 'data-dashboard' ? 'dashboard' :
     resolvedLayout === 'split-hero' ? 'split-screen' :
     resolvedLayout === 'blueprint' ? 'blueprint' :
     resolvedLayout === 'corporate-premium' ? 'corporate' :
     resolvedLayout === 'bold-magazine' || resolvedLayout === 'magazine' || resolvedLayout === 'centered-editorial' ? 'editorial' :
     resolvedLayout === 'organic-flow' ? 'memphis' :
     'bento');

  const fontClass = {
    clean_sans: 'font-sans',
    editorial: 'font-serif',
    professional: 'font-sans',
    technical: 'font-mono',
    bold_display: 'font-sans font-black tracking-tight',
  }[resolvedFontMood] ?? 'font-sans';

  // Dispatch to authentic slide layout renderers based on the slide's visual composition & narrative role
  const renderContent = () => {
    switch (slide.visualType) {
      case 'title':
        return <TitleSlideLayout slide={slide} template={resolvedTemplate} />;

      case 'agenda':
        return <AgendaSlideLayout slide={slide} template={resolvedTemplate} />;

      case 'problem_split':
      case 'problem_comparison':
        return <ProblemSplitLayout slide={slide} template={resolvedTemplate} />;

      case 'solution_hero':
      case 'solution_pillars':
        return <SolutionHeroLayout slide={slide} template={resolvedTemplate} />;

      case 'architecture_diagram':
      case 'system_architecture':
        return <ArchitectureDiagramLayout slide={slide} template={resolvedTemplate} />;

      case 'process_flow':
      case 'workflow_pipeline':
      case 'process':
        return <ProcessFlowLayout slide={slide} template={resolvedTemplate} />;

      case 'comparison_table':
      case 'comparison':
        return <ComparisonTableLayout slide={slide} template={resolvedTemplate} />;

      case 'kpi_dashboard':
      case 'results_charts':
      case 'statistics':
        return <KpiDashboardLayout slide={slide} template={resolvedTemplate} />;

      case 'tech_ecosystem':
      case 'hardware_table':
        return <TechEcosystemLayout slide={slide} template={resolvedTemplate} />;

      case 'timeline_roadmap':
      case 'roadmap':
      case 'timeline':
        return <TimelineRoadmapLayout slide={slide} template={resolvedTemplate} />;

      case 'viva_defense':
        return <VivaDefenseLayout slide={slide} template={resolvedTemplate} />;

      case 'conclusion_bold':
      case 'conclusion':
        return <ConclusionBoldLayout slide={slide} template={resolvedTemplate} />;

      case 'thank_you':
        return <ThankYouLayout slide={slide} template={resolvedTemplate} />;

      default:
        // Fallback to template layout family renderer
        switch (layoutFamily) {
          case 'bento':
            return <BentoLayout slide={slide} template={resolvedTemplate} />;
          case 'swiss-grid':
            return <SwissLayout slide={slide} template={resolvedTemplate} />;
          case 'minimal':
            return <MinimalLayout slide={slide} template={resolvedTemplate} />;
          case 'brutalist':
            return <BrutalistLayout slide={slide} template={resolvedTemplate} />;
          case 'cyber':
            return <CyberLayout slide={slide} template={resolvedTemplate} />;
          case 'poster':
            return <PosterLayout slide={slide} template={resolvedTemplate} />;
          case 'dashboard':
            return <DashboardLayout slide={slide} template={resolvedTemplate} />;
          case 'split-screen':
            return <SplitScreenLayout slide={slide} template={resolvedTemplate} />;
          case 'editorial':
          case 'magazine':
            return <EditorialLayout slide={slide} template={resolvedTemplate} />;
          case 'timeline':
            return <TimelineLayout slide={slide} template={resolvedTemplate} />;
          case 'blueprint':
            return <BlueprintLayout slide={slide} template={resolvedTemplate} />;
          case 'corporate':
            return <CorporateLayout slide={slide} template={resolvedTemplate} />;
          case 'memphis':
            return <MemphisLayout slide={slide} template={resolvedTemplate} />;
          case 'card-stack':
            return <CardStackLayout slide={slide} template={resolvedTemplate} />;
          default:
            return <BentoLayout slide={slide} template={resolvedTemplate} />;
        }
    }
  };

  const sourceSections = (slide.content as { sourceSections?: string[] })?.sourceSections;
  const pal = resolvedPalette;

  // Layout-specific background treatments
  const getBgStyle = () => {
    if (layoutFamily === 'blueprint' || resolvedLayout === 'blueprint') {
      return {
        backgroundColor: pal.background,
        backgroundImage: `radial-gradient(${pal.accent}30 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      };
    }
    if (layoutFamily === 'cyber' || resolvedLayout === 'dark-immersive' || resolvedLayout === 'linear-dark') {
      return {
        backgroundColor: pal.background,
        backgroundImage: `radial-gradient(ellipse at 20% 50%, ${pal.primary}25 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, ${pal.accent}15 0%, transparent 50%)`,
      };
    }
    if (layoutFamily === 'bento' || resolvedLayout === 'bento-grid') {
      return {
        backgroundColor: pal.background,
        backgroundImage: `linear-gradient(to right, ${pal.border}40 1px, transparent 1px), linear-gradient(to bottom, ${pal.border}40 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      };
    }
    if (layoutFamily === 'brutalist' || resolvedLayout === 'neo-brutalist') {
      return {
        backgroundColor: pal.background,
        backgroundImage: `radial-gradient(#000000 0.75px, transparent 0.75px)`,
        backgroundSize: '16px 16px',
      };
    }
    return {
      backgroundColor: pal.background,
    };
  };

  const isBrutalist = layoutFamily === 'brutalist' || resolvedLayout === 'neo-brutalist';

  return (
    <div className="flex h-full w-full items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8 select-none">
      <div
        className={`aspect-[16/9] w-full max-h-full max-w-6xl overflow-hidden rounded-2xl relative flex flex-col transition-all duration-300 ${fontClass} ${
          isBrutalist
            ? 'border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none'
            : 'border shadow-2xl ring-1 ring-black/5'
        }`}
        style={{
          ...getBgStyle(),
          borderColor: isBrutalist ? '#000000' : pal.border,
          color: pal.text,
        }}
      >
        {/* Top Decorative / Metadata Banner */}
        <div
          className="absolute top-2.5 right-3.5 z-20 flex items-center gap-2 pointer-events-none opacity-80"
        >
          {sourceSections && sourceSections.length > 0 && (
            <span
              className="text-[8px] font-mono px-2 py-0.5 rounded-full border hidden sm:inline-block font-semibold"
              style={{
                backgroundColor: pal.cardBg,
                borderColor: pal.border,
                color: pal.secondary,
              }}
            >
              {sourceSections[0]}
            </span>
          )}
          <span
            className="text-[8px] font-mono px-1.5 py-0.5 rounded-full uppercase border font-bold"
            style={{
              backgroundColor: pal.accent + '20',
              borderColor: pal.accent + '50',
              color: pal.accent,
            }}
          >
            {resolvedTemplate.name} • {slide.visualType.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Dynamic Layout Engine Content */}
        <div className="flex-1 w-full h-full overflow-hidden">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
