import { DocumentAnalysis, DocumentSection } from '@/types/document';
import {
  PresentationConfig,
  PresentationProject,
  SlideData,
  SlideVisualType,
  TemplateSnapshot,
} from '@/types/presentation';
import { PresentationTemplate } from '@/types/templates';

// ============================================================
// TEMPLATE DESIGN RULES
// Each template family drives fundamentally different content shaping,
// bullet density, header alignment, and visual composition.
// ============================================================
interface TemplateRules {
  maxBulletsPerSlide: number;
  titleAlignment: 'left' | 'center' | 'right';
  preferredLayout: string;
  chartStyle: 'modern-dark' | 'scientific' | 'minimal' | 'colorful' | 'blueprint';
  diagramStyle: 'geometric' | 'organic' | 'schematic' | 'minimal' | 'data';
  contentTone: 'technical' | 'academic' | 'creative' | 'business' | 'editorial';
  emphasizeVisuals: boolean;
}

function getTemplateRules(template: PresentationTemplate): TemplateRules {
  const ruleMap: Record<string, TemplateRules> = {
    apple_minimal: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'apple-minimal',
      chartStyle: 'minimal',
      diagramStyle: 'minimal',
      contentTone: 'editorial',
      emphasizeVisuals: false,
    },
    linear_dark: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'linear-dark',
      chartStyle: 'modern-dark',
      diagramStyle: 'geometric',
      contentTone: 'technical',
      emphasizeVisuals: true,
    },
    bento_grid: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'bento-grid',
      chartStyle: 'modern-dark',
      diagramStyle: 'geometric',
      contentTone: 'business',
      emphasizeVisuals: true,
    },
    neo_brutalist: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'neo-brutalist',
      chartStyle: 'colorful',
      diagramStyle: 'geometric',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    swiss_editorial: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'asymmetric-grid',
      chartStyle: 'minimal',
      diagramStyle: 'minimal',
      contentTone: 'editorial',
      emphasizeVisuals: false,
    },
    vercel_mono: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'linear-dark',
      chartStyle: 'modern-dark',
      diagramStyle: 'schematic',
      contentTone: 'technical',
      emphasizeVisuals: true,
    },
    future_tech: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'cyber-tech',
      chartStyle: 'modern-dark',
      diagramStyle: 'geometric',
      contentTone: 'technical',
      emphasizeVisuals: true,
    },
    academic_research: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'center',
      preferredLayout: 'academic-research',
      chartStyle: 'scientific',
      diagramStyle: 'schematic',
      contentTone: 'academic',
      emphasizeVisuals: false,
    },
    data_storytelling: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'data-dashboard',
      chartStyle: 'modern-dark',
      diagramStyle: 'data',
      contentTone: 'business',
      emphasizeVisuals: true,
    },
    startup_product: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'split-hero',
      chartStyle: 'modern-dark',
      diagramStyle: 'geometric',
      contentTone: 'business',
      emphasizeVisuals: true,
    },
    aurora_gradient: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'aurora-gradient',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    bold_magazine: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'bold-magazine',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'editorial',
      emphasizeVisuals: true,
    },
    corporate_premium: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'corporate-premium',
      chartStyle: 'scientific',
      diagramStyle: 'minimal',
      contentTone: 'business',
      emphasizeVisuals: false,
    },
    luxury_black: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'center',
      preferredLayout: 'centered-editorial',
      chartStyle: 'minimal',
      diagramStyle: 'minimal',
      contentTone: 'editorial',
      emphasizeVisuals: false,
    },
    google_editorial: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'apple-minimal',
      chartStyle: 'scientific',
      diagramStyle: 'minimal',
      contentTone: 'business',
      emphasizeVisuals: false,
    },
    soft_pastel: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'organic-flow',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    creative_portfolio: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'asymmetric-grid',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    engineering_blueprint: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'blueprint',
      chartStyle: 'blueprint',
      diagramStyle: 'schematic',
      contentTone: 'technical',
      emphasizeVisuals: true,
    },
    bold_creative: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'poster',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    minimal_premium: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'center',
      preferredLayout: 'minimal-canvas',
      chartStyle: 'minimal',
      diagramStyle: 'minimal',
      contentTone: 'editorial',
      emphasizeVisuals: false,
    },
    luxury_editorial: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'center',
      preferredLayout: 'centered-editorial',
      chartStyle: 'minimal',
      diagramStyle: 'minimal',
      contentTone: 'editorial',
      emphasizeVisuals: false,
    },
    magazine_story: {
      maxBulletsPerSlide: 3,
      titleAlignment: 'left',
      preferredLayout: 'magazine',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
    modern_corporate: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'left',
      preferredLayout: 'split-hero',
      chartStyle: 'scientific',
      diagramStyle: 'minimal',
      contentTone: 'business',
      emphasizeVisuals: false,
    },
    organic_soft: {
      maxBulletsPerSlide: 4,
      titleAlignment: 'center',
      preferredLayout: 'organic-flow',
      chartStyle: 'colorful',
      diagramStyle: 'organic',
      contentTone: 'creative',
      emphasizeVisuals: true,
    },
  };

  return ruleMap[template.family] ?? ruleMap['modern_corporate'];
}

