export type PresentationPurpose =
  | 'project_viva'
  | 'seminar'
  | 'research'
  | 'assignment'
  | 'business'
  | 'custom';

export type AudienceType =
  | 'professor'
  | 'students'
  | 'clients'
  | 'investors'
  | 'general';

export type PresentationDuration = '5m' | '10m' | '15m' | '20m';

export type SlideCountOption = 'ai_decide' | '5' | '10' | '15' | '20';

export type VisualStyle = 'minimal' | 'professional' | 'modern' | 'creative';

export type ColorTheme =
  | 'classic_blue'
  | 'midnight'
  | 'emerald'
  | 'warm_minimal'
  | 'monochrome';

export type ContentDensity = 'concise' | 'balanced' | 'detailed';

export type VisualIntensity = 'minimal' | 'balanced' | 'visual_rich';

export interface UploadedDocument {
  id: string;
  name: string;
  size: number;
  type: 'pdf' | 'docx' | 'txt';
  pages?: number;
  uploadedAt: string;
}

export interface PresentationConfig {
  purpose: PresentationPurpose;
  audience: AudienceType;
  duration: PresentationDuration;
  slideCount: SlideCountOption;
  style: VisualStyle;
  colorTheme: ColorTheme;
  density: ContentDensity;
  visualIntensity: VisualIntensity;
  templateId?: string;
  customInstructions?: string;
}

export type SlideVisualType =
  | 'title'
  | 'agenda'
  | 'problem_split'
  | 'solution_hero'
  | 'architecture_diagram'
  | 'process_flow'
  | 'comparison_table'
  | 'kpi_dashboard'
  | 'tech_ecosystem'
  | 'timeline_roadmap'
  | 'research_evidence'
  | 'viva_defense'
  | 'quote_statement'
  | 'conclusion_bold'
  | 'thank_you'
  // Backward compatibility aliases:
  | 'section'
  | 'bullets'
  | 'comparison'
  | 'process'
  | 'timeline'
  | 'statistics'
  | 'quote'
  | 'problem_comparison'
  | 'solution_pillars'
  | 'system_architecture'
  | 'workflow_pipeline'
  | 'results_charts'
  | 'hardware_table'
  | 'roadmap'
  | 'conclusion';

export interface SlideData {
  id: number;
  slideNumber: number;
  title: string;
  subtitle?: string;
  visualType: SlideVisualType;
  category: string;
  content: Record<string, unknown>;
  speakerNotes: string;
  durationSeconds: number;
  // Template metadata embedded in every slide for rendering fidelity
  templateId: string;
  templateFamily: string;
  layoutStyle: string;
  // Dynamic layout selection system attributes:
  layoutId?: string;
  layoutFamily?: string;
  backgroundVariant?: string;
  colorVariant?: string;
  visualStrategy?: string;
}

export interface TemplateSnapshot {
  id: string;
  name: string;
  family: string;
  layoutStyle: string;
  fontMood: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    cardBg: string;
    border: string;
    isDark: boolean;
  };
}

export interface PresentationProject {
  id: string;
  title: string;
  description: string;
  document: UploadedDocument;
  config: PresentationConfig;
  slides: SlideData[];
  // Snapshot of the selected template at generation time — never lost
  template: TemplateSnapshot;
  createdAt: string;
  updatedAt: string;
  isPaid?: boolean;
}
