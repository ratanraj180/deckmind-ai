'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Layers,
  PlusCircle,
  FolderOpen,
  Sparkles,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { usePresentation } from '@/context/PresentationContext';
import { useSession, signOut } from 'next-auth/react';

export function DashboardSidebar() {
  const pathname = usePathname();
  const { recentPresentations, selectRecentProject } = usePresentation();
  const { data: session } = useSession();

  return (
    <aside className="hidden lg:flex w-64 border-r border-slate-200/80 bg-white/75 backdrop-blur-xl flex-col justify-between h-screen sticky top-0 shrink-0 shadow-2xs">
      {/* Top Header & Brand */}
      <div className="p-4 border-b border-slate-150">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl brand-mark text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Layers className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-base tracking-tight text-slate-900">DeckMind</span>
              <span className="font-extrabold text-base tracking-tight gradient-text">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block -mt-0.5">Workspace Studio</span>
          </div>
        </Link>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Quick Action */}
        <div>
          <Link href="/dashboard">
            <Button variant="accent" size="sm" className="w-full justify-start gap-2.5 font-bold shadow-md shadow-indigo-500/20 rounded-xl h-10">
              <PlusCircle className="h-4 w-4" />
              <span>New Presentation</span>
            </Button>
          </Link>
        </div>

        {/* Primary Links */}
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === '/dashboard'
                ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-slate-900 border border-blue-200/60 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderOpen className={`h-4 w-4 ${pathname === '/dashboard' ? 'text-indigo-600' : 'text-slate-500'}`} />
            <span>My Presentations</span>
          </Link>
          <Link
            href="/presentation"
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
              pathname === '/presentation'
                ? 'bg-gradient-to-r from-blue-50 to-violet-50 text-slate-900 border border-blue-200/60 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Active Slide Deck</span>
            </div>
            <Badge variant="purple" className="text-[9px] py-0 px-1.5 font-mono">
              Live
            </Badge>
          </Link>
          {String((session?.user as any)?.role || '').toLowerCase() === 'admin' && (
            <Link
              href="/admin"
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/admin'
                  ? 'bg-gradient-to-r from-rose-50 to-red-50 text-rose-900 border border-rose-200/60 shadow-xs'
                  : 'text-rose-700 hover:text-rose-900 hover:bg-rose-50/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-rose-600" />
                <span>Admin Portal</span>
              </div>
              <Badge variant="outline" className="text-[9px] py-0 px-1.5 font-mono border-rose-200 text-rose-600 bg-rose-50">
                Admin
              </Badge>
            </Link>
          )}
        </div>

        {/* Recent Presentations List in Sidebar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-indigo-500" /> Recent Decks
            </span>
          </div>
          <div className="space-y-1">
            {recentPresentations.map(project => (
              <button
                key={project.id}
                onClick={() => selectRecentProject(project.id)}
                className="w-full text-left px-3 py-2.5 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors group cursor-pointer"
              >
                <div className="font-semibold truncate group-hover:text-indigo-600">
                  {project.title}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span className="font-medium text-indigo-600/80">{project.config.duration}</span>
                  <span>•</span>
                  <span>{project.slides.length} slides</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Workspace & User Footer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/80 space-y-2.5">
        {session?.user ? (
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl brand-mark text-white font-bold text-xs shadow-xs">
                {session.user.name?.[0]?.toUpperCase() || session.user.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">
                  {session.user.name || 'Pro Creator'}
                </div>
                <div className="text-[10px] text-slate-500 truncate font-mono">
                  {session.user.email || 'workspace@deckmind.ai'}
                </div>
              </div>
            </div>
            <Badge variant="gradient" className="text-[9px] py-0.5 px-1.5 font-mono shrink-0">
              PRO
            </Badge>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">DeckMind Studio</div>
                <div className="text-[10px] text-slate-500 font-mono">Pro Engine • 2026</div>
              </div>
            </div>
            <Link
              href="/login"
              className="text-[10px] font-bold text-indigo-700 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-2.5 py-1 rounded-lg transition-colors border border-indigo-200/60 shadow-2xs"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5 font-medium">
          <Link href="/" className="hover:text-indigo-600 transition-colors">
            Documentation
          </Link>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="hover:text-indigo-600 transition-colors">
              Account
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
