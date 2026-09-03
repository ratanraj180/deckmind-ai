'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/75 backdrop-blur-2xl transition-all shadow-2xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl brand-mark text-white shadow-md shadow-blue-500/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-violet-500/30">
            <Layers className="h-5 w-5 text-white drop-shadow-sm" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-slate-900">DeckMind</span>
              <span className="font-extrabold text-xl tracking-tight gradient-text">AI</span>
              <Badge variant="warning" className="text-[10px] px-1.5 py-0 h-4 font-mono font-bold">
                2026
              </Badge>
            </div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600">
          {[
            { href: '#features', label: 'Intelligence Engine' },
            { href: '#how-it-works', label: 'How it works' },
            { href: '#use-cases', label: 'Viva & Defense' },
            { href: '#showcase', label: 'Slide Gallery' },
            { href: '#pricing', label: 'Pricing' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-full transition-all hover:text-slate-900 hover:bg-white/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm" className="font-semibold text-slate-700 hover:text-slate-900">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="accent" size="sm" className="group font-semibold">
              <span>Create Presentation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-xl hover:bg-white/80 transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200/90 bg-white/95 backdrop-blur-xl px-5 pt-3 pb-6 space-y-1 shadow-lg">
          {[
            { href: '#features', label: 'Intelligence Engine' },
            { href: '#how-it-works', label: 'How it works' },
            { href: '#use-cases', label: 'Viva & Defense' },
            { href: '#showcase', label: 'Slide Gallery' },
            { href: '#pricing', label: 'Pricing' },
          ].map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-indigo-700 hover:bg-indigo-50/70"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="accent" size="md" className="w-full justify-center font-bold">
                Create Presentation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
