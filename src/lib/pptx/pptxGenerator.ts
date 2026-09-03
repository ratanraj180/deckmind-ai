import PptxGenJS from 'pptxgenjs';
import { PRESENTATION_TEMPLATES } from '@/lib/templates/templateData';
import { SlideData, TemplateSnapshot } from '@/types/presentation';

interface GeneratePptxInput {
  title: string;
  templateId: string;
  slides: SlideData[];
  config: Record<string, unknown>;
  templateSnapshot?: TemplateSnapshot;
}

// 16:9 standard slide dimensions in inches
const SLIDE_W = 10.0;
const SLIDE_H = 5.625;

/**
 * Ensures hex colors are valid 6-character hex strings without '#' or alpha channels.
 * PowerPoint OpenXML STRICTLY requires ST_HexColorRGB pattern: [0-9a-fA-F]{6}.
 * Any '#' or 8-digit alpha hex causes schema validation failure and prompts Repair!
 */
function cleanHex(color: string | undefined, fallback = '000000'): string {
  if (!color) return fallback;
  const clean = String(color).replace(/[^0-9A-Fa-f]/g, '').trim();
  if (clean.length >= 6) return clean.slice(0, 6).toUpperCase();
  return fallback;
}

/**
 * Maps fontMood to standard, universally available core fonts
 * present on 100% of Windows, macOS, and Office installations.
 */
function getFontFace(fontMood: string): string {
  switch (fontMood) {
    case 'editorial':
      return 'Georgia';
    case 'technical':
      return 'Consolas';
    case 'bold_display':
      return 'Trebuchet MS';
    case 'professional':
      return 'Arial';
    case 'clean_sans':
    default:
      return 'Calibri';
  }
}