function snapshotTemplate(template: PresentationTemplate): TemplateSnapshot {
  return {
    id: template.id,
    name: template.name,
    family: template.family,
    layoutStyle: template.layoutStyle,
    fontMood: template.fontMood,
    palette: { ...template.palette },
  };
}

// ============================================================
// MAIN GENERATOR
// ============================================================
export function generatePresentationFromDocument(
  doc: DocumentAnalysis,
  config: PresentationConfig,
  template: PresentationTemplate
): PresentationProject {
  const rules = getTemplateRules(template);

  console.log(`[DeckMind Generator] ──────────────────────────────────`);
  console.log(`[DeckMind Generator] Document: "${doc.title}" (${doc.pageCount} pages, ${doc.metadata.wordCount} words)`);
  console.log(`[DeckMind Generator] Selected template: ${template.id}`);
  console.log(`[DeckMind Generator] Design family: ${template.family}`);
  console.log(`[DeckMind Generator] Layout engine: ${template.layoutStyle}`);
  console.log(`[DeckMind Generator] Palette (bg): ${template.palette.background}`);
  console.log(`[DeckMind Generator] Palette (accent): ${template.palette.accent}`);
  console.log(`[DeckMind Generator] Content tone: ${rules.contentTone} | Bullets max: ${rules.maxBulletsPerSlide}`);
  console.log(`[DeckMind Generator] Sections available: ${doc.sections.length}`);
  console.log(`[DeckMind Generator] Config: duration=${config.duration}, density=${config.density}, purpose=${config.purpose}`);

  const templateSnap = snapshotTemplate(template);

  const targetCount =
    config.slideCount === 'ai_decide'
      ? Math.min(12, Math.max(5, doc.sections.length + 2))
      : parseInt(config.slideCount, 10) || 10;

  const slides: SlideData[] = [];
  let currentSlideId = 1;

  // Helper to stamp template metadata onto every slide
  const stamp = (partial: Omit<SlideData, 'templateId' | 'templateFamily' | 'layoutStyle'>): SlideData => ({
    ...partial,
    templateId: template.id,
    templateFamily: template.family,
    layoutStyle: template.layoutStyle,
    layoutFamily: template.layoutFamily || 'bento',
  });

  const availableSections = doc.sections.length > 0
    ? doc.sections
    : [{
        id: 'fallback-1',
        title: 'Key Findings & Analysis',
        content: doc.fullText.slice(0, 800),
        pageNumbers: [1],
        keyPoints: [doc.fullText.slice(0, 150)],
        wordCount: 120,
      }];

  const dedupedSections = deduplicateSections(availableSections);

  // ──────────────────────────────────────────────────────────
  // NARRATIVE STORYLINE SEQUENCE PLANNER
  // Intelligently sequences distinct layouts across the presentation.
  // CRITICAL RULE: Never use the exact same layout consecutively!
  // ──────────────────────────────────────────────────────────
  const isViva = config.purpose === 'project_viva';
  const narrativePlan = planSlideStoryline(targetCount, isViva, template, doc.title);
  const usedSectionIndices = new Set<number>();

  for (let i = 0; i < narrativePlan.length; i++) {
    const slot = narrativePlan[i];
    const duration = Math.round((parseInt(config.duration, 10) || 10) * 60 / narrativePlan.length) || 60;

    if (slot.visualType === 'title') {
      slides.push(stamp({
        id: currentSlideId,
        slideNumber: currentSlideId++,
        title: doc.title,
        subtitle: buildConciseSubtitle(doc.summary, rules.contentTone),
        visualType: 'title',
        layoutId: slot.layoutId,
        visualStrategy: slot.visualStrategy,
        category: slot.category,
        durationSeconds: 60,
        speakerNotes: buildTitleSpeakerNotes(doc.title, config, template),
        content: {
          authors: [doc.metadata.author || 'Project Lead'],
          guide: 'Faculty Supervisor',
          institution: purposeToInstitution(config.purpose),
          badge: `${config.purpose.replace('_', ' ').toUpperCase()} • ${config.duration}`,
          tags: extractTopicTags(doc.title, doc.fullText),
          alignment: rules.titleAlignment,
          chartStyle: rules.chartStyle,
          sourceSections: [doc.sections[0]?.title || 'Overview'],
        },
      }));
    } else if (slot.visualType === 'thank_you') {
      slides.push(stamp({
        id: currentSlideId,
        slideNumber: currentSlideId++,
        title: 'Thank You',
        subtitle: 'Open for Discussion & Questions',
        visualType: 'thank_you',
        layoutId: slot.layoutId,
        visualStrategy: slot.visualStrategy,
        category: slot.category,
        durationSeconds: 45,
        speakerNotes: `Thank you for your time. We are now open for queries, feedback, and cross-examination on ${doc.title}.`,
        content: {
          authors: [doc.metadata.author || 'Project Lead'],
          institution: purposeToInstitution(config.purpose),
          tags: extractTopicTags(doc.title, doc.fullText),
          alignment: rules.titleAlignment,
        },
      }));
    } else {
      const { section: matchedSec, title: slideTitle } = findBestSectionForSlot(
        slot,
        dedupedSections,
        usedSectionIndices,
        i
      );

      const structuredContent = buildSlideContent(matchedSec, slot.visualType, doc, config, rules, template);

      slides.push(stamp({
        id: currentSlideId,
        slideNumber: currentSlideId++,
        title: slideTitle,
        subtitle: buildSectionSubtitle(matchedSec, rules.contentTone),
        visualType: slot.visualType,
        layoutId: slot.layoutId,
        visualStrategy: slot.visualStrategy,
        category: slot.category,
        durationSeconds: duration,
        speakerNotes: generateSpeakerNotes(matchedSec, doc.title, template),
        content: {
          ...structuredContent,
          kicker: slot.category.toUpperCase(),
          keyTakeaway: matchedSec.keyPoints[0] ?? structuredContent.bullets?.[0] ?? '',
          sourceSections: [matchedSec.title],
          pageNumbers: matchedSec.pageNumbers,
          alignment: rules.titleAlignment,
          diagramStyle: rules.diagramStyle,
          chartStyle: rules.chartStyle,
        },
      }));
    }
  }

  console.log(`[DeckMind Generator] Generated ${slides.length} slides for template "${template.name}"`);
  console.log(`[DeckMind Generator] ──────────────────────────────────`);

  return {
    id: `proj-${Date.now()}`,
    title: doc.title,
    description: doc.summary,
    document: {
      id: doc.id,
      name: doc.fileName,
      size: doc.fileSize,
      type: doc.fileType,
      pages: doc.pageCount,
      uploadedAt: doc.extractedAt,
    },
    config: { ...config, templateId: template.id },
    template: templateSnap,
    slides,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isPaid: false,
  };
}

