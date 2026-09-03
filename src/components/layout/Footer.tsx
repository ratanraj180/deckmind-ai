import React from 'react';
import Link from 'next/link';
import { Layers } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 mesh-canvas-dark text-white">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-24 left-1/4 h-48 w-48 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -top-16 right-1/4 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl brand-mark text-white shadow-md shadow-blue-500/20">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-white">DeckMind</span>
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">
                  AI
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              The Presentation Intelligence Platform. Transforming complex engineering reports,
              academic theses, and research papers into audience-aware, stunning slide decks.
            </p>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} DeckMind AI. All rights reserved.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Product
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link href="#features" className="hover:text-amber-300 transition-colors">
                  Visual Intelligence
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-emerald-300 transition-colors">
                  Storyline Engine
                </Link>
              </li>
              <li>
                <Link href="#showcase" className="hover:text-blue-300 transition-colors">
                  Slide Gallery
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-violet-300 transition-colors">
                  Pricing Plans
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Academic Formats
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Final Year Project Viva
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 transition-colors cursor-pointer">
                  IEEE Conference Papers
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Departmental Seminars
                </span>
              </li>
              <li>
                <span className="hover:text-violet-300 transition-colors cursor-pointer">
                  M.Tech Thesis Defense
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4 font-mono">
              Integrity & Trust
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <span className="hover:text-emerald-300 transition-colors cursor-pointer">
                  Academic Standards
                </span>
              </li>
              <li>
                <span className="hover:text-blue-300 transition-colors cursor-pointer">
                  Data Encryption
                </span>
              </li>
              <li>
                <span className="hover:text-amber-300 transition-colors cursor-pointer">
                  Editable .PPTX Guarantee
                </span>
              </li>
              <li>
                <span className="hover:text-violet-300 transition-colors cursor-pointer">
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
