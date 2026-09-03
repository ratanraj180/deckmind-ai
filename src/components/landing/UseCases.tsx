import React from 'react';
import { Award, BookOpen, FileCheck, Presentation, GraduationCap, Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function UseCases() {
  const cases = [
    {
      icon: Award,
      title: 'Final Year Project Viva',
      badge: 'Most Popular',
      badgeVariant: 'indigo' as const,
      description:
        'Turn your 50-page capstone report into a high-impact presentation with clear system block diagrams, empirical graphs, and AI-predicted examiner questions.',
      highlights: ['Hardware / software stack diagrams', 'BOM cost analysis', 'Anticipated viva Q&A defense'],
    },
    {
      icon: Presentation,
      title: 'Department Seminars',
      badge: 'Technical Depth',
      badgeVariant: 'secondary' as const,
      description:
        'Deliver compelling 15-minute technical seminars. Breaks down complex algorithms into step-by-step visual pipelines that keep peers and professors engaged.',
      highlights: ['Algorithmic pipeline flow', 'Comparative trade-off tables', 'Paced slide transitions'],
    },
    {
      icon: BookOpen,
      title: 'IEEE & Research Papers',
      badge: 'Academic Rigor',
      badgeVariant: 'secondary' as const,
      description:
        'Convert dense two-column LaTeX / IEEE papers into structured 16:9 conference slides highlighting problem formulations, mathematical proofs, and results.',
      highlights: ['Mathematical formula rendering', 'Dataset benchmark charts', 'Literature comparison'],
    },
    {
      icon: FileCheck,
      title: 'Lab & Course Assignments',
      badge: 'Rapid Turnaround',
      badgeVariant: 'secondary' as const,
      description:
        'Convert lab manuals, case studies, and mini-project writeups into crisp 5 to 10 slide presentations matching faculty grading rubrics.',
      highlights: ['Rubric-aligned summaries', 'Key takeaway bullet reduction', 'Ready in under 2 minutes'],
    },
    {
      icon: GraduationCap,
      title: 'M.Tech / PhD Defense',
      badge: 'Deep Methodology',
      badgeVariant: 'secondary' as const,
      description:
        'Built for comprehensive thesis defenses. Distills 100+ pages of deep academic literature, statistical validation, and peer contributions.',
      highlights: ['Novelty & contribution matrices', 'Multi-phase testing metrics', 'Comprehensive speaker notes'],
    },
    {
      icon: Briefcase,
      title: 'Hackathons & Startup Pitches',
      badge: 'Executive Clarity',
      badgeVariant: 'secondary' as const,
      description:
        'Transform product whitepapers and architecture documentation into investor and jury-ready pitch decks emphasizing moat, architecture, and traction.',
      highlights: ['Problem-solution fit', 'Architecture scalability', 'Go-to-market roadmap'],
    },
  ];

  return (
    <section id="use-cases" className="py-20 border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
          <Badge variant="indigo">Engineered for Academia</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Built for engineering students, researchers & viva defenses
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Tailored specifically for the rigorous requirements of university evaluations, external
            examinations, and technical presentations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xs hover:border-indigo-200 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-800 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant={item.badgeVariant}>{item.badge}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-150 space-y-1.5">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="text-xs text-slate-500 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
