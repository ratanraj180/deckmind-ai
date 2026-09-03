'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  FileText,
  Award,
  BookOpen,
  Presentation,
  FileCode,
  Briefcase,
  GraduationCap,
  Users,
  Building,
  DollarSign,
  Sliders,
  Palette,
  Eye,
  UploadCloud,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePresentation } from '@/context/PresentationContext';
import { formatFileSize } from '@/lib/utils';
import {
  PresentationPurpose,
  AudienceType,
  PresentationDuration,
  SlideCountOption,
  ContentDensity,
  VisualIntensity,
} from '@/types/presentation';
import { PresentationTemplate, FontMood } from '@/types/templates';
import { PRESENTATION_TEMPLATES } from '@/lib/templates/templateData';
import { DocumentUnderstandingPreview } from '@/components/create/DocumentUnderstandingPreview';
import { TemplateGallery } from '@/components/templates/TemplateGallery';
import { LiveTemplateSlidePreview } from '@/components/templates/LiveTemplateSlidePreview';
import { SegmentedControl } from '@/components/create/SegmentedControl';

export default function CreatePresentationPage() {
  const router = useRouter();
  const {
    config,
    updateConfig,
    document,
    documentAnalysis,
    selectedTemplate,
    setSelectedTemplate,
    loadSampleDocument,
  } = usePresentation();

  // 6-step guided creative flow
  const [currentStep, setCurrentStep] = useState<number>(2); // Starts at Step 2 (Document Overview)
  const [selectedFontMood, setSelectedFontMood] = useState<FontMood>(
    () => selectedTemplate.fontMood || 'clean_sans'
  );

  const steps = [
    { id: 1, title: 'Document' },
    { id: 2, title: 'Document Understanding' },
    { id: 3, title: 'Presentation Goal' },
    { id: 4, title: 'Content Settings' },
    { id: 5, title: 'Design Gallery (52+)' },
    { id: 6, title: 'Live Preview' },
  ];

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    } else {
      // Navigate to processing — that page is the single authoritative generation point.
      // Do NOT call generateProjectFromCurrentDocument here to avoid stale closure race.
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

  return (
    <div className="min-h-screen bg-[#fafafb] text-slate-900 pb-20">
      {/* Top Header & Guided Stepper */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-slate-600 hover:text-slate-900"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              <span>Back</span>
            </Button>
            <div className="h-4 w-px bg-slate-200" />
            <span className="text-xs font-bold text-slate-900 hidden sm:inline">
              Presentation Designer
            </span>
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
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : isPast
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  <span className="font-mono text-[10px]">{s.id}</span>
                  <span className="hidden md:inline">{s.title}</span>
                </button>
              );
            })}
          </div>

          <div className="text-xs text-slate-500 font-mono">
            {currentStep} / 6
          </div>
        </div>
      </header>

      {/* Main Flow Stage */}
      <main className="mx-auto max-w-5xl px-4 sm:px-6 pt-8 space-y-8">
        {/* STEP 1: Uploaded Document Verification */}
        {currentStep === 1 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Uploaded Document</h2>
              <p className="text-xs text-slate-500">
                Verify the file you want DeckMind to synthesize.
              </p>
            </div>

            {documentAnalysis ? (
              <div className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-150">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{documentAnalysis.fileName}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {formatFileSize(documentAnalysis.fileSize)} • {documentAnalysis.pageCount} pages •{' '}
                      {documentAnalysis.metadata.characterCount.toLocaleString()} chars
                    </p>
                  </div>
                </div>
                <Badge variant="indigo" className="uppercase font-mono text-[10px]">
                  {documentAnalysis.fileType}
                </Badge>
              </div>
            ) : (
              <div className="p-6 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-3">
                <p className="text-xs text-slate-500">No document currently uploaded.</p>
                <div className="flex items-center justify-center gap-3">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm">
                      <UploadCloud className="h-4 w-4 mr-1.5" />
                      <span>Upload File in Dashboard</span>
                    </Button>
                  </Link>
                  <Button variant="secondary" size="sm" onClick={loadSampleDocument}>
                    Load Sample Document
                  </Button>
                </div>
              </div>
            )}

            <div className="pt-4 flex justify-between items-center border-t border-slate-150">
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Change Document
                </Button>
              </Link>
              <Button
                variant="accent"
                size="md"
                disabled={!documentAnalysis}
                onClick={handleNext}
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
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-4">
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
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Presentation Goal</h2>
              <p className="text-xs text-slate-500">
                Define the occasion, audience technical depth, and time limit.
              </p>
            </div>

            {/* Purpose */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Presentation Purpose
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { id: 'project_viva', label: 'Project Viva', icon: Award, badge: 'Recommended' },
                  { id: 'seminar', label: 'Department Seminar', icon: Presentation },
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
                      className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-100 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon
                          className={`h-4 w-4 ${
                            isSelected ? 'text-indigo-600' : 'text-slate-500'
                          }`}
                        />
                        {p.badge && (
                          <span className="text-[9px] font-mono text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded">
                            {p.badge}
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-bold text-slate-900">{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Audience */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Target Audience
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                      className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-100 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${isSelected ? 'text-indigo-600' : 'text-slate-500'}`}
                      />
                      <span className="text-xs font-bold text-slate-900">{a.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Duration */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Presentation Duration
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-100 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{d.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{d.sub}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-150">
              <Button variant="outline" size="sm" onClick={handleBack}>
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext}>
                <span>Continue to Content Settings</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Content Settings */}
        {currentStep === 4 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">Content Settings</h2>
              <p className="text-xs text-slate-500">
                Set slide count and explanation density extracted from your document.
              </p>
            </div>

            {/* Slide Count */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Slide Count
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
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
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-100 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{s.label}</div>
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
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Custom AI Prompt & Focus Instructions (Optional)
                </label>
                <span className="text-[10px] text-slate-400 font-mono">Fine-tune generation</span>
              </div>
              <textarea
                rows={2}
                value={config.customInstructions || ''}
                onChange={e => updateConfig('customInstructions', e.target.value)}
                placeholder="e.g. Focus heavily on system architecture and hardware specs. Emphasize real-time edge processing and benchmark metrics."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50/50 leading-relaxed text-slate-900"
              />
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-150">
              <Button variant="outline" size="sm" onClick={handleBack}>
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext}>
                <span>Continue to 52+ Design Gallery</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 5: Design Gallery (52+ TEMPLATES ACROSS 12 FAMILIES) */}
        {currentStep === 5 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-8">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold">
                <Palette className="h-3.5 w-3.5" />
                <span>STEP 5 OF 6 • 12 DESIGN FAMILIES (52+ TEMPLATES)</span>
              </div>
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                Choose Presentation Design Family
              </h2>
              <p className="text-xs text-slate-500">
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
              <h4 className="text-xs font-bold text-slate-900">Typography Font Mood</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFontMood === f.id
                        ? 'border-indigo-600 bg-indigo-50/30 ring-2 ring-indigo-100 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-slate-900">{f.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{f.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center border-t border-slate-150">
              <Button variant="outline" size="sm" onClick={handleBack}>
                Previous
              </Button>
              <Button variant="accent" size="md" onClick={handleNext}>
                <span>Review Live 16:9 Canvas</span>
                <ArrowRight className="h-4 w-4 ml-1.5" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 6: Live Preview & Generate */}
        {currentStep === 6 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-indigo-700 text-xs font-bold">
                  <Eye className="h-3.5 w-3.5" />
                  <span>STEP 6 OF 6 • LIVE PREVIEW</span>
                </div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
                  Ready to Generate Presentation
                </h2>
                <p className="text-xs text-slate-500">
                  Inspecting design: <span className="font-bold text-slate-800">{selectedTemplate.name}</span> ({selectedTemplate.family.replace('_', ' ')})
                </p>
              </div>

              <Badge variant="indigo" className="font-mono text-xs">
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
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Document Source
                </span>
                <span className="font-bold text-slate-800 truncate block">
                  {documentAnalysis?.fileName || 'Sample Report'}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Selected Family
                </span>
                <span className="font-bold text-indigo-700 capitalize">
                  {selectedTemplate.family.replace('_', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Layout Engine
                </span>
                <span className="font-bold text-slate-800 capitalize">
                  {selectedTemplate.layoutStyle.replace('-', ' ')}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                  Visual Diagrams
                </span>
                <span className="font-bold text-slate-800 capitalize">
                  {config.visualIntensity || 'balanced'}
                </span>
              </div>
            </div>

            {/* Generate Presentation CTA */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Button variant="outline" size="sm" onClick={handleBack}>
                Previous (Change Template)
              </Button>

              <Button
                variant="accent"
                size="lg"
                onClick={handleNext}
                className="w-full sm:w-auto shadow-xl shadow-indigo-600/30 font-bold"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                <span>Generate Presentation from Document →</span>
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
