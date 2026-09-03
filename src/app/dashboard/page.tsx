'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { UploadDropzone } from '@/components/dashboard/UploadDropzone';
import { RecentPresentations } from '@/components/dashboard/RecentPresentations';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex mesh-canvas">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Presentation Studio"
          subtitle="Transform documents into high-impact presentations"
        />

        <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-10">
          {/* Main Focus Heading */}
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 leading-tight">
              What are you presenting{' '}
              <span className="gradient-text">
                today?
              </span>
            </h1>
            <p className="text-sm text-slate-500 max-w-xl font-normal">
              Upload your research paper, project viva report, or assignment manuscript to generate an
              audience-aware, stunning slide deck.
            </p>
          </div>

          {/* Primary Visual Element: Upload Dropzone */}
          <UploadDropzone />

          {/* Recent Presentations */}
          <div className="pt-4 border-t border-slate-200/80">
            <RecentPresentations />
          </div>
        </main>
      </div>
    </div>
  );
}
