import { SlideData } from '@/types/presentation';

export interface NormalizedItem {
  id: string;
  number: string;
  title: string;
  desc: string;
  tag?: string;
  stat?: string;
}

export function extractNormalizedContent(slide: SlideData) {
  const content = (slide.content || {}) as Record<string, any>;

  // 1. Extract Items
  let items: NormalizedItem[] = [];

  if (Array.isArray(content.pillars) && content.pillars.length > 0) {
    items = content.pillars.map((p: any, i: number) => ({
      id: `p-${i}`,
      number: p.number || `0${i + 1}`,
      title: p.title || `Capability 0${i + 1}`,
      desc: p.desc || '',
      tag: p.tag,
    }));
  } else if (Array.isArray(content.layers) && content.layers.length > 0) {
    items = content.layers.map((l: any, i: number) => ({
      id: `l-${i}`,
      number: `0${i + 1}`,
      title: l.node || l.name || `Layer 0${i + 1}`,
      desc: l.details || '',
      tag: l.type,
    }));
  } else if (Array.isArray(content.steps) && content.steps.length > 0) {
    items = content.steps.map((s: any, i: number) => ({
      id: `s-${i}`,
      number: s.step || `0${i + 1}`,
      title: s.name || `Stage 0${i + 1}`,
      desc: s.desc || '',
      tag: s.tech,
    }));
  } else if (Array.isArray(content.items) && content.items.length > 0) {
    items = content.items.map((it: any, i: number) => ({
      id: `it-${i}`,
      number: `0${i + 1}`,
      title: it.component || `Node 0${i + 1}`,
      desc: it.spec || '',
      tag: it.cost,
    }));
  } else if (Array.isArray(content.benchmarks) && content.benchmarks.length > 0) {
    items = content.benchmarks.map((b: any, i: number) => ({
      id: `b-${i}`,
      number: `0${i + 1}`,
      title: b.label || `Benchmark 0${i + 1}`,
      desc: b.change || 'Empirically verified SLA',
      stat: b.value,
      tag: b.status,
    }));
  } else if (Array.isArray(content.bullets) && content.bullets.length > 0) {
    items = content.bullets.map((b: string, i: number) => ({
      id: `b-${i}`,
      number: `0${i + 1}`,
      title: `Finding 0${i + 1}`,
      desc: b,
    }));
  }

  // Fallback if empty
  if (items.length === 0) {
    items = [
      { id: '1', number: '01', title: 'System Architecture', desc: 'Modular core components operating under low-latency constraints.' },
      { id: '2', number: '02', title: 'Execution Pipeline', desc: 'Asynchronous event pipeline with verified throughput guarantees.' },
      { id: '3', number: '03', title: 'Production Impact', desc: 'High-availability architecture validated through empirical stress testing.' },
    ];
  }

  // 2. Extract Metrics
  const metrics = Array.isArray(content.metrics) && content.metrics.length > 0
    ? content.metrics
    : Array.isArray(content.benchmarks) && content.benchmarks.length > 0
    ? content.benchmarks
    : [
        { label: 'System Accuracy', value: '99.4%' },
        { label: 'Inference SLA', value: '42ms' },
        { label: 'Reliability', value: '100%' },
      ];

  const kicker = content.kicker || slide.category?.toUpperCase() || 'SYSTEM ANALYSIS';
  const subtitle = slide.subtitle || content.keyTakeaway || '';

  return {
    items,
    metrics,
    kicker,
    subtitle,
    rawContent: content,
    isTitleSlide: slide.visualType === 'title',
  };
}