export interface SlideNarrativeSlot {
  visualType: SlideVisualType;
  layoutId: string;
  category: string;
  visualStrategy: string;
  fallbackTitle: string;
}

export function planSlideStoryline(
  targetCount: number,
  isViva: boolean,
  template: PresentationTemplate,
  docTitle: string
): SlideNarrativeSlot[] {
  const fullArc: SlideNarrativeSlot[] = [
    { visualType: 'title', layoutId: 'hero-title', category: 'Title & Overview', visualStrategy: 'hero', fallbackTitle: docTitle },
    { visualType: 'agenda', layoutId: 'agenda-navigation', category: 'Presentation Roadmap', visualStrategy: 'navigation', fallbackTitle: 'Executive Agenda & Scope' },
    { visualType: 'problem_split', layoutId: 'split-problem', category: 'Problem Formulation', visualStrategy: 'contrast', fallbackTitle: 'Operational Bottlenecks & Friction' },
    { visualType: 'solution_hero', layoutId: 'concept-hero', category: 'Proposed Solution', visualStrategy: 'focal-concept', fallbackTitle: 'Proposed Architectural Paradigm' },
    { visualType: 'architecture_diagram', layoutId: 'architecture-tiers', category: 'System Architecture', visualStrategy: 'diagram', fallbackTitle: 'Multi-Tier System Topology' },
    { visualType: 'process_flow', layoutId: 'process-flowchart', category: 'Execution Pipeline', visualStrategy: 'pipeline', fallbackTitle: 'End-to-End Processing Flow' },
    { visualType: 'comparison_table', layoutId: 'vs-comparison', category: 'Comparative Benchmark', visualStrategy: 'matrix', fallbackTitle: 'Baseline vs Proposed Solution' },
    { visualType: 'kpi_dashboard', layoutId: 'metrics-dashboard', category: 'Empirical Results', visualStrategy: 'statistics', fallbackTitle: 'Empirical Telemetry & Benchmarks' },
    { visualType: 'tech_ecosystem', layoutId: 'tech-grid', category: 'Hardware & Tech Stack', visualStrategy: 'ecosystem', fallbackTitle: 'Hardware & Technology Stack' },
    { visualType: 'timeline_roadmap', layoutId: 'timeline-milestones', category: 'Deployment Horizon', visualStrategy: 'journey', fallbackTitle: 'Deployment Horizon & Milestones' },
    ...(isViva ? [{ visualType: 'viva_defense' as SlideVisualType, layoutId: 'viva-qa', category: 'Viva Voce Scrutiny', visualStrategy: 'evidence', fallbackTitle: 'Technical Examination Defense' }] : []),
    { visualType: 'conclusion_bold', layoutId: 'bold-conclusion', category: 'Conclusion & Contributions', visualStrategy: 'statement', fallbackTitle: 'Conclusion & Key Deliverables' },
    { visualType: 'thank_you', layoutId: 'closing-screen', category: 'Discussion & Inquiries', visualStrategy: 'closing', fallbackTitle: 'Thank You — Open for Questions' },
  ];

  if (targetCount >= fullArc.length) {
    return fullArc;
  }

  const first = fullArc[0];
  const lastTwo = fullArc.slice(-2);
  const middlePool = fullArc.slice(1, -2);
  const neededMiddle = Math.max(1, targetCount - 3);

  const step = middlePool.length / neededMiddle;
  const selected: SlideNarrativeSlot[] = [];
  for (let i = 0; i < neededMiddle; i++) {
    const idx = Math.min(Math.floor(i * step), middlePool.length - 1);
    const cand = middlePool[idx];
    if (!selected.some(s => s.visualType === cand.visualType)) {
      selected.push(cand);
    }
  }

  for (const cand of middlePool) {
    if (selected.length >= neededMiddle) break;
    if (!selected.some(s => s.visualType === cand.visualType)) {
      selected.push(cand);
    }
  }

  const result = [first, ...selected.slice(0, neededMiddle), ...lastTwo];

  // Strictly enforce: No consecutive duplicate visualTypes
  for (let i = 1; i < result.length; i++) {
    if (result[i].visualType === result[i - 1].visualType) {
      const alt = fullArc.find(a => a.visualType !== result[i - 1].visualType && (i === result.length - 1 || a.visualType !== result[i + 1]?.visualType));
      if (alt) result[i] = alt;
    }
  }

  return result.slice(0, targetCount);
}

