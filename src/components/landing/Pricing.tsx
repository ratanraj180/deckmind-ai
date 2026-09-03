import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function Pricing() {
  const tiers = [
    {
      name: 'Student Starter',
      badge: 'Free Forever',
      price: '₹0',
      period: 'always free',
      description: 'Perfect for quick college assignments and single seminar presentations.',
      features: [
        '3 presentations per month',
        'PDF & DOCX upload up to 15 pages',
        'Up to 10 slides per deck',
        'Core visual layouts (Flowcharts & Metrics)',
        'Standard PowerPoint (.pptx) download',
        'AI Speaker Notes generation',
      ],
      cta: 'Start Free',
      popular: false,
    },
    {
      name: 'Pro Scholar & Viva',
      badge: 'Most Popular for Viva',
      price: '₹399',
      period: '/ month',
      description: 'Everything you need to ace your Final Year Project Viva and Seminar defense.',
      features: [
        'Unlimited presentation generations',
        'Large documents up to 80 pages (Thesis & IEEE)',
        'Up to 25 custom slides per deck',
        'Complete Visual Intelligence (Architecture, Pipeline, BOM)',
        'Anticipated Viva Defense Q&A Generator',
        'Priority AI Storytelling Engine',
        'High-resolution editable vector PPTX export',
      ],
      cta: 'Get Pro Scholar',
      popular: true,
    },
    {
      name: 'Research Lab / Dept',
      badge: 'Team & College',
      price: '₹999',
      period: '/ month',
      description: 'For research laboratories, student project groups, and faculty mentors.',
      features: [
        'Everything in Pro Scholar',
        '5 collaborator seats for group projects',
        'Institutional template branding & logo watermarks',
        'LaTeX / BibTeX citation preservation',
        'Dedicated export formatting & priority support',
      ],
      cta: 'Upgrade to Lab Plan',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 border-t border-slate-200/80 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-16 space-y-3">
          <Badge variant="indigo">Simple, Transparent Pricing</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Designed for students and academic budgets
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Start completely free. Upgrade only when preparing for your comprehensive project viva or
            conference presentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl border p-8 flex flex-col justify-between transition-all ${
                tier.popular
                  ? 'border-indigo-600 bg-white shadow-xl shadow-indigo-100/50 ring-1 ring-indigo-600'
                  : 'border-slate-200 bg-white shadow-xs hover:border-slate-300'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge variant="indigo" className="bg-indigo-600 text-white font-medium shadow-xs">
                    {tier.badge}
                  </Badge>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-slate-900">{tier.name}</h3>
                  {!tier.popular && <Badge variant="secondary">{tier.badge}</Badge>}
                </div>
                <p className="text-xs text-slate-500 mb-6">{tier.description}</p>

                <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-100">
                  <span className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    {tier.price}
                  </span>
                  <span className="text-xs text-slate-500">{tier.period}</span>
                </div>

                <div className="space-y-3 mb-8">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    What&apos;s included
                  </span>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/dashboard" className="w-full">
                <Button
                  variant={tier.popular ? 'accent' : 'secondary'}
                  size="md"
                  className="w-full justify-center"
                >
                  <span>{tier.cta}</span>
                  <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
