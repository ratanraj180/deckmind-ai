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
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col justify-between h-screen sticky top-0 shrink-0">
      {/* Top Header & Brand */}
      <div className="p-4 border-b border-slate-150">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white shadow-xs">
            <Layers className="h-4 w-4 text-indigo-400" />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-base tracking-tight text-slate-900">DeckMind</span>
              <span className="font-semibold text-base tracking-tight text-indigo-600">AI</span>
            </div>
            <span className="text-[10px] text-slate-400 font-mono block -mt-1">Workspace v1.0</span>
          </div>
        </Link>
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Quick Action */}
        <div>
          <Link href="/dashboard">
            <Button variant="accent" size="sm" className="w-full justify-start gap-2 shadow-xs">
              <PlusCircle className="h-4 w-4" />
              <span>New Presentation</span>
            </Button>
          </Link>
        </div>

        {/* Primary Links */}
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              pathname === '/dashboard'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <FolderOpen className="h-4 w-4 text-slate-500" />
            <span>My Presentations</span>
          </Link>
          <Link
            href="/presentation"
            className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
              pathname === '/presentation'
                ? 'bg-slate-100 text-slate-900 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="h-4 w-4 text-indigo-600" />
              <span>Active Slide Deck</span>
            </div>
            <Badge variant="indigo" className="text-[9px] py-0 px-1">
              10 slides
            </Badge>
          </Link>
        </div>

        {/* Recent Presentations List in Sidebar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-3 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Recent Projects
            </span>
          </div>
          <div className="space-y-1">
            {recentPresentations.map(project => (
              <button
                key={project.id}
                onClick={() => selectRecentProject(project.id)}
                className="w-full text-left px-3 py-2 rounded-lg text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors group"
              >
                <div className="font-medium truncate group-hover:text-indigo-600">
                  {project.title}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                  <span>{project.config.duration}</span>
                  <span>•</span>
                  <span>{project.slides.length} slides</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Professional Workspace & User Footer */}
      <div className="p-3 border-t border-slate-200 bg-slate-50/70 space-y-2.5">
        {session?.user ? (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white font-bold text-xs shadow-xs">
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
            <Badge variant="indigo" className="text-[9px] py-0.5 px-1.5 font-mono shrink-0">
              PRO
            </Badge>
          </div>
        ) : (
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">DeckMind Studio</div>
                <div className="text-[10px] text-slate-500 font-mono">Pro Engine • v2.4</div>
              </div>
            </div>
            <Link
              href="/login"
              className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-md transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}

        <div className="flex items-center justify-between text-[11px] text-slate-500 px-1 pt-0.5">
          <Link href="/" className="hover:text-slate-800 transition-colors">
            Documentation
          </Link>
          {session?.user ? (
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="hover:text-red-600 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="hover:text-slate-800 transition-colors">
              Account
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
