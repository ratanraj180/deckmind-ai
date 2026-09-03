import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/landing/Hero';
import { TransformationDemo } from '@/components/landing/TransformationDemo';
import { AIIntelligenceHub } from '@/components/landing/AIIntelligenceHub';
import { VisualIntelligenceShowcase } from '@/components/landing/VisualIntelligenceShowcase';
import { UseCasesSection } from '@/components/landing/UseCasesSection';
import { DarkWorkspaceShowcase } from '@/components/landing/DarkWorkspaceShowcase';
import { SimplePricing } from '@/components/landing/SimplePricing';
import { Footer } from '@/components/layout/Footer';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fafafb]">
      <Navbar />
      <main className="flex-1">
        {/* SECTION 1 — HERO */}
        <Hero />

        {/* SECTION 2 — PRODUCT DEMO / TRANSFORMATION */}
        <TransformationDemo />

        {/* SECTION 3 — AI INTELLIGENCE HUB */}
        <AIIntelligenceHub />

        {/* SECTION 4 — VISUAL INTELLIGENCE SHOWCASE */}
        <VisualIntelligenceShowcase />

        {/* SECTION 5 — USE CASES */}
        <UseCasesSection />

        {/* SECTION 6 — OUTPUT SHOWCASE (DARK SECTION) */}
        <DarkWorkspaceShowcase />

        {/* SECTION 7 — SIMPLE PRICING */}
        <SimplePricing />
      </main>
      <Footer />
    </div>
  );
}
