import { DocumentAnalysis } from '@/types/document';

export interface ParseProgressCallback {
  (stage: 'reading' | 'extracting' | 'structuring' | 'complete'): void;
}

export async function parseDocumentFile(
  file: File,
  onProgress?: ParseProgressCallback
): Promise<DocumentAnalysis> {
  onProgress?.('reading');

  const formData = new FormData();
  formData.append('file', file);

  onProgress?.('extracting');

  const response = await fetch('/api/parse-document', {
    method: 'POST',
    body: formData,
  });

  onProgress?.('structuring');

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.error || 'Failed to parse document content.');
  }

  onProgress?.('complete');
  return data.document as DocumentAnalysis;
}

export function createSampleDocumentAnalysis(): DocumentAnalysis {
  return {
    id: 'doc-sample-attendance-viva',
    fileName: 'Smart_Attendance_System_Final_Report_v2.4.pdf',
    fileType: 'pdf',
    fileSize: 3420000,
    pageCount: 42,
    title: 'Smart Attendance System using Deep Facial Recognition & Edge Computing',
    summary:
      'Autonomous contactless attendance management leveraging NVIDIA Jetson Nano edge nodes and 128-dimensional FaceNet embeddings with real-time RTSP streams.',
    fullText:
      'Smart Attendance System using Deep Facial Recognition & Edge Computing. Capstone Project Final Viva Defense. In lecture halls with over 100 students, traditional roll calls waste 15% of instructional time while fingerprint biometrics create physical queues. We propose an autonomous edge vision architecture using Sony IMX477 sensors and NVIDIA Jetson Nano modules...',
    pages: [
      {
        pageNumber: 1,
        text: 'Title & Overview: Smart Attendance System using Deep Facial Recognition...',
        characterCount: 650,
      },
      {
        pageNumber: 2,
        text: 'Problem Statement: Traditional biometric bottlenecks & manual proxy issues...',
        characterCount: 920,
      },
    ],
    sections: [
      {
        id: 'sec-1',
        title: 'Introduction & Project Scope',
        content:
          'Attendance monitoring in university lecture halls with over 100 students is prone to proxy attendance and massive instructional time loss. This capstone project deploys an on-premise edge computing pipeline.',
        pageNumbers: [1, 2],
        keyPoints: [
          'Manual attendance consumes 12 to 15 minutes per lecture session.',
          'Physical fingerprint scanners suffer from biological hygiene and bottleneck delays.',
          'Proposes an ambient zero-touch edge computer vision pipeline.',
        ],
        wordCount: 480,
      },
      {
        id: 'sec-2',
        title: 'Problem Statement & Existing Bottlenecks',
        content:
          'Manual roll-calls waste 12-15 minutes per lecture hour. Fingerprint biometric sensors suffer biological hygiene concerns, optical sensor degradation, and severe queue congestion at classroom entryways.',
        pageNumbers: [3, 5],
        keyPoints: [
          'High instructional overhead in engineering lecture halls.',
          'Proxy attendance rate exceeds 18% in large classes.',
          'Queue latency of 3.2 seconds per student creates doorway congestion.',
        ],
        wordCount: 620,
      },
      {
        id: 'sec-3',
        title: 'Proposed Solution: Zero-Touch Edge Architecture',
        content:
          'Zero-touch edge computer vision architecture. Sony IMX477 sensors stream 4K frames to NVIDIA Jetson Nano modules. Multi-face localization runs in parallel with sub-150ms total loop latency.',
        pageNumbers: [6, 12],
        keyPoints: [
          'Ambient wide-angle RTSP stream captures entire lecture benches.',
          'Local processing on NVIDIA Jetson Nano keeps biometrics on-premise.',
          'Sub-150ms total inference loop preserves classroom focus.',
        ],
        wordCount: 890,
      },
      {
        id: 'sec-4',
        title: 'Deep Learning Pipeline & Embedding Space',
        content:
          'MTCNN generates 5-point facial landmarks and affine alignment transforms. FaceNet backbone extracts normalized 128-D Euclidean vectors. L2 distance thresholding guarantees 99.4% cross-validation accuracy.',
        pageNumbers: [13, 20],
        keyPoints: [
          'MTCNN multi-scale pyramid handles face orientation and scale.',
          'FaceNet Triplet Loss maps facial features to Euclidean hypersphere.',
          'Calibrated 0.68 distance threshold eliminates false positive matches.',
        ],
        wordCount: 1140,
      },
      {
        id: 'sec-5',
        title: 'Anti-Spoofing & Liveness Verification',
        content:
          'Local Binary Pattern (LBP) texture descriptors and specular reflection heuristics reject printed photographs and smartphone screen playback attacks.',
        pageNumbers: [21, 27],
        keyPoints: [
          'LBP texture analysis identifies digital screen pixel moiré patterns.',
          'Specular reflection sensors detect glassy phone surfaces.',
          'Guarantees zero surrogate attendance via fake photographs.',
        ],
        wordCount: 710,
      },
      {
        id: 'sec-6',
        title: 'Experimental Results & Performance Benchmarks',
        content:
          'Empirical evaluations across 240 lecture sessions demonstrated 99.4% accuracy in daylight conditions and 94.2% accuracy under 45-degree angled lighting with medical face masks.',
        pageNumbers: [28, 35],
        keyPoints: [
          '99.4% recognition accuracy sustained in optimal classroom lighting.',
          '142ms pipeline latency allows continuous real-time video processing.',
          'Zero false attendance marks recorded during 4-week pilot test.',
        ],
        wordCount: 950,
      },
      {
        id: 'sec-7',
        title: 'Hardware Bill of Materials & Economic Feasibility',
        content:
          'Total hardware expenditure per classroom unit is ₹18,500 ($220 USD), amortizing to less than ₹20 per student over a 4-year degree curriculum.',
        pageNumbers: [36, 40],
        keyPoints: [
          'Total unit cost under ₹18,500 per lecture hall.',
          '1/4th the price of commercial biometric RFID turnstiles.',
          'Low power consumption (10W max) under full GPU load.',
        ],
        wordCount: 380,
      },
      {
        id: 'sec-8',
        title: 'Conclusion & Viva Defense Readiness',
        content:
          'Demonstrated a production-grade, privacy-compliant edge system that eliminates proxy attendance while keeping biometric records 100% on-premise.',
        pageNumbers: [41, 42],
        keyPoints: [
          'Eliminates 100% of proxy attendance in lecture halls.',
          'Zero cloud video transmission complies with biometric privacy laws.',
          'Open for external examiner cross-examination and queries.',
        ],
        wordCount: 410,
      },
    ],
    metadata: {
      author: 'Research Team • Department of Computer Science',
      creationDate: '2026-09-02T10:30:00Z',
      characterCount: 38400,
      wordCount: 5580,
      readingTimeMinutes: 28,
    },
    extractedAt: new Date().toISOString(),
  };
}
