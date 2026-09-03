import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                <Layers className="h-4 w-4 text-indigo-400" />
              </div>
              <span className="font-semibold text-lg tracking-tight text-slate-900">DeckMind AI</span>
            </div>
            <p className="text-sm text-slate-500 max-w-sm leading-relaxed">
              The Presentation Intelligence Platform. We transform complex engineering reports,
              research papers, and academic theses into audience-aware, visually structured slide decks.
            </p>
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} DeckMind AI Inc. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <Link href="#features" className="hover:text-slate-900 transition-colors">
                  Visual Intelligence
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-slate-900 transition-colors">
                  Storyline Engine
                </Link>
              </li>
              <li>
                <Link href="#showcase" className="hover:text-slate-900 transition-colors">
                  Slide Formats
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-slate-900 transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Academic Use Cases
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Final Year Project Viva
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  IEEE Conference Papers
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Department Seminars
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  M.Tech Thesis Defense
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Trust & Quality
            </h4>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Academic Integrity
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Data Privacy & Encryption
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Editable .PPTX Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-slate-900 transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
