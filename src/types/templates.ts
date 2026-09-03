export type DesignFamilyId =
  | 'apple_minimal'
  | 'linear_dark'
  | 'bento_grid'
  | 'neo_brutalist'
  | 'swiss_editorial'
  | 'vercel_mono'
  | 'future_tech'
  | 'academic_research'
  | 'data_storytelling'
  | 'startup_product'
  | 'aurora_gradient'
  | 'bold_magazine'
  | 'corporate_premium'
  | 'luxury_black'
  | 'google_editorial'
  | 'soft_pastel'
  | 'creative_portfolio'
  | 'engineering_blueprint'
  | 'timeline_story'
  | 'minimal_bw'
  | 'warm_editorial'
  | 'playful_creative'
  | 'poster_style'
  | 'memphis_pop'
  | 'retro_modern'
  | 'isometric_tech'
  | 'bold_typography'
  | 'split_screen'
  | 'card_stack'
  | 'floating_canvas'
  | 'gradient_mesh'
  | 'glass_aurora'
  // Backwards compatibility aliases:
  | 'modern_corporate'
  | 'bold_creative'
  | 'luxury_editorial'
  | 'organic_soft'
  | 'magazine_story'
  | 'minimal_premium';

export type TemplateCategory =
  | 'Featured'
  | 'Minimal'
  | 'Professional'
  | 'Modern'
  | 'Technology'
  | 'Creative'
  | 'Academic'
  | 'Data'
  | 'Premium';

export type FontMood =
  | 'clean_sans'
  | 'editorial'
  | 'professional'
  | 'technical'
  | 'bold_display';

export type LayoutStyle =
  | 'apple-minimal'
  | 'linear-dark'
  | 'bento-grid'
  | 'neo-brutalist'
  | 'asymmetric-grid'
  | 'cyber-tech'
  | 'academic-research'
  | 'data-dashboard'
  | 'split-hero'
  | 'aurora-gradient'
  | 'bold-magazine'
  | 'corporate-premium'
  | 'blueprint'
  | 'centered-editorial'
  | 'dark-immersive'
  | 'minimal-canvas'
  | 'organic-flow'
  | 'poster'
  | 'magazine';

export type LayoutFamily =
  | 'bento'
  | 'swiss-grid'
  | 'minimal'
  | 'brutalist'
  | 'cyber'
  | 'poster'
  | 'dashboard'
  | 'split-screen'
  | 'magazine'
  | 'editorial'
  | 'timeline'
  | 'blueprint'
  | 'corporate'
  | 'memphis'
  | 'card-stack'
  | 'floating'
  | 'isometric'
  | 'gradient-mesh';

export type SlideComposition =
  | 'modular-grid'
  | 'asymmetric-split'
  | 'hero-focused'
  | 'deck-columns'
  | 'kpi-first'
  | 'linear-flow'
  | 'split-50-50'
  | 'editorial-columns'
  | 'schematic-grid'
  | 'poster-headline';

export type ShapeLanguage =
  | 'sharp-corners'
  | 'rounded-sm'
  | 'rounded-xl'
  | 'rounded-full-pills'
  | 'brutalist-solid'
  | 'chamfered-hud';

export type SpacingSystem =
  | 'airy-generous'
  | 'compact-dense'
  | 'balanced'
  | 'asymmetric-gutters';

export type TitlePosition =
  | 'top-left'
  | 'centered'
  | 'split-left-hero'
  | 'bottom-anchor'
  | 'poster-oversized';

export type CardStyle =
  | 'subtle-fill'
  | 'hard-border-shadow'
  | 'elevated-dark-glow'
  | 'frosted-glass'
  | 'outline-only'
  | 'minimal-flat'
  | 'gradient-mesh';

export type VisualStyle =
  | 'clean'
  | 'glow'
  | 'brutalist'
  | 'retro'
  | 'glassmorphic'
  | 'schematic'
  | 'editorial';

export interface TemplateColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  cardBg: string;
  border: string;
  isDark: boolean;
}

export interface PresentationTemplate {
  id: string;
  name: string;
  family: DesignFamilyId;
  category: TemplateCategory;
  description: string;
  bestFor: string[];
  palette: TemplateColorPalette;
  fontMood: FontMood;
  layoutStyle: LayoutStyle;
  layoutFamily?: LayoutFamily;
  slideComposition?: SlideComposition;
  shapeLanguage?: ShapeLanguage;
  spacingSystem?: SpacingSystem;
  titlePosition?: TitlePosition;
  cardStyle?: CardStyle;
  visualStyle?: VisualStyle;
  chartStyle?: string;
  diagramStyle?: string;
  imageTreatment?: string;
  decorationElements?: string[];
  isFeatured?: boolean;
  previewSnippet: {
    title: string;
    subtitle: string;
    tag: string;
    statValue?: string;
    statLabel?: string;
  };
}