export function findBestSectionForSlot(
  slot: SlideNarrativeSlot,
  availableSections: DocumentSection[],
  usedIndices: Set<number>,
  slotIndex: number
): { section: DocumentSection; title: string } {
  const keywords: Partial<Record<SlideVisualType, RegExp>> = {
    problem_split: /\b(problem|challenge|limitation|issue|drawback|friction|bottleneck|existing|vulnerability)\b/i,
    solution_hero: /\b(solution|proposed|proposal|approach|innovation|concept|framework|overview|model)\b/i,
    architecture_diagram: /\b(architecture|diagram|component|tier|layer|structure|topology|design|stack|database)\b/i,
    process_flow: /\b(process|pipeline|flow|workflow|method|algorithm|procedure|step|lifecycle|execution)\b/i,
    comparison_table: /\b(comparison|vs|versus|compare|baseline|evaluation|tradeoff|difference)\b/i,
    kpi_dashboard: /\b(result|metric|accuracy|performance|speed|latency|benchmark|finding|evaluation|statistics)\b/i,
    tech_ecosystem: /\b(hardware|software|stack|technology|tool|equipment|bom|cost|sensor|specification)\b/i,
    timeline_roadmap: /\b(timeline|roadmap|milestone|future|phase|schedule|horizon|plan)\b/i,
    viva_defense: /\b(defense|scrutiny|question|qa|discussion|examination|viva)\b/i,
    conclusion_bold: /\b(conclusion|summary|takeaway|deliverable|contribution|impact)\b/i,
  };

  const regex = keywords[slot.visualType];
  if (regex) {
    for (let i = 0; i < availableSections.length; i++) {
      if (!usedIndices.has(i)) {
        const sec = availableSections[i];
        if (regex.test(sec.title) || regex.test(sec.content.slice(0, 400))) {
          usedIndices.add(i);
          return { section: sec, title: cleanTitle(sec.title) };
        }
      }
    }
  }

  // Fallback: Pick next unused section
  for (let i = 0; i < availableSections.length; i++) {
    if (!usedIndices.has(i)) {
      usedIndices.add(i);
      return { section: availableSections[i], title: cleanTitle(availableSections[i].title) };
    }
  }

  // Fallback: Default synthesized section
  const fallbackSec: DocumentSection = availableSections[slotIndex % availableSections.length] || {
    id: `sec-${slotIndex}`,
    title: slot.fallbackTitle,
    content: slot.fallbackTitle,
    pageNumbers: [1],
    keyPoints: [slot.fallbackTitle],
    wordCount: 50,
  };

  return { section: fallbackSec, title: slot.fallbackTitle };
}

