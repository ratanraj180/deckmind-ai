'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, FileText, ArrowRight, Clock, MoreVertical, Presentation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { usePresentation } from '@/context/PresentationContext';
import { formatDate } from '@/lib/utils';

export function RecentPresentations() {
  const router = useRouter();
  const { recentPresentations, selectRecentProject } = usePresentation();
  const [dbPresentations, setDbPresentations] = React.useState<any[]>([]);

  React.useEffect(() => {
    fetch('/api/presentations?limit=6')
      .then(res => res.json())
      .then(data => {
        if (data?.success && Array.isArray(data?.presentations) && data.presentations.length > 0) {
          setDbPresentations(data.presentations);
        }
      })
      .catch(() => {});
  }, []);

  const handleOpen = (id: string) => {
    selectRecentProject(id);
    router.push('/presentation');
  };

  const displayList = dbPresentations.length > 0 ? dbPresentations : recentPresentations;

  // Purpose color helper
  const getPurposeStyle = (purposeRaw: string) => {
    const p = purposeRaw.toLowerCase();
    if (p.includes('viva')) return { badge: 'purple' as const, bar: 'from-purple-500 to-indigo-600', iconBg: 'bg-purple-50 text-purple-600 border-purple-200/60' };
    if (p.includes('seminar')) return { badge: 'indigo' as const, bar: 'from-indigo-500 to-blue-600', iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/60' };
    if (p.includes('research') || p.includes('paper')) return { badge: 'cyan' as const, bar: 'from-cyan-500 to-teal-600', iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/60' };
    return { badge: 'secondary' as const, bar: 'from-amber-500 to-orange-500', iconBg: 'bg-amber-50 text-amber-600 border-amber-200/60' };
  };

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 tracking-tight">Recent Presentations</h3>
          <p className="text-xs text-slate-500">Access and edit your generated presentation decks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4.5">
        {displayList.map((project: any) => {
          const slideCount = project.slideCount ?? project.slides?.length ?? 0;
          const purpose = (project.config?.purpose || 'Business').replace('_', ' ');
          const style = getPurposeStyle(purpose);

          return (
            <div
              key={project.id}
              onClick={() => handleOpen(project.id)}
              className="group cursor-pointer rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-sm p-5 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${style.bar}`} />

              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3.5 pt-1">
                  <div className="flex items-center gap-2">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${style.iconBg} border shadow-xs group-hover:scale-105 transition-transform`}>
                      <Presentation className="h-4 w-4" />
                    </div>
                    <Badge variant={style.badge} className="capitalize text-[10px] font-semibold">
                      {purpose}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono font-bold bg-slate-100/80 px-2 py-0.5 rounded-md border border-slate-200/60">
                    {slideCount} slides
                  </span>
                </div>

                {/* Title & Description */}
                <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-1.5 tracking-tight leading-snug">
                  {project.title}
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>
              </div>

              {/* Bottom Meta Bar */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-1.5 font-medium">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{formatDate(project.createdAt)}</span>
                </div>

                <span className="inline-flex items-center gap-1 font-bold text-indigo-600 group-hover:translate-x-1 transition-transform">
                  <span>Open Deck</span>
                  <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
