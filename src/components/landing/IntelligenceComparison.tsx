import React from 'react';
import {
  XCircle,
  CheckCircle2,
  Workflow,
  BarChart2,
  Network,
  Columns,
  Clock,
  Lightbulb,
  Layers,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function IntelligenceComparison() {
  const visualRepresentations = [
    {
      format: 'Flowchart & Pipeline',
      icon: Workflow,
      trigger: 'Execution processes & algorithms',
      example: 'Frame capture → MTCNN localization → Triplet embedding',
    },
    {
      format: 'Architecture Diagram',
      icon: Network,
      trigger: 'System modules & network nodes',
      example: 'Sensor layer → Jetson Edge GPU → Local Vector Store',
    },
    {
      format: 'Data & Metric Visuals',
      icon: BarChart2,
      trigger: 'Statistics & empirical benchmarks',
      example: '99.4% recognition accuracy across 240 classroom sessions',
    },
    {
      format: 'Comparison Matrix',
      icon: Columns,
      trigger: 'Existing methods vs. proposed approach',
      example: 'Manual roll call vs. Fingerprint vs. Zero-touch vision',
    },
    {
      format: 'Milestone Timeline',
      icon: Clock,
      trigger: 'Project roadmap & future enhancements',
      example: 'Phase 1 ERP sync → Phase 2 Gaze tracking → Phase 3 Mesh',
    },
    {
      format: 'Concept Synthesis',
      icon: Lightbulb,
      trigger: 'Theoretical foundations & core principles',
      example: 'Euclidean hypersphere mapping via Triplet Loss function',
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
          <Badge variant="indigo">The Core Differentiator</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Why other converters fail, and how DeckMind thinks
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Dumb AI tools dump raw paragraphs into bullet points. DeckMind analyzes cognitive
            relationships to render the ideal visual format for every concept.
          </p>
        </div>

        {/* Contrast Grid: Dumb AI vs DeckMind Intelligence */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Left: Dumb Converters */}
          <div className="rounded-2xl border border-rose-200/70 bg-rose-50/20 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2.5 text-rose-600 font-semibold text-sm">
              <XCircle className="h-5 w-5" />
              <span>Generic Converters (What to avoid)</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              PDF → Strip Text → Slap into Bullet Points
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Dumps walls of text onto slides. Ignores architecture, flattens workflows into dull
              lists, fails to understand that professors examine logic rather than reading essays on
              a projector.
            </p>
            <div className="p-4 rounded-xl bg-white border border-rose-200 text-xs text-slate-500 font-mono space-y-2">
              <div className="text-rose-500 font-semibold">✗ Monotonous Bullet Overload:</div>
              <div>• Section 3.2 mentions NVIDIA Jetson Nano has 128 cores</div>
              <div>• MTCNN is used for detection with 3 stages of CNN</div>
              <div>• FaceNet uses triplet loss to compute Euclidean distances</div>
              <div>• Table 4.1 shows 99.4% accuracy under daylight conditions</div>
            </div>
          </div>

          {/* Right: DeckMind Intelligence */}
          <div className="rounded-2xl border border-indigo-200 bg-indigo-50/25 p-6 sm:p-8 space-y-4 shadow-sm">
            <div className="flex items-center gap-2.5 text-indigo-700 font-semibold text-sm">
              <CheckCircle2 className="h-5 w-5" />
              <span>DeckMind Presentation Intelligence</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Semantic Comprehension → Storyline Engine → Visual Blueprint
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Understands the thesis, identifies technical relationships, tailors narrative to your
              specific audience (Viva examiner vs. seminar peer), and generates native diagrams,
              metrics, and defense notes.
            </p>
            <div className="p-4 rounded-xl bg-white border border-indigo-200 text-xs text-slate-700 font-sans space-y-2">
              <div className="text-indigo-700 font-semibold flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5" /> Context-Aware Visual Translation:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                <div className="p-2 rounded bg-slate-50 border border-slate-150">
                  <span className="font-semibold text-slate-900">Hardware Nodes:</span>
                  <div className="text-indigo-600">Visual Block Architecture</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-150">
                  <span className="font-semibold text-slate-900">Inference Loop:</span>
                  <div className="text-indigo-600">Numbered Latency Flowchart</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-150">
                  <span className="font-semibold text-slate-900">Test Metrics:</span>
                  <div className="text-indigo-600">Accuracy & Lux Bar Charts</div>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-150">
                  <span className="font-semibold text-slate-900">Viva Defense:</span>
                  <div className="text-indigo-600">Anticipated Examiner Q&A</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Visual Representation Cards */}
        <div className="mt-12">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wider text-slate-500 mb-8">
            Adaptive Visual Intelligence by Information Type
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visualRepresentations.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-slate-200/90 bg-white p-5 hover:border-slate-300 hover:shadow-xs transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-900">{item.format}</h4>
                      <p className="text-[11px] text-slate-500">{item.trigger}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600 border border-slate-150 font-mono">
                    {item.example}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