// ============================================================
// VISUAL TYPE INFERENCE
// ============================================================
function inferVisualType(
  title: string,
  content: string,
  template: PresentationTemplate,
  rules: TemplateRules
): SlideVisualType {
  const combined = (title + ' ' + content).toLowerCase();

  // Keyword-first detection
  if (combined.match(/\b(problem|challenge|bottleneck|limitation|gap|issue|difficulty|vulnerability)\b/)) {
    return 'problem_comparison';
  }
  if (combined.match(/\b(architecture|system design|component|module|layer|infrastructure|structure|stack|directory|framework|schema|database)\b/)) {
    return 'system_architecture';
  }
  if (combined.match(/\b(workflow|pipeline|process|methodology|step|phase|algorithm|procedure|setup|installation|lifecycle)\b/)) {
    return 'workflow_pipeline';
  }
  if (combined.match(/\b(result|evaluation|benchmark|accuracy|metric|experiment|performance|test|measure|kpi|statistics)\b/)) {
    return rules.emphasizeVisuals ? 'results_charts' : 'statistics';
  }
  if (combined.match(/\b(timeline|roadmap|future|milestone|schedule|phase|plan|horizon)\b/)) {
    return 'roadmap';
  }
  if (combined.match(/\b(compare|versus|vs|difference|contrast|traditional|existing|alternative)\b/)) {
    return 'comparison';
  }
  if (combined.match(/\b(cost|budget|bill|material|hardware|component|specification|price|equipment)\b/)) {
    return 'hardware_table';
  }
  if (combined.match(/\b(introduction|overview|background|abstract|summary)\b/) && template.family === 'academic_research') {
    return 'section';
  }
  if (combined.match(/\b(conclusion|summary|takeaway|finding|contribution|summary)\b/)) {
    return 'conclusion';
  }

  // Template-family fallback
  if (template.family === 'data_storytelling') return 'statistics';
  if (template.family === 'bold_creative' || template.family === 'bold_magazine') return 'solution_pillars';

  return 'solution_pillars';
}

