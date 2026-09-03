'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  UploadedDocument,
  PresentationConfig,
  PresentationProject,
  SlideData,
} from '@/types/presentation';
import { DocumentAnalysis } from '@/types/document';
import { PresentationTemplate } from '@/types/templates';
import { PRESENTATION_TEMPLATES } from '@/lib/templates/templateData';
import { generatePresentationFromDocument } from '@/lib/engine/presentationGenerator';
import { createSampleDocumentAnalysis } from '@/lib/parser/clientParser';
import {
  DEFAULT_CONFIG,
  MOCK_PROJECT,
  RECENT_PRESENTATIONS,
} from '@/lib/mockData';

interface PresentationContextType {
  document: UploadedDocument | null;
  setDocument: (doc: UploadedDocument | null) => void;
  documentAnalysis: DocumentAnalysis | null;
  setDocumentAnalysis: (doc: DocumentAnalysis | null) => void;
  config: PresentationConfig;
  setConfig: React.Dispatch<React.SetStateAction<PresentationConfig>>;
  updateConfig: <K extends keyof PresentationConfig>(key: K, value: PresentationConfig[K]) => void;
  selectedTemplate: PresentationTemplate;
  setSelectedTemplate: (tpl: PresentationTemplate) => void;
  activeProject: PresentationProject;
  setActiveProject: (project: PresentationProject) => void;
  currentSlideIndex: number;
  setCurrentSlideIndex: (index: number) => void;
  currentSlide: SlideData;
  recentPresentations: PresentationProject[];
  selectRecentProject: (projectId: string) => void;
  generateProjectFromCurrentDocument: () => PresentationProject;
  loadSampleDocument: () => void;
}

const PresentationContext = createContext<PresentationContextType | undefined>(undefined);

const STORAGE_KEY_DOC      = 'deckmind_uploaded_doc';
const STORAGE_KEY_CONFIG   = 'deckmind_config';
const STORAGE_KEY_ANALYSIS = 'deckmind_doc_analysis';
const STORAGE_KEY_TEMPLATE = 'deckmind_selected_template_id';
const STORAGE_KEY_PROJECT  = 'deckmind_active_project';