export async function generatePptxFromProject(input: GeneratePptxInput): Promise<Buffer> {
  const { title, templateId, slides, templateSnapshot } = input;

  // 1. Resolve template configuration:
  // Prioritize templateSnapshot (the exact state captured when the presentation was generated in the UI),
  // then look up by templateId in the design gallery, then use clean fallback.
  const galleryTemplate = PRESENTATION_TEMPLATES.find(
    t => t.id === templateId || t.name.toLowerCase() === templateId?.toLowerCase()
  );

  const rawPalette = templateSnapshot?.palette ?? galleryTemplate?.palette ?? {
    primary: '#18181b',
    secondary: '#52525b',
    accent: '#2563eb',
    background: '#fafafa',
    text: '#18181b',
    cardBg: '#ffffff',
    border: '#e4e4e7',
    isDark: false,
  };

  const layoutStyle = templateSnapshot?.layoutStyle ?? galleryTemplate?.layoutStyle ?? 'bento-grid';
  const fontMood = templateSnapshot?.fontMood ?? galleryTemplate?.fontMood ?? 'clean_sans';
  const templateName = templateSnapshot?.name ?? galleryTemplate?.name ?? 'DeckMind Template';
  const designFamily = templateSnapshot?.family ?? galleryTemplate?.family ?? 'bento_grid';

  const fontFace = getFontFace(fontMood);

  // Clean all hex values for strict PowerPoint OpenXML compliance
  const palette = {
    background: cleanHex(rawPalette.background, 'FFFFFF'),
    text: cleanHex(rawPalette.text, '18181B'),
    primary: cleanHex(rawPalette.primary, '18181B'),
    secondary: cleanHex(rawPalette.secondary, '52525B'),
    accent: cleanHex(rawPalette.accent, '2563EB'),
    cardBg: cleanHex(rawPalette.cardBg, 'FFFFFF'),
    border: cleanHex(rawPalette.border, 'E4E4E7'),
    isDark: Boolean(rawPalette.isDark),
  };

  console.log(`[DeckMind PPTX Engine] ──────────────────────────────────────────`);
  console.log(`[DeckMind PPTX Engine] Title: "${title}" (${slides.length} slides)`);
  console.log(`[DeckMind PPTX Engine] Template: "${templateName}" (${templateId}) | Family: ${designFamily}`);
  console.log(`[DeckMind PPTX Engine] Layout: ${layoutStyle} | Font: ${fontFace} | DarkMode: ${palette.isDark}`);

  const pptx = new PptxGenJS();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = title || 'DeckMind Presentation';
  pptx.author = 'DeckMind AI';
  pptx.company = 'DeckMind AI';

  const layoutFamily = (templateSnapshot as any)?.layoutFamily ?? galleryTemplate?.layoutFamily ?? (
    layoutStyle === 'bento-grid' ? 'bento' :
    layoutStyle === 'asymmetric-grid' ? 'swiss-grid' :
    layoutStyle === 'apple-minimal' ? 'minimal' :
    layoutStyle === 'neo-brutalist' ? 'brutalist' :
    layoutStyle === 'cyber-tech' || layoutStyle === 'linear-dark' ? 'cyber' :
    layoutStyle === 'poster' ? 'poster' :
    layoutStyle === 'data-dashboard' ? 'dashboard' :
    layoutStyle === 'blueprint' ? 'blueprint' :
    layoutStyle === 'corporate-premium' ? 'corporate' :
    layoutStyle === 'bold-magazine' || layoutStyle === 'magazine' || layoutStyle === 'centered-editorial' ? 'editorial' :
    layoutStyle === 'split-hero' ? 'split-screen' :
    'bento'
  );

  // Layout mode flags
  const isSplitHero = layoutFamily === 'split-screen' || layoutStyle === 'split-hero';
  const isAsymmetric = layoutFamily === 'swiss-grid' || layoutStyle === 'asymmetric-grid';
  const isDarkImmersive = layoutFamily === 'cyber' || layoutStyle === 'linear-dark' || layoutStyle === 'cyber-tech';
  const isBlueprint = layoutFamily === 'blueprint' || layoutStyle === 'blueprint';
  const isCentered = layoutFamily === 'editorial' || layoutStyle === 'centered-editorial' || layoutStyle === 'academic-research';
  const isBento = layoutFamily === 'bento' || layoutStyle === 'bento-grid';
  const isBrutalist = layoutFamily === 'brutalist' || layoutStyle === 'neo-brutalist';
  const isApple = layoutFamily === 'minimal' || layoutStyle === 'apple-minimal';
  const isDataDash = layoutFamily === 'dashboard' || layoutStyle === 'data-dashboard';
  const isMagazine = layoutFamily === 'magazine' || layoutStyle === 'bold-magazine';
  const isPoster = layoutFamily === 'poster' || layoutStyle === 'poster';

  // Process each slide
  for (const slide of slides) {
    const pSlide = pptx.addSlide();

    // ── 1. Slide Background ────────────────────────────────
    pSlide.background = { fill: palette.background };

    // ── 2. Layout-specific Background Decorations ──────────
    if (isDarkImmersive) {
      // Sleek top glowing laser line
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: SLIDE_W,
        h: 0.08,
        fill: { color: palette.accent },
        line: { color: palette.accent, width: 0 },
      });
    } else if (isAsymmetric) {
      // Swiss red/accent vertical spine guide
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0.4,
        y: 0.35,
        w: 0.08,
        h: 4.8,
        fill: { color: palette.accent },
        line: { color: palette.accent, width: 0 },
      });
    } else if (isSplitHero) {
      // Left solid branding panel
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: 3.1,
        h: SLIDE_H,
        fill: { color: palette.primary },
        line: { color: palette.primary, width: 0 },
      });
      // Small vertical accent strip
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 3.05,
        y: 0,
        w: 0.05,
        h: SLIDE_H,
        fill: { color: palette.accent },
        line: { color: palette.accent, width: 0 },
      });
    } else if (isBlueprint) {
      // Top blueprint header line
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: 0,
        w: SLIDE_W,
        h: 0.06,
        fill: { color: palette.accent },
        line: { color: palette.accent, width: 0 },
      });
      pSlide.addText('// DECKMIND_AI // CAD_ENGINEERING_SCHEMATIC', {
        x: 0.5,
        y: 0.08,
        w: 4.5,
        h: 0.22,
        fontSize: 7.5,
        color: palette.accent,
        fontFace: 'Consolas',
      });
    } else if (isBrutalist) {
      // Bottom bold bar
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0,
        y: SLIDE_H - 0.1,
        w: SLIDE_W,
        h: 0.1,
        fill: { color: palette.primary },
        line: { color: palette.primary, width: 0 },
      });
    }

    // ── 3. Coordinate Systems & Usable Canvas Zones ─────────
    const contentX = isSplitHero ? 3.4 : isAsymmetric ? 0.7 : 0.6;
    const contentW = isSplitHero ? 6.1 : isAsymmetric ? 8.7 : 8.8;
    const contentY = 1.55;
    const contentH = 3.35; // Generous 3.35" height for rich vertical utilization!

    // ── Helper: Card Drawer with Neo-Brutalist shadow support ─
    const drawCard = (
      cX: number,
      cY: number,
      cW: number,
      cH: number,
      cardFill = palette.cardBg,
      cardBorder = palette.border
    ) => {
      if (isBrutalist) {
        // Offset black drop shadow box
        pSlide.addShape(pptx.ShapeType.rect, {
          x: cX + 0.07,
          y: cY + 0.07,
          w: cW,
          h: cH,
          fill: { color: '000000' },
          line: { color: '000000', width: 0 },
        });
        // Main sharp card with 2pt solid black outline
        pSlide.addShape(pptx.ShapeType.rect, {
          x: cX,
          y: cY,
          w: cW,
          h: cH,
          fill: { color: cardFill },
          line: { color: '000000', width: 2.0 },
        });
      } else {
        // Modern rounded card with clean border
        pSlide.addShape(pptx.ShapeType.roundRect, {
          x: cX,
          y: cY,
          w: cW,
          h: cH,
          fill: { color: cardFill },
          line: { color: cardBorder, width: isApple ? 0.5 : 0.75 },
        });

        // Top accent rule for linear-dark, bento, and aurora
        if (isDarkImmersive || isBento) {
          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: cX,
            y: cY,
            w: cW,
            h: 0.06,
            fill: { color: palette.accent },
            line: { color: palette.accent, width: 0 },
          });
        }
      }
    };

    // ── 4. Slide Title & Visual Hierarchy ───────────────────
    const isTitleSlide = slide.visualType === 'title';

    if (isTitleSlide) {
      // ════════════════════════════════════════════════════════
      // SLIDE 1: HERO TITLE SLIDE
      // ════════════════════════════════════════════════════════
      const contentObj = (slide.content as Record<string, unknown>) ?? {};
      const tags = (contentObj.tags as string[] | undefined) ?? ['DeckMind AI', 'Technical Defense'];
      const institution = (contentObj.institution as string | undefined) ?? 'Department of Computer Science';
      const authors = (contentObj.authors as string[] | undefined) ?? ['Project Team'];
      const authorText = authors.length > 0 ? authors.join('  •  ') : 'Project Author';

      if (isSplitHero) {
        // Split-Hero Title Slide
        pSlide.addText('PRESENTATION', {
          x: 0.4,
          y: 1.8,
          w: 2.3,
          h: 0.35,
          fontSize: 11,
          bold: true,
          color: palette.accent,
          fontFace,
        });
        pSlide.addText(slide.title || title, {
          x: 0.4,
          y: 2.2,
          w: 2.3,
          h: 2.5,
          fontSize: 20,
          bold: true,
          color: 'FFFFFF',
          fontFace,
        });

        // Right panel
        pSlide.addText('PROJECT DEFENSE & TECHNICAL SPECIFICATION', {
          x: 3.5,
          y: 1.2,
          w: 6.0,
          h: 0.3,
          fontSize: 9,
          bold: true,
          color: palette.accent,
          fontFace,
        });

        pSlide.addText(slide.subtitle ?? 'System Overview and Implementation Results', {
          x: 3.5,
          y: 1.6,
          w: 6.0,
          h: 1.0,
          fontSize: 14,
          color: palette.text,
          fontFace,
        });

        // Right Bento Summary Box
        drawCard(3.5, 2.8, 6.0, 1.8);
        pSlide.addText('EXECUTIVE SUMMARY & DELIVERABLES', {
          x: 3.8,
          y: 3.0,
          w: 5.4,
          h: 0.3,
          fontSize: 9.5,
          bold: true,
          color: palette.primary,
          fontFace,
        });
        pSlide.addText(authorText, {
          x: 3.8,
          y: 3.35,
          w: 5.4,
          h: 0.4,
          fontSize: 12,
          bold: true,
          color: palette.text,
          fontFace,
        });
        pSlide.addText(institution, {
          x: 3.8,
          y: 3.8,
          w: 5.4,
          h: 0.4,
          fontSize: 10,
          color: palette.secondary,
          fontFace,
        });

      } else {
        // Standard / Bento / Minimal / Brutalist Title Slide
        const titleAlign = isCentered ? 'center' : 'left';
        const titleY = isCentered ? 1.3 : 1.1;

        // Eyebrow Kicker Chip
        pSlide.addShape(pptx.ShapeType.roundRect, {
          x: isCentered ? (SLIDE_W - 2.8) / 2 : contentX,
          y: titleY - 0.45,
          w: 2.8,
          h: 0.32,
          fill: { color: palette.cardBg },
          line: { color: palette.accent, width: 0.75 },
        });
        pSlide.addText(templateName.toUpperCase(), {
          x: isCentered ? (SLIDE_W - 2.8) / 2 : contentX,
          y: titleY - 0.45,
          w: 2.8,
          h: 0.32,
          fontSize: 8.5,
          bold: true,
          color: palette.accent,
          align: 'center',
          fontFace,
        });

        // Main Title
        const titleFontSize = (slide.title || title).length > 50 ? 26 : 30;
        pSlide.addText(slide.title || title, {
          x: contentX,
          y: titleY,
          w: contentW,
          h: 1.4,
          fontSize: titleFontSize,
          bold: true,
          color: palette.primary,
          fontFace,
          align: titleAlign,
        });

        // Subtitle
        if (slide.subtitle) {
          pSlide.addText(slide.subtitle, {
            x: contentX,
            y: titleY + 1.45,
            w: contentW,
            h: 0.65,
            fontSize: 13,
            color: palette.secondary,
            fontFace,
            align: titleAlign,
          });
        }

        // Compact Tag Chips (Properly spaced so they never overflow!)
        const tagY = titleY + 2.25;
        const tagW = 1.9;
        const tagGap = 0.15;
        const displayTags = tags.slice(0, 4);

        displayTags.forEach((tag, idx) => {
          const tX = isCentered
            ? (SLIDE_W - (displayTags.length * tagW + (displayTags.length - 1) * tagGap)) / 2 + idx * (tagW + tagGap)
            : contentX + idx * (tagW + tagGap);

          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: tX,
            y: tagY,
            w: tagW,
            h: 0.32,
            fill: { color: palette.cardBg },
            line: { color: palette.border, width: 0.75 },
          });
          pSlide.addText(tag, {
            x: tX,
            y: tagY,
            w: tagW,
            h: 0.32,
            fontSize: 8.5,
            bold: true,
            color: palette.accent,
            align: 'center',
            fontFace,
          });
        });

        // Authors & Institution Footer Bar
        pSlide.addText(`${authorText}  •  ${institution}`, {
          x: contentX,
          y: 4.85,
          w: contentW,
          h: 0.35,
          fontSize: 10,
          bold: true,
          color: palette.secondary,
          fontFace,
          align: titleAlign,
        });
      }

    } else {
      // ════════════════════════════════════════════════════════
      // REGULAR CONTENT SLIDE HEADER
      // Visual Hierarchy: Kicker → Title → Subtitle
      // ════════════════════════════════════════════════════════
      const content = (slide.content as Record<string, unknown>) ?? {};
      const kicker = ((content.kicker as string | undefined) ?? slide.category ?? 'ANALYSIS').toUpperCase();

      // Eyebrow / Kicker Tag
      pSlide.addText(kicker, {
        x: contentX,
        y: 0.38,
        w: contentW,
        h: 0.24,
        fontSize: 8.5,
        bold: true,
        color: palette.accent,
        fontFace,
      });

      // Slide Title (Dynamic font size based on length)
      const titleLen = (slide.title || '').length;
      const titleSize = titleLen > 60 ? 18 : titleLen > 40 ? 20 : 22;

      pSlide.addText(slide.title, {
        x: contentX,
        y: 0.62,
        w: contentW,
        h: 0.55,
        fontSize: titleSize,
        bold: true,
        color: palette.primary,
        fontFace,
      });

      // Subtitle / Key Takeaway message
      const keyMessage = slide.subtitle ?? (content.keyTakeaway as string | undefined);
      if (keyMessage) {
        pSlide.addText(keyMessage, {
          x: contentX,
          y: 1.18,
          w: contentW,
          h: 0.32,
          fontSize: 11,
          color: palette.secondary,
          fontFace,
        });
      }

      // ── 5. Adaptive Full-Canvas Visual Body ──────────────────
      const bullets = (content.bullets as string[] | undefined) ?? [];
      const pillars = (content.pillars as { title: string; desc: string }[] | undefined) ?? [];
      const steps = (content.steps as { step: string; name: string; desc: string; tech?: string }[] | undefined) ?? [];
      const benchmarks = (content.benchmarks as { label: string; value: string; change: string }[] | undefined) ?? [];
      const milestones = (content.milestones as { phase: string; title: string; desc: string }[] | undefined) ?? [];
      const qaList = (content.qaList as { q: string; a: string; badge: string }[] | undefined) ?? [];
      const takeaways = (content.takeaways as string[] | undefined) ?? [];
      const layers = (content.layers as { name: string; node: string; details: string }[] | undefined) ?? [];
      const items = (content.items as { component: string; spec: string; cost: string }[] | undefined) ?? [];
      const rows = (content.rows as { aspect: string; before: string; after: string }[] | undefined) ?? [];
      const metrics = (content.metrics as { label: string; value: string; sub?: string }[] | undefined) ?? [];

      const visualType = slide.visualType;

      // ────────────────────────────────────────────────────────
      // CASE 0A: Agenda / Table of Contents
      // ────────────────────────────────────────────────────────
      if (visualType === 'agenda') {
        const agendaItems = (content.agenda as { number: string; title: string; time: string; tag?: string }[] | undefined) ?? [
          { number: '01', title: 'Problem Context & Operational Bottlenecks', time: '2 min', tag: 'Discovery' },
          { number: '02', title: 'Core Architectural Paradigm & Components', time: '3 min', tag: 'Design' },
          { number: '03', title: 'End-to-End Processing & Algorithmic Flow', time: '3 min', tag: 'Execution' },
          { number: '04', title: 'Empirical Verification & KPI Metrics', time: '2 min', tag: 'Validation' },
          { number: '05', title: 'Deployment Roadmap & Key Deliverables', time: '2 min', tag: 'Impact' },
        ];

        const itemH = (contentH - (agendaItems.length - 1) * 0.12) / agendaItems.length;

        agendaItems.forEach((item, idx) => {
          const itemY = contentY + idx * (itemH + 0.12);
          drawCard(contentX, itemY, contentW, itemH);

          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: contentX + 0.15,
            y: itemY + (itemH - 0.35) / 2,
            w: 0.5,
            h: 0.35,
            fill: { color: palette.accent },
            line: { color: palette.accent, width: 0 },
          });

          pSlide.addText(item.number || `0${idx + 1}`, {
            x: contentX + 0.15,
            y: itemY + (itemH - 0.35) / 2,
            w: 0.5,
            h: 0.35,
            fontSize: 10,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            fontFace,
          });

          pSlide.addText(item.title, {
            x: contentX + 0.8,
            y: itemY + 0.1,
            w: contentW - 2.2,
            h: itemH - 0.2,
            fontSize: 11,
            bold: true,
            color: palette.primary,
            fontFace,
          });

          pSlide.addText(item.time || `${idx + 1}m`, {
            x: contentX + contentW - 1.3,
            y: itemY + 0.1,
            w: 1.1,
            h: itemH - 0.2,
            fontSize: 9.5,
            bold: true,
            color: palette.secondary,
            align: 'right',
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 0B: Thank You / Closing Screen
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'thank_you') {
        const tW = contentW * 0.8;
        const tX = contentX + (contentW - tW) / 2;
        drawCard(tX, contentY + 0.3, tW, contentH - 0.6, palette.cardBg, palette.accent);

        pSlide.addText('PRESENTATION CONCLUSION', {
          x: tX + 0.5,
          y: contentY + 0.6,
          w: tW - 1.0,
          h: 0.3,
          fontSize: 10,
          bold: true,
          color: palette.accent,
          align: 'center',
          fontFace,
        });

        pSlide.addText('Thank You', {
          x: tX + 0.5,
          y: contentY + 1.1,
          w: tW - 1.0,
          h: 0.8,
          fontSize: 32,
          bold: true,
          color: palette.primary,
          align: 'center',
          fontFace,
        });

        pSlide.addText('Open for Technical Questions & Discussion', {
          x: tX + 0.5,
          y: contentY + 2.0,
          w: tW - 1.0,
          h: 0.4,
          fontSize: 13,
          color: palette.secondary,
          align: 'center',
          fontFace,
        });

      // ────────────────────────────────────────────────────────
      // CASE 1: Solution Pillars & Solution Hero
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'solution_pillars' || visualType === 'solution_hero' || pillars.length > 0) {
        if (isBento) {
          // Asymmetric Bento Grid Composition:
          // Left Hero Box (58% width, full height) + Right Stacked Boxes (39% width)
          const leftW = contentW * 0.58;
          const rightW = contentW * 0.39;
          const rightX = contentX + leftW + 0.25;

          const p1 = pillars[0] ?? { title: 'Primary Architecture Pillar', desc: bullets[0] ?? 'Core system foundation' };
          const p2 = pillars[1] ?? { title: 'Secondary Component', desc: bullets[1] ?? 'High performance execution' };
          const p3 = pillars[2] ?? { title: 'Operational Impact', desc: bullets[2] ?? 'Validated efficiency' };

          // Hero Bento Box
          drawCard(contentX, contentY, leftW, contentH);
          pSlide.addText('CORE CAPABILITY // BENTO SPEC', {
            x: contentX + 0.25,
            y: contentY + 0.15,
            w: leftW - 0.5,
            h: 0.25,
            fontSize: 8.5,
            bold: true,
            color: palette.accent,
            fontFace,
          });
          pSlide.addText(p1.title, {
            x: contentX + 0.25,
            y: contentY + 0.45,
            w: leftW - 0.5,
            h: 0.6,
            fontSize: 14,
            bold: true,
            color: palette.primary,
            fontFace,
          });
          pSlide.addText(p1.desc, {
            x: contentX + 0.25,
            y: contentY + 1.1,
            w: leftW - 0.5,
            h: contentH - 2.1,
            fontSize: 10.5,
            color: palette.text,
            fontFace,
            lineSpacingMultiple: 1.25,
          });

          // Stat callout pill at bottom of Hero Bento Box
          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: contentX + 0.25,
            y: contentY + contentH - 0.85,
            w: leftW - 0.5,
            h: 0.65,
            fill: { color: palette.background },
            line: { color: palette.border, width: 0.75 },
          });
          pSlide.addText(metrics[0]?.value ?? '99.4%', {
            x: contentX + 0.4,
            y: contentY + contentH - 0.82,
            w: 1.5,
            h: 0.6,
            fontSize: 18,
            bold: true,
            color: palette.accent,
            fontFace,
          });
          pSlide.addText(metrics[0]?.label ?? 'Benchmark Efficiency SLA', {
            x: contentX + 2.0,
            y: contentY + contentH - 0.8,
            w: leftW - 2.2,
            h: 0.55,
            fontSize: 9.5,
            bold: true,
            color: palette.secondary,
            fontFace,
          });

          // Right Stacked Bento Box 1
          const rightCardH = (contentH - 0.2) / 2;
          drawCard(rightX, contentY, rightW, rightCardH);
          pSlide.addText(p2.title, {
            x: rightX + 0.2,
            y: contentY + 0.12,
            w: rightW - 0.4,
            h: 0.3,
            fontSize: 11.5,
            bold: true,
            color: palette.primary,
            fontFace,
          });
          pSlide.addText(p2.desc, {
            x: rightX + 0.2,
            y: contentY + 0.45,
            w: rightW - 0.4,
            h: rightCardH - 0.55,
            fontSize: 9.8,
            color: palette.text,
            fontFace,
            lineSpacingMultiple: 1.2,
          });

          // Right Stacked Bento Box 2
          const right2Y = contentY + rightCardH + 0.2;
          drawCard(rightX, right2Y, rightW, rightCardH);
          pSlide.addText(p3.title, {
            x: rightX + 0.2,
            y: right2Y + 0.12,
            w: rightW - 0.4,
            h: 0.3,
            fontSize: 11.5,
            bold: true,
            color: palette.accent,
            fontFace,
          });
          pSlide.addText(p3.desc, {
            x: rightX + 0.2,
            y: right2Y + 0.45,
            w: rightW - 0.4,
            h: rightCardH - 0.55,
            fontSize: 9.8,
            color: palette.text,
            fontFace,
            lineSpacingMultiple: 1.2,
          });

        } else {
          // Standard 3 Vertical Pillars side-by-side
          const pillarList = pillars.length > 0 ? pillars.slice(0, 3) : bullets.slice(0, 3).map((b, i) => ({
            title: `Pillar 0${i + 1}`,
            desc: b,
          }));

          const colGap = 0.25;
          const colW = (contentW - (pillarList.length - 1) * colGap) / pillarList.length;

          pillarList.forEach((p, idx) => {
            const colX = contentX + idx * (colW + colGap);
            drawCard(colX, contentY, colW, contentH);

            // Number Badge
            pSlide.addText(`0${idx + 1}`, {
              x: colX + 0.2,
              y: contentY + 0.2,
              w: 1.0,
              h: 0.4,
              fontSize: 20,
              bold: true,
              color: palette.accent,
              fontFace,
            });

            // Pillar Title
            pSlide.addText(p.title, {
              x: colX + 0.2,
              y: contentY + 0.7,
              w: colW - 0.4,
              h: 0.6,
              fontSize: 13,
              bold: true,
              color: palette.primary,
              fontFace,
            });

            // Pillar Description
            pSlide.addText(p.desc, {
              x: colX + 0.2,
              y: contentY + 1.35,
              w: colW - 0.4,
              h: contentH - 1.55,
              fontSize: 10.5,
              color: palette.text,
              fontFace,
              lineSpacingMultiple: 1.25,
            });
          });
        }

      // ────────────────────────────────────────────────────────
      // CASE 2: Problem Comparison & Bottlenecks
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'problem_comparison' || visualType === 'problem_split') {
        const leftW = contentW * 0.56;
        const rightW = contentW * 0.40;
        const rightX = contentX + leftW + 0.3;

        // Left Side: 3 Challenge Cards
        const challengeList = bullets.length > 0 ? bullets.slice(0, 3) : ['Core systemic bottleneck identified'];
        const cardH = (contentH - (challengeList.length - 1) * 0.15) / challengeList.length;

        challengeList.forEach((ch, idx) => {
          const cY = contentY + idx * (cardH + 0.15);
          drawCard(contentX, cY, leftW, cardH);

          pSlide.addText(`CHALLENGE 0${idx + 1}`, {
            x: contentX + 0.2,
            y: cY + 0.12,
            w: leftW - 0.4,
            h: 0.25,
            fontSize: 8.5,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          pSlide.addText(ch, {
            x: contentX + 0.2,
            y: cY + 0.38,
            w: leftW - 0.4,
            h: cardH - 0.45,
            fontSize: 10.5,
            color: palette.text,
            fontFace,
            lineSpacingMultiple: 1.2,
          });
        });

        // Right Side: 3 Impact Metric Cards
        const metricList = metrics.length > 0 ? metrics.slice(0, 3) : [
          { label: 'Impact Severity', value: 'High' },
          { label: 'Scope', value: 'Pipeline' },
          { label: 'Resolution Status', value: 'Solved' },
        ];

        const mH = (contentH - (metricList.length - 1) * 0.15) / metricList.length;
        metricList.forEach((m, idx) => {
          const mY = contentY + idx * (mH + 0.15);
          drawCard(rightX, mY, rightW, mH);

          pSlide.addText(m.value, {
            x: rightX + 0.2,
            y: mY + 0.12,
            w: rightW - 0.4,
            h: 0.45,
            fontSize: 18,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          pSlide.addText(m.label, {
            x: rightX + 0.2,
            y: mY + 0.55,
            w: rightW - 0.4,
            h: mH - 0.6,
            fontSize: 9.5,
            color: palette.secondary,
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 3: System Architecture & Architecture Diagram
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'system_architecture' || visualType === 'architecture_diagram' || layers.length > 0) {
        const layerList = layers.length > 0 ? layers.slice(0, 4) : bullets.slice(0, 4).map((b, i) => ({
          name: `Layer 0${i + 1}`,
          node: `Component ${i + 1}`,
          details: b,
        }));

        const layerH = (contentH - (layerList.length - 1) * 0.15) / layerList.length;

        layerList.forEach((l, idx) => {
          const lY = contentY + idx * (layerH + 0.15);
          const isTop = idx === 0;
          const isBottom = idx === layerList.length - 1;

          drawCard(contentX, lY, contentW, layerH, palette.cardBg);

          // Left Node Badge
          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: contentX + 0.2,
            y: lY + 0.15,
            w: 1.8,
            h: layerH - 0.3,
            fill: { color: isTop || isBottom ? palette.primary : palette.background },
            line: { color: palette.border, width: 0.75 },
          });

          pSlide.addText(`${l.name}`, {
            x: contentX + 0.2,
            y: lY + 0.15,
            w: 1.8,
            h: layerH - 0.3,
            fontSize: 10,
            bold: true,
            color: isTop || isBottom ? 'FFFFFF' : palette.accent,
            align: 'center',
            fontFace,
          });

          // Component Node Title & Details
          pSlide.addText(l.node, {
            x: contentX + 2.2,
            y: lY + 0.12,
            w: contentW - 2.4,
            h: 0.3,
            fontSize: 12,
            bold: true,
            color: palette.primary,
            fontFace,
          });

          pSlide.addText(l.details, {
            x: contentX + 2.2,
            y: lY + 0.42,
            w: contentW - 2.4,
            h: layerH - 0.48,
            fontSize: 10,
            color: palette.text,
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 4: Workflow Pipeline / Process Flow
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'workflow_pipeline' || visualType === 'process_flow' || visualType === 'process' || steps.length > 0) {
        const stepList = steps.length > 0 ? steps.slice(0, 4) : bullets.slice(0, 4).map((b, i) => ({
          step: `${i + 1}`,
          name: `Phase 0${i + 1}`,
          desc: b,
        }));

        const stepH = (contentH - (stepList.length - 1) * 0.15) / stepList.length;

        stepList.forEach((s, idx) => {
          const sY = contentY + idx * (stepH + 0.15);
          drawCard(contentX, sY, contentW, stepH);

          // Step Circle Badge
          pSlide.addShape(pptx.ShapeType.ellipse, {
            x: contentX + 0.2,
            y: sY + (stepH - 0.45) / 2,
            w: 0.45,
            h: 0.45,
            fill: { color: palette.accent },
            line: { color: palette.accent, width: 0 },
          });

          pSlide.addText(s.step, {
            x: contentX + 0.2,
            y: sY + (stepH - 0.45) / 2,
            w: 0.45,
            h: 0.45,
            fontSize: 11,
            bold: true,
            color: 'FFFFFF',
            align: 'center',
            fontFace,
          });

          // Step Title
          pSlide.addText(s.name, {
            x: contentX + 0.8,
            y: sY + 0.1,
            w: contentW - 1.0,
            h: 0.28,
            fontSize: 11.5,
            bold: true,
            color: palette.primary,
            fontFace,
          });

          // Step Description
          pSlide.addText(s.desc, {
            x: contentX + 0.8,
            y: sY + 0.38,
            w: contentW - 1.0,
            h: stepH - 0.44,
            fontSize: 9.8,
            color: palette.text,
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 5: Results, Charts & KPI Dashboard
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'results_charts' || visualType === 'statistics' || visualType === 'kpi_dashboard' || benchmarks.length > 0) {
        const benchList = benchmarks.length > 0 ? benchmarks.slice(0, 3) : [
          { label: 'Empirical Accuracy', value: '99.4%', change: 'Validation ROC AUC 0.998' },
          { label: 'Inference Latency', value: '42ms', change: 'FP16 TensorRT Engine' },
          { label: 'False Accept Rate', value: '0.001%', change: 'Zero False Approvals' },
        ];

        // Top Row: 3 Massive Stat Cards
        const topH = 1.6;
        const cardGap = 0.25;
        const cardW = (contentW - (benchList.length - 1) * cardGap) / benchList.length;

        benchList.forEach((b, idx) => {
          const cardX = contentX + idx * (cardW + cardGap);
          drawCard(cardX, contentY, cardW, topH);

          pSlide.addText(b.value, {
            x: cardX + 0.1,
            y: contentY + 0.15,
            w: cardW - 0.2,
            h: 0.65,
            fontSize: 28,
            bold: true,
            color: palette.accent,
            align: 'center',
            fontFace,
          });

          pSlide.addText(b.label, {
            x: cardX + 0.1,
            y: contentY + 0.8,
            w: cardW - 0.2,
            h: 0.3,
            fontSize: 10,
            bold: true,
            color: palette.primary,
            align: 'center',
            fontFace,
          });

          pSlide.addText(b.change, {
            x: cardX + 0.1,
            y: contentY + 1.15,
            w: cardW - 0.2,
            h: 0.35,
            fontSize: 8.5,
            color: palette.secondary,
            align: 'center',
            fontFace,
          });
        });

        // Bottom Row: Findings Breakdown Card filling the rest of the canvas!
        const bottomY = contentY + topH + 0.2;
        const bottomH = contentH - topH - 0.2;
        drawCard(contentX, bottomY, contentW, bottomH);

        const findingsBullets = bullets.length > 0 ? bullets.slice(0, 3) : [
          'Empirical benchmarks confirm statistically significant improvements over baseline models.',
          'Execution latency meets real-time SLA thresholds across all operational test conditions.',
        ];

        const bulletData = findingsBullets.map(b => ({
          text: b,
          options: {
            bullet: true,
            color: palette.text,
            fontSize: 10.5,
            fontFace,
          },
        }));

        pSlide.addText(bulletData, {
          x: contentX + 0.3,
          y: bottomY + 0.15,
          w: contentW - 0.6,
          h: bottomH - 0.3,
          lineSpacingMultiple: 1.25,
          paraSpaceBefore: 6,
        });

      // ────────────────────────────────────────────────────────
      // CASE 6: Tech Ecosystem, Hardware BOM & Comparison Tables
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'hardware_table' || visualType === 'tech_ecosystem' || visualType === 'comparison' || visualType === 'comparison_table' || items.length > 0 || rows.length > 0) {
        let tableRows: { text: string; options?: Record<string, unknown> }[][] = [];
        let colWidths: number[] = [];

        if (items.length > 0) {
          colWidths = [contentW * 0.32, contentW * 0.48, contentW * 0.20];
          tableRows.push([
            { text: 'Component Node', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
            { text: 'Technical Specification', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
            { text: 'Unit Cost / Status', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
          ]);
          items.slice(0, 4).forEach((it, idx) => {
            const rowFill = idx % 2 === 0 ? palette.cardBg : palette.background;
            tableRows.push([
              { text: it.component, options: { fill: rowFill, color: palette.text, bold: true } },
              { text: it.spec, options: { fill: rowFill, color: palette.text } },
              { text: it.cost, options: { fill: rowFill, color: palette.accent, bold: true } },
            ]);
          });
        } else if (rows.length > 0) {
          colWidths = [contentW * 0.28, contentW * 0.36, contentW * 0.36];
          tableRows.push([
            { text: 'Dimension', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
            { text: 'Traditional Baseline', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
            { text: 'Proposed System', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
          ]);
          rows.slice(0, 4).forEach((r, idx) => {
            const rowFill = idx % 2 === 0 ? palette.cardBg : palette.background;
            tableRows.push([
              { text: r.aspect, options: { fill: rowFill, color: palette.text, bold: true } },
              { text: r.before, options: { fill: rowFill, color: palette.secondary } },
              { text: r.after, options: { fill: rowFill, color: palette.text, bold: true } },
            ]);
          });
        } else {
          colWidths = [contentW * 0.3, contentW * 0.7];
          tableRows.push([
            { text: 'Evaluation Dimension', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
            { text: 'Implementation Specification', options: { bold: true, fill: palette.primary, color: 'FFFFFF' } },
          ]);
          bullets.slice(0, 4).forEach((b, idx) => {
            const rowFill = idx % 2 === 0 ? palette.cardBg : palette.background;
            tableRows.push([
              { text: `Metric 0${idx + 1}`, options: { fill: rowFill, color: palette.text, bold: true } },
              { text: b, options: { fill: rowFill, color: palette.text } },
            ]);
          });
        }

        const tableH = 2.4;
        pSlide.addTable(tableRows, {
          x: contentX,
          y: contentY,
          w: contentW,
          colW: colWidths,
          border: { pt: 0.75, color: palette.border },
          fontSize: 10,
          fontFace,
        });

        // Summary Takeaway Banner below table
        const summaryY = contentY + tableH + 0.15;
        const summaryH = contentH - tableH - 0.15;
        drawCard(contentX, summaryY, contentW, summaryH);
        pSlide.addText('HARDWARE FEASIBILITY & DEPLOYMENT TAKEAWAY', {
          x: contentX + 0.3,
          y: summaryY + 0.12,
          w: contentW - 0.6,
          h: 0.22,
          fontSize: 8.5,
          bold: true,
          color: palette.accent,
          fontFace,
        });
        pSlide.addText('Complete bill of materials is cost-effective and optimized for edge computational deployment.', {
          x: contentX + 0.3,
          y: summaryY + 0.36,
          w: contentW - 0.6,
          h: 0.35,
          fontSize: 10,
          color: palette.text,
          fontFace,
        });

      // ────────────────────────────────────────────────────────
      // CASE 7: Viva Defense Examination Q&A
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'viva_defense' || qaList.length > 0) {
        const displayQa = qaList.length > 0 ? qaList.slice(0, 3) : [
          { q: 'What is the primary contribution of this work?', a: 'Demonstrating sub-50ms inference on low-power edge nodes with zero false acceptances.' },
          { q: 'How does the architecture mitigate spoofing?', a: 'By utilizing multi-frame temporal consensus and liveness verification layers.' },
        ];

        const qaH = (contentH - (displayQa.length - 1) * 0.18) / displayQa.length;

        displayQa.forEach((qa, idx) => {
          const qaY = contentY + idx * (qaH + 0.18);
          drawCard(contentX, qaY, contentW, qaH);

          // Question badge
          pSlide.addText(`EXAMINATION QUERY 0${idx + 1}: ${qa.q}`, {
            x: contentX + 0.25,
            y: qaY + 0.12,
            w: contentW - 0.5,
            h: 0.32,
            fontSize: 11,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          // Answer text
          pSlide.addText(`Defense: ${qa.a}`, {
            x: contentX + 0.25,
            y: qaY + 0.48,
            w: contentW - 0.5,
            h: qaH - 0.55,
            fontSize: 10,
            color: palette.text,
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 8: Roadmap & Milestones Timeline
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'roadmap' || visualType === 'timeline' || visualType === 'timeline_roadmap' || milestones.length > 0) {
        const mList = milestones.length > 0 ? milestones.slice(0, 4) : bullets.slice(0, 4).map((b, i) => ({
          phase: `Phase 0${i + 1}`,
          title: `Milestone ${i + 1}`,
          desc: b,
        }));

        const mH = (contentH - (mList.length - 1) * 0.15) / mList.length;

        mList.forEach((m, idx) => {
          const mY = contentY + idx * (mH + 0.15);
          drawCard(contentX, mY, contentW, mH);

          pSlide.addShape(pptx.ShapeType.roundRect, {
            x: contentX + 0.2,
            y: mY + 0.12,
            w: 1.2,
            h: mH - 0.24,
            fill: { color: idx === 0 ? palette.accent : palette.background },
            line: { color: palette.border, width: 0.75 },
          });

          pSlide.addText(m.phase, {
            x: contentX + 0.2,
            y: mY + 0.12,
            w: 1.2,
            h: mH - 0.24,
            fontSize: 10,
            bold: true,
            color: idx === 0 ? 'FFFFFF' : palette.accent,
            align: 'center',
            fontFace,
          });

          pSlide.addText(m.title, {
            x: contentX + 1.6,
            y: mY + 0.1,
            w: contentW - 1.8,
            h: 0.28,
            fontSize: 11.5,
            bold: true,
            color: palette.primary,
            fontFace,
          });

          pSlide.addText(m.desc, {
            x: contentX + 1.6,
            y: mY + 0.38,
            w: contentW - 1.8,
            h: mH - 0.44,
            fontSize: 9.8,
            color: palette.text,
            fontFace,
          });
        });

      // ────────────────────────────────────────────────────────
      // CASE 9: Conclusion & Final Deliverables
      // ────────────────────────────────────────────────────────
      } else if (visualType === 'conclusion' || visualType === 'conclusion_bold' || takeaways.length > 0) {
        const displayTakeaways = takeaways.length > 0 ? takeaways.slice(0, 4) : bullets.slice(0, 4);

        const leftW = contentW * 0.60;
        const rightW = contentW * 0.36;
        const rightX = contentX + leftW + 0.25;

        // Left Card: Core Deliverables Checkmarks
        drawCard(contentX, contentY, leftW, contentH);

        pSlide.addText('CORE CONTRIBUTIONS & DELIVERABLES', {
          x: contentX + 0.3,
          y: contentY + 0.2,
          w: leftW - 0.6,
          h: 0.3,
          fontSize: 11,
          bold: true,
          color: palette.primary,
          fontFace,
        });

        const takeawayItems = displayTakeaways.map(t => ({
          text: t,
          options: {
            bullet: true,
            color: palette.text,
            fontSize: 10.5,
            fontFace,
          },
        }));

        pSlide.addText(takeawayItems, {
          x: contentX + 0.3,
          y: contentY + 0.65,
          w: leftW - 0.6,
          h: contentH - 0.85,
          lineSpacingMultiple: 1.3,
          paraSpaceBefore: 8,
        });

        // Right Card: Thank You Banner
        drawCard(rightX, contentY, rightW, contentH, palette.primary);

        pSlide.addText('DECKMIND AI', {
          x: rightX + 0.3,
          y: contentY + 0.6,
          w: rightW - 0.6,
          h: 0.3,
          fontSize: 10,
          bold: true,
          color: palette.accent,
          align: 'center',
          fontFace,
        });

        pSlide.addText('Thank You', {
          x: rightX + 0.3,
          y: contentY + 1.1,
          w: rightW - 0.6,
          h: 0.8,
          fontSize: 26,
          bold: true,
          color: 'FFFFFF',
          align: 'center',
          fontFace,
        });

        pSlide.addText('Open for Examiner Questions & Viva Defense', {
          x: rightX + 0.3,
          y: contentY + 2.0,
          w: rightW - 0.6,
          h: 0.6,
          fontSize: 11,
          color: 'E2E8F0',
          align: 'center',
          fontFace,
        });

      // ────────────────────────────────────────────────────────
      // CASE 10: Adaptive Content (Short vs Medium vs Long)
      // ────────────────────────────────────────────────────────
      } else {
        const pointCount = bullets.length;

        if (pointCount <= 2) {
          // ── SHORT CONTENT: Hero Statement + Highlight Stat Card ──
          const heroH = 1.8;
          const heroText = bullets[0] ?? slide.subtitle ?? 'Primary thesis contribution.';

          drawCard(contentX, contentY, contentW, heroH);

          // Accent quote bar
          pSlide.addShape(pptx.ShapeType.rect, {
            x: contentX,
            y: contentY,
            w: 0.1,
            h: heroH,
            fill: { color: palette.accent },
            line: { color: palette.accent, width: 0 },
          });

          pSlide.addText('CORE THESIS STATEMENT', {
            x: contentX + 0.35,
            y: contentY + 0.2,
            w: contentW - 0.6,
            h: 0.3,
            fontSize: 9.5,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          pSlide.addText(`"${heroText}"`, {
            x: contentX + 0.35,
            y: contentY + 0.55,
            w: contentW - 0.6,
            h: heroH - 0.7,
            fontSize: 15,
            bold: true,
            color: palette.primary,
            fontFace,
            lineSpacingMultiple: 1.25,
          });

          // Secondary Card filling the lower canvas
          const subY = contentY + heroH + 0.2;
          const subH = contentH - heroH - 0.2;
          drawCard(contentX, subY, contentW, subH);

          pSlide.addText('KEY SUPPORTING CONTEXT', {
            x: contentX + 0.3,
            y: subY + 0.15,
            w: contentW - 0.6,
            h: 0.25,
            fontSize: 9,
            bold: true,
            color: palette.secondary,
            fontFace,
          });

          pSlide.addText(bullets[1] ?? 'Validated against rigorous empirical testing and architectural specifications.', {
            x: contentX + 0.3,
            y: subY + 0.42,
            w: contentW - 0.6,
            h: subH - 0.55,
            fontSize: 11,
            color: palette.text,
            fontFace,
          });

        } else if (pointCount <= 4) {
          // ── MEDIUM CONTENT: Multi-Card Deck ──
          const cardH = (contentH - (pointCount - 1) * 0.15) / pointCount;

          bullets.forEach((b, idx) => {
            const cY = contentY + idx * (cardH + 0.15);
            drawCard(contentX, cY, contentW, cardH);

            pSlide.addText(`0${idx + 1}`, {
              x: contentX + 0.2,
              y: cY + 0.1,
              w: 0.5,
              h: cardH - 0.2,
              fontSize: 13,
              bold: true,
              color: palette.accent,
              fontFace,
            });

            pSlide.addText(b, {
              x: contentX + 0.8,
              y: cY + 0.1,
              w: contentW - 1.0,
              h: cardH - 0.2,
              fontSize: 11,
              color: palette.text,
              fontFace,
              lineSpacingMultiple: 1.2,
            });
          });

        } else {
          // ── LONG CONTENT: Balanced 2-Column Cards ──
          const colW = (contentW - 0.3) / 2;
          const rightX = contentX + colW + 0.3;

          const mid = Math.ceil(pointCount / 2);
          const col1 = bullets.slice(0, mid);
          const col2 = bullets.slice(mid);

          // Left column
          drawCard(contentX, contentY, colW, contentH);
          pSlide.addText('PRIMARY OBSERVATIONS', {
            x: contentX + 0.25,
            y: contentY + 0.15,
            w: colW - 0.5,
            h: 0.25,
            fontSize: 9,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          const items1 = col1.map(p => ({
            text: p,
            options: { bullet: true, color: palette.text, fontSize: 10.5, fontFace },
          }));
          pSlide.addText(items1, {
            x: contentX + 0.25,
            y: contentY + 0.45,
            w: colW - 0.5,
            h: contentH - 0.6,
            lineSpacingMultiple: 1.25,
            paraSpaceBefore: 6,
          });

          // Right column
          drawCard(rightX, contentY, colW, contentH);
          pSlide.addText('SUPPORTING FINDINGS', {
            x: rightX + 0.25,
            y: contentY + 0.15,
            w: colW - 0.5,
            h: 0.25,
            fontSize: 9,
            bold: true,
            color: palette.accent,
            fontFace,
          });

          const items2 = col2.map(p => ({
            text: p,
            options: { bullet: true, color: palette.text, fontSize: 10.5, fontFace },
          }));
          pSlide.addText(items2, {
            x: rightX + 0.25,
            y: contentY + 0.45,
            w: colW - 0.5,
            h: contentH - 0.6,
            lineSpacingMultiple: 1.25,
            paraSpaceBefore: 6,
          });
        }
      }
    }

    // ── 6. Slide Footer & Metadata (Clean Safe Zone) ─────────
    // Left footer: Template name & family tag
    pSlide.addText(`${templateName.toUpperCase()}  //  ${designFamily.replace('_', ' ').toUpperCase()}`, {
      x: contentX,
      y: 5.18,
      w: 4.5,
      h: 0.26,
      fontSize: 8,
      bold: true,
      color: palette.border,
      fontFace,
    });

    // Right footer: Slide Number badge
    pSlide.addText(String(slide.slideNumber), {
      x: SLIDE_W - 1.2,
      y: 5.18,
      w: 0.6,
      h: 0.26,
      fontSize: 9,
      bold: true,
      color: palette.secondary,
      fontFace,
      align: 'right',
    });

    // ── 7. Native Speaker Notes ──────────────────────────────
    if (slide.speakerNotes) {
      pSlide.addNotes(slide.speakerNotes);
    }
  }

  // Generate binary buffer
  const buffer = (await pptx.write({ outputType: 'nodebuffer' })) as Buffer;
  console.log(`[DeckMind PPTX Engine] ✓ Generated ${buffer.length} bytes for template "${templateName}"`);
  console.log(`[DeckMind PPTX Engine] ──────────────────────────────────────────`);
  return buffer;
}