// ============================================================
// SLIDE CONTENT BUILDER
// Ensures slides are NEVER empty and raw text is parsed into rich presentation cards
// ============================================================
function buildSlideContent(
  sec: DocumentSection,
  visualType: SlideVisualType,
  doc: DocumentAnalysis,
  config: PresentationConfig,
  rules: TemplateRules,
  template: PresentationTemplate
) {
  const maxBullets = config.density === 'concise'
    ? Math.min(rules.maxBulletsPerSlide, 3)
    : config.density === 'detailed'
    ? Math.max(rules.maxBulletsPerSlide + 1, 4)
    : rules.maxBulletsPerSlide;

  // 1. Intelligently extract points so a slide is NEVER left with only 1 point or empty cards!
  let rawPoints = sec.keyPoints && sec.keyPoints.length > 0 ? [...sec.keyPoints] : [];

  if (rawPoints.length < 3 && sec.content) {
    // If text contains file tree, directory markers, or lines
    if (sec.content.includes('├──') || sec.content.includes('│') || sec.content.includes('/')) {
      const treeLines = sec.content
        .split('\n')
        .map(l => l.replace(/[├─│└|\s]+/g, ' ').trim())
        .filter(l => l.length > 2 && !l.startsWith('#'));
      if (treeLines.length >= 2) {
        rawPoints = treeLines.slice(0, 5).map(l => `Module: ${l}`);
      }
    } else {
      // Split sentences
      const sentences = sec.content
        .split(/(?<=[.?!])\s+/)
        .map(s => s.trim())
        .filter(s => s.length > 15);
      if (sentences.length >= 2) {
        rawPoints = [...new Set([...rawPoints, ...sentences])];
      }
    }
  }

  // Guarantee at least 3 presentation points
  if (rawPoints.length === 0) {
    rawPoints = [
      `${cleanTitle(sec.title)} foundational architectural principles and requirements.`,
      `Core operational execution pipeline optimized for target platform environments.`,
      `Empirical validation and performance verification under live operating conditions.`,
    ];
  } else if (rawPoints.length === 1) {
    const p0 = rawPoints[0];
    rawPoints = [
      p0,
      `Key operational framework: Automated modular execution across verified components.`,
      `Target delivery: High reliability, low overhead, and scalable maintainability.`,
    ];
  } else if (rawPoints.length === 2) {
    rawPoints.push(`Integration & validation: Cross-layer verification ensuring seamless pipeline flow.`);
  }

  const points = rawPoints
    .slice(0, Math.max(maxBullets, 3))
    .map(p => toPresentationLanguage(p, rules.contentTone));

  const slideTitleClean = cleanTitle(sec.title);

  switch (visualType) {
    case 'agenda':
      return {
        bullets: points,
        agenda: [
          { number: '01', title: 'Problem Context & Operational Bottlenecks', time: '2 min', tag: 'Discovery', desc: 'Baseline limitations and legacy architecture failure modes.' },
          { number: '02', title: 'Core Architectural Paradigm & Components', time: '3 min', tag: 'Design', desc: 'Decoupled edge processing and autonomous perception topology.' },
          { number: '03', title: 'End-to-End Processing & Algorithmic Flow', time: '3 min', tag: 'Execution', desc: 'Hardware-accelerated pipeline with zero memory buffer bloat.' },
          { number: '04', title: 'Empirical Verification & KPI Metrics', time: '2 min', tag: 'Validation', desc: 'Sub-50ms latency SLA with 99.4% top-1 verification accuracy.' },
          { number: '05', title: 'Deployment Roadmap & Key Deliverables', time: '2 min', tag: 'Impact', desc: 'Hardware BOM optimization and production cluster deployment.' },
        ],
      };

    case 'problem_split':
    case 'problem_comparison':
      return {
        bullets: points,
        metrics: [
          { label: 'Primary Bottleneck', value: points[0]?.slice(0, 30) ?? 'Identified', sub: 'Primary friction area' },
          { label: 'Scope', value: `${doc.pageCount}p Doc`, sub: 'Covered in technical analysis' },
          { label: 'Resolution', value: 'Solved', sub: 'Validated in proposed architecture' },
        ],
        comparison: points.slice(0, 3).map((p, idx) => ({
          aspect: `Challenge 0${idx + 1}`,
          flaw: p,
          severity: idx === 0 ? 'Critical' : 'High',
        })),
      };

    case 'solution_hero':
    case 'solution_pillars':
      return {
        bullets: points,
        pillars: points.slice(0, 3).map((p, idx) => ({
          number: `0${idx + 1}`,
          title: extractStepName(p, idx, slideTitleClean),
          desc: p,
          tag: rules.contentTone === 'academic' ? 'Research Finding' : 'Key Architecture',
        })),
      };

    case 'architecture_diagram':
    case 'system_architecture':
      return {
        bullets: points,
        layers: points.slice(0, 4).map((p, idx) => ({
          name: `Tier 0${idx + 1}`,
          node: extractComponentName(p, idx, slideTitleClean),
          details: p,
          type: idx === 0 ? 'Input / Ingestion' : idx === points.length - 1 ? 'Output / Storage' : 'Processing Core',
        })),
        diagramStyle: rules.diagramStyle,
      };

    case 'process_flow':
    case 'workflow_pipeline':
    case 'process':
      return {
        bullets: points,
        steps: points.slice(0, 4).map((p, idx) => ({
          step: `${idx + 1}`,
          name: extractStepName(p, idx, slideTitleClean),
          tech: template.family === 'future_tech' ? 'Neural Engine Layer' : idx === 0 ? 'OpenCV Ingest' : idx === 1 ? 'TensorRT FP16' : idx === 2 ? 'FAISS Index' : 'Transactional Commit',
          desc: p,
        })),
      };

    case 'kpi_dashboard':
    case 'results_charts':
    case 'statistics':
      return {
        bullets: points,
        metrics: [
          { label: 'Primary SLA Metric', value: extractMetric(points[0]) ?? '99.4%', delta: '+6.2% vs baseline' },
          { label: 'Latency / Efficiency', value: extractMetric(points[1]) ?? '42ms', delta: 'FP16 CUDA Speedup' },
          { label: 'Throughput Speedup', value: '4.8x', delta: 'Zero dropouts verified' },
        ],
        benchmarks: [
          { label: 'Perception Inference (FP16)', value: '18ms', change: 'Validated CUDA runtime SLA' },
          { label: 'FAISS Vector Similarity Match', value: '1.2ms', change: 'Sub-linear L2 Euclidean match' },
        ],
        chartStyle: rules.chartStyle,
      };

    case 'comparison_table':
    case 'comparison':
      return {
        bullets: points,
        rows: points.slice(0, 4).map((p, idx) => ({
          aspect: `Dimension 0${idx + 1}`,
          dimension: `Dimension 0${idx + 1}: ${extractStepName(p, idx, slideTitleClean)}`,
          before: idx === 0 ? 'Traditional Manual Approach' : 'Legacy Baseline Method',
          baseline: idx === 0 ? 'Traditional Manual Approach' : 'Legacy Baseline Method',
          after: p,
          proposed: p,
          status: idx === 0 ? '30x Faster' : idx === 1 ? 'Autonomous' : idx === 2 ? 'Zero-Trust' : '87% Savings',
        })),
      };

    case 'tech_ecosystem':
    case 'hardware_table':
      return {
        bullets: points,
        items: points.slice(0, 4).map((p, idx) => ({
          component: extractComponentName(p, idx, slideTitleClean),
          spec: p,
          cost: idx === 0 ? '$99' : idx === 1 ? '$32' : idx === 2 ? 'Open Source' : 'Embedded',
        })),
        totalCost: 'Estimated Budget: Production Feasible',
      };

    case 'timeline_roadmap':
    case 'timeline':
    case 'roadmap':
      return {
        bullets: points,
        milestones: points.slice(0, 4).map((p, idx) => ({
          phase: `Phase 0${idx + 1}`,
          title: extractStepName(p, idx, slideTitleClean),
          desc: p,
        })),
      };

    case 'viva_defense':
      return {
        bullets: points,
        qaList: generateVivaQuestions(doc),
      };

    case 'conclusion_bold':
    case 'conclusion':
      return {
        bullets: points,
        takeaways: points.slice(0, 3),
        thankYou: 'Thank you — Open for Questions',
      };

    default: // solution_pillars, section, bullets, quote
      return {
        bullets: points,
        pillars: points.slice(0, 3).map((p, idx) => ({
          number: `0${idx + 1}`,
          title: extractStepName(p, idx, slideTitleClean),
          desc: p,
          tag: rules.contentTone === 'academic' ? 'Research Finding' : 'Key Architecture',
        })),
      };
  }
}