function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeSet(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    console.warn(`[DeckMind Storage] Could not persist "${key}"`);
  }
}

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  // ── Document metadata ──────────────────────────────────────
  const [document, setDocumentState] = useState<UploadedDocument | null>(
    () => safeGet<UploadedDocument | null>(STORAGE_KEY_DOC, null)
  );

  // ── Real document analysis ─────────────────────────────────
  const [documentAnalysis, setDocumentAnalysisState] = useState<DocumentAnalysis | null>(
    () => safeGet<DocumentAnalysis | null>(STORAGE_KEY_ANALYSIS, null)
  );

  // ── Presentation configuration ─────────────────────────────
  const [config, setConfig] = useState<PresentationConfig>(
    () => safeGet<PresentationConfig>(STORAGE_KEY_CONFIG, DEFAULT_CONFIG)
  );

  // ── Selected template — stored as full object ──────────────
  const [selectedTemplate, setSelectedTemplateState] = useState<PresentationTemplate>(() => {
    if (typeof window === 'undefined') return PRESENTATION_TEMPLATES[0];
    const savedFull = safeGet<PresentationTemplate | null>('deckmind_selected_template_full', null);
    if (savedFull && savedFull.id && savedFull.palette) return savedFull;
    const savedId = sessionStorage.getItem(STORAGE_KEY_TEMPLATE);
    if (savedId) {
      const found = PRESENTATION_TEMPLATES.find(t => t.id === savedId);
      if (found) return found;
    }
    return PRESENTATION_TEMPLATES[0];
  });

  // ── Active project ─────────────────────────────────────────
  const [activeProject, setActiveProjectState] = useState<PresentationProject>(
    () => safeGet<PresentationProject>(STORAGE_KEY_PROJECT, MOCK_PROJECT)
  );

  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [recentPresentations] = useState<PresentationProject[]>(RECENT_PRESENTATIONS);

  // ── Sync to sessionStorage ─────────────────────────────────
  useEffect(() => {
    if (document) safeSet(STORAGE_KEY_DOC, document);
    else sessionStorage.removeItem(STORAGE_KEY_DOC);
  }, [document]);

  useEffect(() => {
    if (documentAnalysis) safeSet(STORAGE_KEY_ANALYSIS, documentAnalysis);
    else sessionStorage.removeItem(STORAGE_KEY_ANALYSIS);
  }, [documentAnalysis]);

  useEffect(() => { safeSet(STORAGE_KEY_CONFIG, config); }, [config]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(STORAGE_KEY_TEMPLATE, selectedTemplate.id);
      safeSet('deckmind_selected_template_full', selectedTemplate);
    }
  }, [selectedTemplate]);

  useEffect(() => { safeSet(STORAGE_KEY_PROJECT, activeProject); }, [activeProject]);

  // ── Actions ────────────────────────────────────────────────
  const setDocument = (doc: UploadedDocument | null) => setDocumentState(doc);

  const setDocumentAnalysis = (analysis: DocumentAnalysis | null) => {
    setDocumentAnalysisState(analysis);
    if (analysis) {
      setDocumentState({
        id: analysis.id,
        name: analysis.fileName,
        size: analysis.fileSize,
        type: analysis.fileType,
        pages: analysis.pageCount,
        uploadedAt: analysis.extractedAt,
      });
    }
  };

  const setSelectedTemplate = (tpl: PresentationTemplate) => {
    console.log(`[DeckMind] Template selected: ${tpl.id} (${tpl.family})`);
    setSelectedTemplateState(tpl);
    const categoryLower = tpl.category.toLowerCase();
    const validStyles = ['minimal', 'professional', 'modern', 'creative'] as const;
    const matchedStyle = validStyles.find(s => s === categoryLower) ?? 'professional';
    setConfig(prev => ({ ...prev, style: matchedStyle, templateId: tpl.id }));
  };

  const setActiveProject = (project: PresentationProject) => {
    setActiveProjectState(project);
    setCurrentSlideIndex(0);
  };

  const updateConfig = <K extends keyof PresentationConfig>(key: K, value: PresentationConfig[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const selectRecentProject = (projectId: string) => {
    const found = recentPresentations.find(p => p.id === projectId);
    if (found) {
      setActiveProjectState(found);
      setDocumentState(found.document);
      setConfig(found.config);
      setCurrentSlideIndex(0);
      // Restore template from project snapshot
      if (found.template) {
        const tpl = PRESENTATION_TEMPLATES.find(t => t.id === found.template.id);
        if (tpl) setSelectedTemplateState(tpl);
      }
    }
  };

  // Single authoritative generation function
  // Uses the current React state values (not closure-captured ones)
  const generateProjectFromCurrentDocument = useCallback((): PresentationProject => {
    const docToUse = documentAnalysis ?? createSampleDocumentAnalysis();
    const templateToUse = selectedTemplate;
    const configToUse = { ...config, templateId: templateToUse.id };

    console.log(`[DeckMind] Generating project — template: ${templateToUse.id}, family: ${templateToUse.family}`);
    console.log(`[DeckMind] Document: ${docToUse.title} (${docToUse.sections.length} sections)`);
    console.log(`[DeckMind] Config: purpose=${configToUse.purpose}, density=${configToUse.density}`);

    const project = generatePresentationFromDocument(docToUse, configToUse, templateToUse);
    setActiveProjectState(project);
    setCurrentSlideIndex(0);

    // Asynchronously persist generated presentation to MongoDB Atlas
    if (typeof window !== 'undefined') {
      fetch('/api/presentations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ project }),
      }).catch(err => {
        console.warn('[DeckMind] Background save to MongoDB:', err);
      });
    }

    console.log(`[DeckMind] Project generated: ${project.slides.length} slides, template="${project.template.name}"`);
    return project;
  }, [documentAnalysis, config, selectedTemplate]);

  const loadSampleDocument = () => {
    const sample = createSampleDocumentAnalysis();
    setDocumentAnalysis(sample);
  };

  const currentSlide = activeProject.slides[currentSlideIndex] ?? activeProject.slides[0];

  return (
    <PresentationContext.Provider
      value={{
        document,
        setDocument,
        documentAnalysis,
        setDocumentAnalysis,
        config,
        setConfig,
        updateConfig,
        selectedTemplate,
        setSelectedTemplate,
        activeProject,
        setActiveProject,
        currentSlideIndex,
        setCurrentSlideIndex,
        currentSlide,
        recentPresentations,
        selectRecentProject,
        generateProjectFromCurrentDocument,
        loadSampleDocument,
      }}
    >
      {children}
    </PresentationContext.Provider>
  );
}

export function usePresentation() {
  const context = useContext(PresentationContext);
  if (!context) throw new Error('usePresentation must be used within a PresentationProvider');
  return context;
}
