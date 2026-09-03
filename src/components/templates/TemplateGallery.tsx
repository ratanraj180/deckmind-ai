'use client';

import React, { useState, useMemo } from 'react';
import { PresentationTemplate, TemplateCategory } from '@/types/templates';
import { PRESENTATION_TEMPLATES } from '@/lib/templates/templateData';
import { TemplateCard } from './TemplateCard';
import { Search, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TemplateGalleryProps {
  selectedTemplateId: string;
  onSelectTemplate: (template: PresentationTemplate) => void;
}

const CATEGORIES = [
  'All',
  'Featured',
  'Minimal',
  'Professional',
  'Modern',
  'Technology',
  'Creative',
  'Academic',
  'Premium',
] as const;

type GalleryCategory = typeof CATEGORIES[number];

const TEMPLATES_PER_PAGE = 18;

export function TemplateGallery({
  selectedTemplateId,
  onSelectTemplate,
}: TemplateGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    return PRESENTATION_TEMPLATES.filter(tpl => {
      const matchesCategory =
        activeCategory === 'All'
          ? true
          : activeCategory === 'Featured'
          ? tpl.isFeatured || tpl.category === 'Minimal'
          : tpl.category === activeCategory;

      if (!searchQuery.trim()) {
        return matchesCategory;
      }

      const q = searchQuery.toLowerCase();
      const matchesSearch =
        tpl.name.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q) ||
        tpl.category.toLowerCase().includes(q) ||
        tpl.bestFor.some(tag => tag.toLowerCase().includes(q));

      return matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredTemplates.length / TEMPLATES_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const paginatedTemplates = useMemo(() => {
    const start = (safePage - 1) * TEMPLATES_PER_PAGE;
    return filteredTemplates.slice(start, start + TEMPLATES_PER_PAGE);
  }, [filteredTemplates, safePage]);

  const handleCategoryChange = (cat: GalleryCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      {/* Category Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        {/* Category switcher */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 border border-slate-200/60'
                }`}
              >
                {cat === 'All' ? (
                  <span className="flex items-center gap-1">
                    <span>All Outlets</span>
                    <span className="text-[10px] opacity-75 font-mono">({PRESENTATION_TEMPLATES.length})</span>
                  </span>
                ) : cat === 'Featured' ? (
                  <span className="flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-amber-300" />
                    <span>Featured</span>
                  </span>
                ) : (
                  cat
                )}
              </button>
            );
          })}
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-60 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search 52+ templates..."
            value={searchQuery}
            onChange={e => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-8 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 shadow-2xs font-medium"
          />
        </div>
      </div>

      {/* Grid of Templates (6-8 at a time) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {paginatedTemplates.map(tpl => (
          <TemplateCard
            key={tpl.id}
            template={tpl}
            isSelected={selectedTemplateId === tpl.id}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>

      {/* Pagination & Status Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-150 text-xs text-slate-500">
        <span className="font-medium">
          Showing <span className="font-bold text-slate-700">{paginatedTemplates.length}</span> of {filteredTemplates.length} templates (52 total available)
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            className="h-8 px-2.5 text-xs font-bold border-slate-200"
          >
            <ChevronLeft className="h-3.5 w-3.5 mr-0.5" />
            <span>Prev</span>
          </Button>

          <span className="font-mono text-xs font-bold text-slate-800 px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200/80">
            {safePage} / {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={safePage >= totalPages}
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            className="h-8 px-2.5 text-xs font-bold border-slate-200"
          >
            <span>Next</span>
            <ChevronRight className="h-3.5 w-3.5 ml-0.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