// ============================================================
// SECTION SELECTION & DEDUPLICATION
// ============================================================
function deduplicateSections(sections: DocumentSection[]): DocumentSection[] {
  const seen = new Set<string>();
  return sections.filter(sec => {
    const key = sec.title.toLowerCase().trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function selectRepresentativeSections(sections: DocumentSection[], count: number): DocumentSection[] {
  if (sections.length <= count) return sections;
  // Rank by content richness (word count + key point density)
  const ranked = [...sections].sort((a, b) => {
    const scoreA = a.wordCount * 0.4 + a.keyPoints.length * 10;
    const scoreB = b.wordCount * 0.4 + b.keyPoints.length * 10;
    return scoreB - scoreA;
  });
  // Take top-ranked but maintain document order
  const topIds = new Set(ranked.slice(0, count).map(s => s.id));
  return sections.filter(s => topIds.has(s.id));
}

// ============================================================
// TEXT HELPERS
// ============================================================
function toPresentationLanguage(text: string, tone: string): string {
  // Strip leading numbering or bullet symbols
  let cleaned = text
    .replace(/^(\d+[\.\:\-\)]|\b(step|phase|item|layer)\s*\d+[\.\:\-]?|[•\-\*►])\s*/i, '')
    .trim()
    .replace(/\s+/g, ' ');

  // Remove overly academic preambles
  cleaned = cleaned
    .replace(/^(The proposed system|It is designed to|This section describes|As mentioned above|In this study,)\s+/i, '')
    .replace(/^(We have|Our system|This paper|The authors)\s+/i, '');

  if (cleaned.length > 140) {
    const cutAt = cleaned.lastIndexOf(' ', 135);
    cleaned = cleaned.slice(0, cutAt > 60 ? cutAt : 135) + '...';
  }

  if (tone === 'technical' || tone === 'academic') return cleaned;
  return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
}

function buildConciseSubtitle(summary: string, tone: string): string {
  const sub = summary.replace(/\s+/g, ' ').trim().slice(0, 160);
  if (tone === 'creative') return sub + ' — Presented with Intelligence';
  return sub;
}

function buildSectionSubtitle(sec: DocumentSection, tone: string): string {
  const page = sec.pageNumbers.length > 0 ? `p. ${sec.pageNumbers[0]}` : '';
  if (tone === 'technical') return `Technical analysis${page ? ' · ' + page : ''}`;
  if (tone === 'academic') return `Research methodology${page ? ' — ' + page : ''}`;
  return `Key insights${page ? ' · ' + page : ''}`;
}

function cleanTitle(title: string): string {
  return title
    .replace(/^\d+[\.\:\-\)]\s*/, '')  // Remove "11. " or "3: " prefixes
    .replace(/^[IVX]+[\.\:\-\)]\s*/i, '') // Remove "III. " prefixes
    .replace(/^Section\s+\d+[\.\:\-]?\s*/i, '') // Remove "Section 11: "
    .trim();
}

function extractComponentName(text: string, idx: number, slideTitle?: string): string {
  const match = text.match(/^([A-Z][a-zA-Z\s]{2,25})(?:[:\-.,]|$)/);
  let name = match ? match[1].trim() : '';
  if (name && slideTitle && name.toLowerCase().includes(slideTitle.toLowerCase().slice(0, 12))) {
    name = '';
  }
  if (!name) {
    const defaults = ['Ingestion & Client Interface', 'Core Processing Pipeline', 'Data Persistence & Storage', 'Security & Infrastructure'];
    return defaults[idx] ?? `Component Layer 0${idx + 1}`;
  }
  return name;
}

function extractStepName(text: string, idx: number, slideTitle?: string): string {
  let cleaned = text
    .replace(/^(\d+[\.\:\-\)]|\b(step|phase|item|layer)\s*\d+[\.\:\-]?|[•\-\*►])\s*/i, '')
    .trim();

  // If text repeats the slide title, generate distinctive concept names
  if (slideTitle && cleaned.toLowerCase().startsWith(slideTitle.toLowerCase().slice(0, 15))) {
    const concepts = ['Architectural Foundations', 'Execution & Pipeline', 'Deployment & Verification', 'Scale & Reliability'];
    return concepts[idx] ?? `Focus Area 0${idx + 1}`;
  }

  const words = cleaned.split(/\s+/).slice(0, 4).join(' ');
  if (!words || (slideTitle && words.toLowerCase() === slideTitle.toLowerCase())) {
    const defaults = ['System Overview', 'Core Processing', 'Operational Output', 'Validation & Telemetry'];
    return defaults[idx] ?? `Module 0${idx + 1}`;
  }
  return words;
}

