'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, Menu, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/80 bg-white/85 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs transition-transform group-hover:scale-105">
            <Layers className="h-5 w-5 text-indigo-400" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-slate-900">DeckMind</span>
              <span className="font-semibold text-lg tracking-tight text-indigo-600">AI</span>
              <Badge variant="indigo" className="text-[10px] px-1.5 py-0 h-4 font-mono font-medium">
                SaaS
              </Badge>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="#features" className="transition-colors hover:text-slate-900">
            Intelligence Engine
          </Link>
          <Link href="#how-it-works" className="transition-colors hover:text-slate-900">
            How it works
          </Link>
          <Link href="#use-cases" className="transition-colors hover:text-slate-900">
            Viva & Seminar
          </Link>
          <Link href="#showcase" className="transition-colors hover:text-slate-900">
            Slide Showcase
          </Link>
          <Link href="#pricing" className="transition-colors hover:text-slate-900">
            Pricing
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="primary" size="sm" className="group">
              <span>Create Presentation</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-slate-600 hover:text-slate-900"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-3">
          <Link
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Intelligence Engine
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            How it works
          </Link>
          <Link
            href="#use-cases"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Viva & Seminar
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            Pricing
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full justify-center">
                Create Presentation
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
