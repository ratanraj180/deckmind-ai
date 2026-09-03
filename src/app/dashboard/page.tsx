'use client';

import React from 'react';
import { DashboardSidebar } from '@/components/layout/DashboardSidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { UploadDropzone } from '@/components/dashboard/UploadDropzone';
import { RecentPresentations } from '@/components/dashboard/RecentPresentations';

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex bg-[#fafafb]">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader
          title="Presentation Studio"
          subtitle="Transform documents into presentations"
        />

        <main className="flex-1 p-6 sm:p-10 max-w-5xl mx-auto w-full space-y-10">
          {/* Main Focus Heading */}
          <div className="space-y-1 text-center sm:text-left">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
              What are you presenting today?
            </h1>
            <p className="text-sm text-slate-500 max-w-xl">
              Upload your research paper, project viva report, or assignment to generate an
              audience-aware slide deck.
            </p>
          </div>

          {/* Primary Visual Element: Upload Dropzone */}
          <UploadDropzone />

          {/* Recent Presentations */}
          <div className="pt-4 border-t border-slate-200">
            <RecentPresentations />
          </div>
        </main>
      </div>
    </div>
  );
}
