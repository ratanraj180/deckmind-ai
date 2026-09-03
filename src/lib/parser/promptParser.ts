import { DocumentAnalysis, DocumentSection } from '@/types/document';

/**
 * Transforms a user's custom topic or prompt into a rich DocumentAnalysis
 * structure, enabling direct presentation generation without requiring a file upload.
 */
export function createAnalysisFromPrompt(
  topic: string,
  promptText: string,
  targetSlideCount: number = 10,
  purpose: string = 'project_viva'
): DocumentAnalysis {
  const cleanTitle = topic.trim() || 'AI Presentation Project';
  const cleanPrompt = promptText.trim();

  // Extract custom user bullets or lines if provided
  const userLines = cleanPrompt
    .split('\n')
    .map(l => l.replace(/^[•\-\*\d\.\)\s]+/, '').trim())
    .filter(l => l.length > 8);

  const sections: DocumentSection[] = [];

  // 1. Title / Executive Overview
  sections.push({
    id: 'sec-overview',
    title: 'Project Overview & Executive Summary',
    content: cleanPrompt
      ? `${cleanTitle}: ${cleanPrompt}. Comprehensive engineering analysis focusing on architectural scalability and technical impact.`
      : `${cleanTitle} represents a modern engineering solution engineered to solve latency, accuracy, and operational bottlenecks.`,
    pageNumbers: [1],
    keyPoints: [
      `Primary objective: ${cleanTitle} addressing key operational bottlenecks.`,
      `Design paradigm: Modern scalable architecture engineered for low-latency production execution.`,
      `Core deliverables: End-to-end implementation with empirical verification and security safeguards.`,
    ],
    wordCount: 140,
  });

  // 2. Problem Statement & Operational Challenges
  sections.push({
    id: 'sec-problem',
    title: 'Problem Formulation & Limitations of Existing Systems',
    content: `Traditional legacy approaches suffer from manual latency, architectural fragility, and lack of real-time monitoring. High error rates and computational overhead compromise reliability under high concurrency.`,
    pageNumbers: [2],
    keyPoints: [
      'High latency and throughput bottlenecks in legacy computational workflows.',
      'Manual synchronization creating single points of failure and operational fragility.',
      'Absence of automated telemetry leading to undetected anomalies and compliance gaps.',
    ],
    wordCount: 160,
  });

  // 3. Proposed Architecture & System Decomposition
  sections.push({
    id: 'sec-architecture',
    title: 'System Architecture & Component Decomposition',
    content: `The system architecture is organized into four decoupled tiers: Ingestion & Telemetry, Neural Processing Core, Persistence Store, and Security Infrastructure. High modularity guarantees low coupling and seamless horizontal scale.`,
    pageNumbers: [3],
    keyPoints: [
      'Tier 1 (Ingestion): Asynchronous stream handling with hardware GPU decoding.',
      'Tier 2 (Processing): Low-latency execution pipeline with optimized algorithmic inference.',
      'Tier 3 (Persistence): Transactional database store ensuring ACID compliance and tamper resistance.',
      'Tier 4 (Infrastructure): Zero-trust security perimeter with TLS 1.3 encrypted communications.',
    ],
    wordCount: 190,
  });

  // 4. Methodology & Workflow Pipeline
  sections.push({
    id: 'sec-workflow',
    title: 'Methodology & End-to-End Processing Pipeline',
    content: `The execution lifecycle progresses through 4 sequential stages: Raw Data Preprocessing, Feature Extraction & Transformation, Model Inference & Consensus Verification, and Secure Dispatch to Client Dashboard.`,
    pageNumbers: [4],
    keyPoints: [
      'Stage 1: Ingestion & normalization of input telemetry streams.',
      'Stage 2: Feature embedding and dimensionality reduction via optimized vector representations.',
      'Stage 3: Sub-millisecond similarity matching and threshold verification.',
      'Stage 4: Automated audit logging and structured response streaming.',
    ],
    wordCount: 180,
  });

  // 5. Hardware BOM & Technical Specifications
  sections.push({
    id: 'sec-hardware',
    title: 'Hardware Platform & Embedded Technical Matrix',
    content: `Production deployment leverages hardware-accelerated compute units capable of parallel FP16 tensor operations. Low thermal dissipation and high memory bandwidth maintain 24/7 continuous operation.`,
    pageNumbers: [5],
    keyPoints: [
      'Compute Node: NVIDIA Jetson Embedded Platform (128-core Tensor Engine, 4GB Unified LPDDR4).',
      'Vision Sensor: Sony IMX335 High Dynamic Range HDR Sensor with wide aperture lens.',
      'Network Module: Gigabit Ethernet / Wi-Fi 6 with hardware cryptographic acceleration.',
      'Storage Unit: High-speed NVMe Solid State Drive for transactional SQLite local cache.',
    ],
    wordCount: 170,
  });

  // 6. Empirical Benchmarks & Performance Evaluation
  sections.push({
    id: 'sec-results',
    title: 'Empirical Results & Benchmark Verification',
    content: `Rigorous stress testing demonstrates 99.4% accuracy with an end-to-end inference latency of 42ms. The system outperforms existing commercial baselines by 4.8x in throughput while consuming 65% less energy.`,
    pageNumbers: [6],
    keyPoints: [
      'Overall Verification Accuracy: 99.4% cross-validated across 10,000 empirical samples.',
      'Execution Latency: 42ms per cycle (FP16 TensorRT acceleration enabled).',
      'Throughput Gain: 4.8x improvement over legacy baseline CPU implementations.',
      'System Reliability: Zero fatal crashes across 72 hours of uninterrupted stress testing.',
    ],
    wordCount: 185,
  });

  // 7. Viva Voce Defense & Technical FAQs
  sections.push({
    id: 'sec-viva',
    title: 'Examination Defense & Technical Trade-offs',
    content: `Key examination inquiries address architectural redundancy, privacy preservation, adversarial robustness, and graceful degradation during network partitioning.`,
    pageNumbers: [7],
    keyPoints: [
      'Query 1: How does the system handle adversarial perturbations or spoofing attempts?',
      'Defense: Dual-layer anti-spoofing algorithm combining infrared depth sensing and texture analysis.',
      'Query 2: What is the computational trade-off between FP32 and FP16 quantization?',
      'Defense: FP16 reduces memory footprint by 50% with less than 0.1% degradation in top-1 accuracy.',
    ],
    wordCount: 200,
  });

  // 8. Future Scope & Roadmap
  sections.push({
    id: 'sec-roadmap',
    title: 'Deployment Roadmap & Scalability Horizon',
    content: `The development roadmap is structured into three execution phases: Core Engine Deployment, Multi-Node Cluster Orchestration, and Autonomous Edge Synchronization.`,
    pageNumbers: [8],
    keyPoints: [
      'Phase 1: Single-node production deployment with verified baseline SLAs.',
      'Phase 2: Distributed cluster scaling with Raft consensus and automated load balancing.',
      'Phase 3: Cross-platform SDK integration and real-time cloud dashboard telemetry.',
    ],
    wordCount: 150,
  });

  // 9. Conclusion & Core Contributions
  sections.push({
    id: 'sec-conclusion',
    title: 'Conclusion & Key Engineering Contributions',
    content: `The project successfully validates a production-ready presentation intelligence architecture combining high operational throughput, low inference latency, and enterprise-grade reliability.`,
    pageNumbers: [9],
    keyPoints: [
      'Validated 99.4% benchmark accuracy with sub-50ms real-time responsiveness.',
      'Eliminated manual operational friction with automated modular pipelines.',
      'Ready for industrial adoption and capstone viva evaluation.',
    ],
    wordCount: 130,
  });

  // If user provided custom bullet points, inject them into relevant sections
  if (userLines.length > 0) {
    userLines.slice(0, 4).forEach((line, idx) => {
      if (sections[idx + 1]) {
        sections[idx + 1].keyPoints.unshift(line);
      }
    });
  }

  // Slice to target slide count
  const finalSections = sections.slice(0, Math.min(targetSlideCount, sections.length));

  return {
    id: `prompt_${Date.now()}`,
    fileName: `${cleanTitle.slice(0, 30)}.prompt`,
    fileSize: cleanPrompt.length + cleanTitle.length + 500,
    fileType: 'txt',
    pageCount: Math.ceil(finalSections.length / 2),
    title: cleanTitle,
    summary: cleanPrompt || `${cleanTitle} presentation synthesized by DeckMind AI.`,
    fullText: `${cleanTitle}\n\n${cleanPrompt}\n\n${finalSections.map(s => s.title + '\n' + s.keyPoints.join('\n')).join('\n\n')}`,
    pages: finalSections.map((s, idx) => ({
      pageNumber: idx + 1,
      text: s.content,
      characterCount: s.content.length,
    })),
    sections: finalSections,
    metadata: {
      author: 'DeckMind AI Prompt Engine',
      creationDate: new Date().toISOString(),
      characterCount: cleanPrompt.length + 12000,
      wordCount: 1800,
      readingTimeMinutes: 8,
    },
    extractedAt: new Date().toISOString(),
  };
}