function extractMetric(text: string | undefined): string | null {
  if (!text) return null;
  const match = text.match(/(\d+(?:\.\d+)?%|\d+\.\d+|\d{2,}(?:\s*(ms|s|kb|mb|gb))?)/i);
  return match ? match[0] : null;
}

function extractTopicTags(title: string, fullText: string): string[] {
  const tags: string[] = [];
  const lower = (title + ' ' + fullText.slice(0, 2000)).toLowerCase();
  if (lower.match(/\b(machine learning|neural|ai|deep learning|model|llm)\b/)) tags.push('Artificial Intelligence');
  if (lower.match(/\b(vision|image|camera|face|detection|recognition)\b/)) tags.push('Computer Vision');
  if (lower.match(/\b(edge|embedded|sensor|iot|hardware|controller)\b/)) tags.push('Edge Computing');
  if (lower.match(/\b(cloud|microservice|docker|kubernetes|api|backend)\b/)) tags.push('Cloud Architecture');
  if (lower.match(/\b(blockchain|distributed|decentralized|crypto)\b/)) tags.push('Distributed Systems');
  if (lower.match(/\b(data|analytics|dashboard|visualization|database)\b/)) tags.push('Data Engineering');
  if (lower.match(/\b(mobile|android|ios|app|flutter|react native)\b/)) tags.push('Mobile Development');
  if (tags.length === 0) tags.push('Engineering Research', 'System Analysis', 'Technical Study');
  return tags.slice(0, 4);
}

function purposeToInstitution(purpose: string): string {
  const map: Record<string, string> = {
    project_viva: 'Final Year Project Defense',
    seminar: 'Departmental Seminar',
    research: 'Research Presentation',
    assignment: 'Academic Assignment',
    business: 'Business Presentation',
    custom: 'Presentation',
  };
  return map[purpose] ?? 'Presentation';
}

function buildTitleSpeakerNotes(title: string, config: PresentationConfig, template: PresentationTemplate): string {
  return `Good day. Today we present "${title}" — a ${config.duration} ${config.purpose.replace('_', ' ')} formatted in ${template.name} design style. This work covers our core methodology, implementation architecture, and empirical findings.`;
}

function generateSpeakerNotes(sec: DocumentSection, docTitle: string, template: PresentationTemplate): string {
  const page = sec.pageNumbers[0] ?? 1;
  const toneIntro = template.family === 'academic_research'
    ? `As documented in our research paper`
    : template.family === 'future_tech'
    ? `The technical implementation demonstrates`
    : `Our analysis reveals`;
  return `${toneIntro}: "${sec.title}" on page ${page}. ${sec.keyPoints[0] ?? sec.content.slice(0, 100)}. This section directly supports our primary thesis within "${docTitle}".`;
}

function buildConclusionPoints(
  doc: DocumentAnalysis,
  lastSection: DocumentSection,
  config: PresentationConfig
): string[] {
  const raw = lastSection.keyPoints.length > 0
    ? lastSection.keyPoints.slice(0, 3)
    : [`Successfully implemented all core objectives of ${doc.title}.`];
  return [
    ...raw.map(p => toPresentationLanguage(p, 'academic')),
    config.purpose === 'project_viva'
      ? 'System validated against academic criteria — ready for deployment.'
      : 'All deliverables meet defined specifications and objectives.',
  ].slice(0, 4);
}

function generateVivaQuestions(doc: DocumentAnalysis): { q: string; a: string; badge: string }[] {
  const firstSec = doc.sections[0]?.title ?? 'Core Methodology';
  const secondSec = doc.sections[1]?.title ?? 'System Architecture';
  return [
    {
      q: `What is the theoretical justification for the methodology chosen in "${doc.title}"?`,
      a: `As detailed in our ${firstSec} section, the approach minimises empirical error rates by enforcing calibrated thresholding rather than heuristic matching.`,
      badge: 'Methodology',
    },
    {
      q: 'How does the system handle edge cases and environmental variance?',
      a: `Per ${secondSec}, we implemented normalised feature extraction and secondary verification to prevent failure under noisy inputs.`,
      badge: 'Reliability',
    },
    {
      q: 'What are the scalability constraints for production deployment?',
      a: 'The decoupled microservice design ensures local inference nodes remain independent of central server latency, enabling horizontal scaling.',
      badge: 'Scalability',
    },
  ];
}

function categorizeSection(title: string): string {
  const lower = title.toLowerCase();
  if (lower.match(/problem|challenge|gap|issue/)) return 'Problem Formulation';
  if (lower.match(/architect|design|system|infrastructure/)) return 'Architecture';
  if (lower.match(/result|benchmark|evaluation|metric/)) return 'Results & Evaluation';
  if (lower.match(/workflow|method|process|algorithm/)) return 'Methodology';
  if (lower.match(/introduction|overview|background|abstract/)) return 'Introduction';
  if (lower.match(/conclusion|summary|future/)) return 'Conclusion';
  return 'Technical Analysis';
}
