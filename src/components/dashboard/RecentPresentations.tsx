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

  return (
    <div className="space-y-4 pt-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Recent Presentations</h3>
          <p className="text-xs text-slate-500">Access your previously generated presentation decks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayList.map((project: any) => {
          const slideCount = project.slideCount ?? project.slides?.length ?? 0;
          const purpose = (project.config?.purpose || 'Business').replace('_', ' ');

          return (
            <div
              key={project.id}
              onClick={() => handleOpen(project.id)}
              className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 hover:border-indigo-300 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                      <Presentation className="h-4 w-4" />
                    </div>
                    <Badge variant="secondary" className="capitalize text-[10px]">
                      {purpose}
                    </Badge>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {slideCount} slides
                  </span>
                </div>

              {/* Title & Description */}
              <h4 className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mb-2">
                {project.title}
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                {project.description}
              </p>
            </div>

            {/* Bottom Meta Bar */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>{formatDate(project.createdAt)}</span>
              </div>

              <span className="inline-flex items-center gap-1 font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform">
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
