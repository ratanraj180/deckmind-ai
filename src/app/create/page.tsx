'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  UploadCloud,
  ChevronRight,
  ChevronLeft,
  Sliders,
  Palette,
  Eye,
  BookOpen,
  GraduationCap,
  Users,
  Building,
  DollarSign,
  FileCode,
  Briefcase,
  Layers,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SegmentedControl } from '@/components/create/SegmentedControl';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { LiveTemplateSlidePreview } from '@/components/templates/LiveTemplateSlidePreview';
import { DocumentUnderstandingPreview } from '@/components/create/DocumentUnderstandingPreview';
import { usePresentation } from '@/context/PresentationContext';
import {
  PresentationPurpose,
  AudienceType,
  PresentationDuration,
  SlideCountOption,
  ContentDensity,
  VisualIntensity,
} from '@/types/presentation';
import { DocumentAnalysis } from '@/types/document';
import { PresentationTemplate, FontMood } from '@/types/templates';
import { PRESENTATION_TEMPLATES } from '@/lib/templates/templateData';
import { formatFileSize } from '@/lib/utils';

export default function CreatePresentationFlow() {
  const router = useRouter();
  const {
    document,
    documentAnalysis,
    config,
    updateConfig,
    selectedTemplate,
    setSelectedTemplate,
    generateProjectFromCurrentDocument,
  } = usePresentation();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedFontMood, setSelectedFontMood] = useState<FontMood>(
    selectedTemplate?.fontMood || 'clean_sans'
  );

  const steps = [
    { id: 1, title: 'Document' },
    { id: 2, title: 'Structure' },
    { id: 3, title: 'Goal' },
    { id: 4, title: 'Content' },
    { id: 5, title: 'Design Gallery (52+)' },
    { id: 6, title: 'Live Preview' },
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log(`[DeckMind] Navigating to processing — template: ${selectedTemplate.id}`);
      router.push('/processing');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push('/dashboard');
    }
  };

  const loadSampleDocument = () => {
    // Redirect to dashboard where sample document loader is available
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen mesh-canvas text-slate-900 pb-20">
      {/* Top Header & Guided Stepper */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-2xs">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-slate-600 hover:text-slate-900 rounded-xl"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-md bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-[11px] shadow-2xs">
                D
              </div>
              <span className="text-xs font-bold text-slate-900 hidden sm:inline tracking-tight">
                Presentation Studio
              </span>
            </div>
          </div>

          {/* Stepper Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {steps.map(s => {
              const isCurrent = currentStep === s.id;
              const isPast = currentStep > s.id;

              return (
                <button
                  key={s.id}
                  onClick={() => setCurrentStep(s.id)}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm ring-2 ring-indigo-500/20'
                      : isPast
                      ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200/60'
                      : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-[10px]">{s.id}</span>
                  <span className="hidden md:inline">{s.title}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-mono font-bold bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/80">
            {currentStep} / 6
          </div>
        </div>
      </header>

      {/* Main Flow Stage */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 space-y-8">
        {/* STEP 1: Uploaded Document Verification */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold font-mono">
                <FileText className="h-3.5 w-3.5" />
                <span>STEP 1 OF 6 • DOCUMENT INGESTION</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Uploaded Document
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Verify the file you want DeckMind to synthesize into structured presentation slides.
              </p>
            </div>

            {documentAnalysis ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-indigo-50/20 shadow-2xs">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="p-3 rounded-2xl bg-white text-indigo-600 border border-indigo-150 shadow-2xs shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">{documentAnalysis.fileName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5 font-mono">
                      {formatFileSize(documentAnalysis.fileSize)} • {documentAnalysis.pageCount} pages •{' '}
                      {documentAnalysis.metadata.characterCount.toLocaleString()} chars
                    </p>
                  </div>
                </div>
                <Badge variant="gradient" className="uppercase font-mono text-[10px] self-start sm:self-center">
                  {documentAnalysis.fileType}
                </Badge>
              </div>
            ) : (
              <div className="p-8 rounded-3xl border-2 border-dashed border-indigo-200/80 bg-indigo-50/20 text-center space-y-4">
                <div className="p-3 rounded-2xl bg-white border border-indigo-100 text-indigo-600 w-fit mx-auto shadow-2xs">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">No document currently uploaded</p>
                  <p className="text-xs text-slate-500 mt-1">Upload a PDF/DOCX or load our sample report to preview.</p>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/dashboard">
                    <Button variant="accent" size="sm" className="font-bold">
                      <UploadCloud className="h-4 w-4 mr-1.5" />
                      <span>Upload File in Dashboard</span>
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" onClick={loadSampleDocument} className="font-semibold">
                    Load Sample Document
                  </Button>
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              <Link href="/dashboard">
                <Button variant="outline" size="sm" className="border-slate-200 font-semibold">
                  Change Document
                </Button>
              </Link>
              <Button
                variant="accent"
                size="md"
                disabled={!documentAnalysis}
                onClick={handleNext}
                className="shadow-md font-bold px-5"
              >
                <span>Inspect Extracted Structure</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Real Document Understanding Preview */}
        {currentStep === 2 && (
          <>
            {documentAnalysis ? (
              <DocumentUnderstandingPreview
                documentAnalysis={documentAnalysis}
                onContinue={handleNext}
              />
            ) : (
              <div className="rounded-3xl border border-slate-200/90 bg-white p-8 text-center space-y-4 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">No Document Analyzed Yet</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Please upload a PDF or DOCX file to extract real document sections, or test with our sample research report.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/dashboard">
                    <Button variant="accent" size="sm">
                      Go to Upload Dropzone
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" onClick={loadSampleDocument}>
                    Load Sample Report
                  </Button>
                </div>
              </div>
            )}
          </>
        )}

        {/* STEP 3: Presentation Goal */}
        {currentStep === 3 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold font-mono">
                <Award className="h-3.5 w-3.5" />
                <span>STEP 3 OF 6 • PRESENTATION GOALS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Presentation Goal & Context
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Define the occasion, audience technical depth, and time limit.
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Presentation Purpose
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {[
                  { id: 'project_viva', label: 'Project Viva', icon: Award, badge: 'Recommended' },
                  { id: 'seminar', label: 'Department Seminar', icon: GraduationCap },
                  { id: 'research', label: 'Research Paper', icon: BookOpen },
                  { id: 'assignment', label: 'College Assignment', icon: FileCode },
                  { id: 'business', label: 'Business Pitch', icon: Briefcase },
                  { id: 'custom', label: 'Custom Presentation', icon: Sliders },
                ].map(p => {
                  const isSelected = config.purpose === p.id;
                  const Icon = p.icon;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => updateConfig('purpose', p.id as PresentationPurpose)}
                      className={`p-4 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer group ${
                        isSelected
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2.5">
                        <div
                          className={`p-2 rounded-xl border transition-colors ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                              : 'bg-slate-50 border-slate-200/80 text-slate-500 group-hover:text-slate-800'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </div>
                        {p.badge && (
                          <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200/60">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-900 tracking-tight">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audience */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Target Audience
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { id: 'professor', label: 'Professor / Examiner', icon: GraduationCap },
                  { id: 'students', label: 'Students / Peers', icon: Users },
                  { id: 'clients', label: 'Clients / Stakeholders', icon: Building },
                  { id: 'investors', label: 'Investors / Jury', icon: DollarSign },
                ].map(a => {
                  const isSelected = config.audience === a.id;
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => updateConfig('audience', a.id as AudienceType)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer group ${
                        isSelected
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div
                        className={`p-1.5 rounded-xl border transition-colors shrink-0 ${
                          isSelected
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-2xs'
                            : 'bg-slate-50 border-slate-200/80 text-slate-500 group-hover:text-slate-800'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="text-xs font-bold text-slate-900 tracking-tight leading-tight">{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Presentation Duration
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { id: '5m', label: '5 Minutes', sub: 'Lightning talk' },
                  { id: '10m', label: '10 Minutes', sub: 'Standard Viva defense' },
                  { id: '15m', label: '15 Minutes', sub: 'Technical seminar' },
                  { id: '20m', label: '20 Minutes', sub: 'In-depth presentation' },
                ].map(d => {
                  const isSelected = config.duration === d.id;
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => updateConfig('duration', d.id as PresentationDuration)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 font-mono">{d.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{d.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="border-slate-200 font-semibold">
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext} className="shadow-md font-bold px-5">
                <span>Continue to Content Settings</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Content Settings */}
        {currentStep === 4 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold font-mono">
                <Sliders className="h-3.5 w-3.5" />
                <span>STEP 4 OF 6 • CONTENT PARAMETERS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Content & Density Settings
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Set slide count and explanation density extracted from your document.
              </p>
            </div>

            {/* Slide Count */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Slide Count
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
                {[
                  { id: 'ai_decide', label: 'AI Decide', sub: 'Optimal Pacing' },
                  { id: '5', label: '5 Slides', sub: 'Compact' },
                  { id: '10', label: '10 Slides', sub: 'Standard Viva' },
                  { id: '15', label: '15 Slides', sub: 'Comprehensive' },
                  { id: '20', label: '20 Slides', sub: 'Full Defense' },
                ].map(s => {
                  const isSelected = config.slideCount === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => updateConfig('slideCount', s.id as SlideCountOption)}
                      className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white ring-2 ring-indigo-500/20 shadow-sm'
                          : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900 font-mono">{s.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{s.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Content Density Segmented Control */}
            <SegmentedControl<ContentDensity>
              title="Content Density"
              description="Controls how much explanation appears on each slide"
              options={[
                {
                  value: 'concise',
                  label: 'Concise',
                  sublabel: 'Less text, high visual dominance',
                },
                {
                  value: 'balanced',
                  label: 'Balanced',
                  sublabel: 'Even mix of explanation and visuals',
                },
                {
                  value: 'detailed',
                  label: 'Detailed',
                  sublabel: 'More technical depth per slide',
                },
              ]}
              value={config.density || 'balanced'}
              onChange={val => updateConfig('density', val)}
            />

            {/* Custom AI Prompt & Focus Instructions */}
            <div className="space-y-2 pt-3 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Custom AI Prompt & Focus Instructions (Optional)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Fine-tune generation</span>
              </div>
              <textarea
                rows={2}
                value={config.customInstructions || ''}
                onChange={e => updateConfig('customInstructions', e.target.value)}
                placeholder="e.g. Focus heavily on system architecture and hardware specs. Emphasize real-time edge processing and benchmark metrics."
                className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/60 leading-relaxed text-slate-900 font-medium shadow-2xs"
              />
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="border-slate-200 font-semibold">
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext} className="shadow-md font-bold px-5">
                <span>Continue to 52+ Design Gallery</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Design Gallery (52+ TEMPLATES ACROSS 12 FAMILIES) */}
        {currentStep === 5 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold font-mono">
                <Palette className="h-3.5 w-3.5" />
                <span>STEP 5 OF 6 • 12 DESIGN FAMILIES (52+ TEMPLATES)</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Choose Presentation Design Family
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                12 fundamentally different design systems (Swiss, Corporate, Future Tech, Academic, Blueprint, Poster, etc.).
              </p>
            </div>

            {/* Template Gallery */}
            <TemplateGallery
              selectedTemplateId={selectedTemplate.id}
              onSelectTemplate={tpl => {
                setSelectedTemplate(tpl);
              }}
            />

            {/* Visual Intensity Control */}
            <SegmentedControl<VisualIntensity>
              title="Visual Diagram Intensity"
              description="Tells DeckMind how many flowcharts, metrics, and architecture diagrams to generate"
              options={[
                {
                  value: 'minimal',
                  label: 'Minimal Visuals',
                  sublabel: 'Clean, simple, text-focused',
                },
                {
                  value: 'balanced',
                  label: 'Balanced Visuals',
                  sublabel: 'Proportional diagrams + bullet points',
                },
                {
                  value: 'visual_rich',
                  label: 'Visual Rich',
                  sublabel: 'High-density diagrams, charts & flowcharts',
                },
              ]}
              value={config.visualIntensity || 'balanced'}
              onChange={val => updateConfig('visualIntensity', val)}
            />

            {/* Font Mood Selection */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-900 tracking-tight">Typography Font Mood</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                {[
                  { id: 'clean_sans', label: 'Clean Sans', sub: 'Modern geometric sans' },
                  { id: 'editorial', label: 'Editorial', sub: 'Refined serif headlines' },
                  { id: 'professional', label: 'Professional', sub: 'Academic neutral' },
                  { id: 'technical', label: 'Technical', sub: 'Monospace code & numbers' },
                ].map(f => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => {
                      setSelectedFontMood(f.id as FontMood);
                      setSelectedTemplate({ ...selectedTemplate, fontMood: f.id as FontMood });
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                      selectedFontMood === f.id
                        ? 'border-indigo-500 bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-white ring-2 ring-indigo-500/20 shadow-sm'
                        : 'border-slate-200/90 bg-white hover:border-indigo-300 hover:shadow-xs'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900 tracking-tight">{f.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{f.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={handleBack} className="border-slate-200 font-semibold">
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext} className="shadow-md font-bold px-5">
                <span>Review Live 16:9 Canvas</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: Live Preview & Generate */}
        {currentStep === 6 && (
          <div className="rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-sm p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold font-mono">
                  <Eye className="h-3.5 w-3.5" />
                  <span>STEP 6 OF 6 • LIVE 16:9 PREVIEW</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Ready to Generate Presentation
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Inspecting design: <span className="font-bold text-slate-800">{selectedTemplate.name}</span> ({selectedTemplate.family.replace('_', ' ')})
                </p>
              </div>

              <Badge variant="gradient" className="font-mono text-xs font-bold self-start sm:self-center">
                {config.slideCount === 'ai_decide' ? '10' : config.slideCount} Slides • {config.duration}
              </Badge>
            </div>

            {/* High-Fidelity 16:9 Canvas Live Preview */}
            <LiveTemplateSlidePreview
              template={selectedTemplate}
              documentTitle={documentAnalysis?.title || 'Smart Attendance System using Deep Edge AI'}
              visualIntensity={config.visualIntensity || 'balanced'}
              density={config.density || 'balanced'}
            />

            {/* Summary parameter bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-xs shadow-2xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Document Source
                </span>
                <span className="font-bold text-slate-800 truncate block mt-0.5">
                  {documentAnalysis?.fileName || 'Sample Report'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Selected Family
                </span>
                <span className="font-bold text-indigo-700 capitalize block mt-0.5">
                  {selectedTemplate.family.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Layout Engine
                </span>
                <span className="font-bold text-slate-800 capitalize block mt-0.5">
                  {selectedTemplate.layoutStyle.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Visual Diagrams
                </span>
                <span className="font-bold text-slate-800 capitalize block mt-0.5">
                  {config.visualIntensity || 'balanced'}
                </span>
              </div>
            </div>

            {/* Generate Presentation CTA */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="border-slate-200 font-semibold">
                Previous (Change Template)
              </Button>

              <Button
                variant="accent"
                size="lg"
                onClick={handleNext}
                className="w-full sm:w-auto shadow-xl shadow-indigo-600/25 font-bold h-12 px-7 rounded-xl"
              >
                <Sparkles className="h-4 w-4 mr-2 text-amber-300" />
                <span>Generate Presentation from Document →</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
