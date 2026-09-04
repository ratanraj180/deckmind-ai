'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  X,
  Download,
  Lock,
  CheckCircle2,
  Loader2,
  CreditCard,
  ShieldCheck,
  Sparkles,
  LogIn,
  Layers,
  Palette,
  Check,
  QrCode,
  Smartphone,
  ArrowRight,
  Timer,
  Zap,
  Radio,
  Shield,
  AlertCircle,
} from 'lucide-react';
import { usePresentation } from '@/context/PresentationContext';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open: () => void };
  }
}

export function PaymentModal({ isOpen, onClose, onSuccess }: PaymentModalProps) {
  const { activeProject, selectedTemplate } = usePresentation();
  const auth = useSession();
  const session = auth?.data;
  const authStatus = auth?.status ?? 'unauthenticated';
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'upi_qr' | 'gateway'>('upi_qr');

  // Demo Payment Simulation State (90-second countdown flow)
  const [isDemoSimulating, setIsDemoSimulating] = useState(false);
  const [demoCountdown, setDemoCountdown] = useState(90);
  const [demoStepStatus, setDemoStepStatus] = useState<'IDLE' | 'PROCESSING' | 'CONFIRMING' | 'VERIFYING' | 'COMPLETED'>('IDLE');

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsLoading(false);
      setIsSuccess(false);
      setPaymentId(null);
      setSelectedPaymentMethod('upi_qr');
      setIsDemoSimulating(false);
      setDemoCountdown(90);
      setDemoStepStatus('IDLE');
    }
  }, [isOpen]);

  // Handle demo countdown & automatic completion at 0s
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isDemoSimulating && demoCountdown > 0) {
      timer = setInterval(() => {
        setDemoCountdown(prev => {
          const next = prev - 1;
          if (next > 55) {
            setDemoStepStatus('PROCESSING');
          } else if (next > 20) {
            setDemoStepStatus('CONFIRMING');
          } else if (next > 0) {
            setDemoStepStatus('VERIFYING');
          }
          return next;
        });
      }, 1000);
    } else if (isDemoSimulating && demoCountdown === 0) {
      setDemoStepStatus('COMPLETED');
      completeDemoSimulation();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isDemoSimulating, demoCountdown]);

  const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise(resolve => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleProceedToPay = async () => {
    // 1. Require Authentication
    if (authStatus !== 'authenticated' || !session?.user) {
      router.push('/login?callbackUrl=/presentation');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // 2. Load Razorpay checkout script
      const loaded = await loadRazorpayScript();
      if (!loaded) {
        setError('Could not load payment gateway. Please check your internet connection.');
        setIsLoading(false);
        return;
      }

      // 3. Create server-side order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationId: activeProject.id,
          presentationTitle: activeProject.title,
          templateName: activeProject.template?.name ?? selectedTemplate.name,
          slideCount: activeProject.slides.length,
        }),
      });

      const orderData = (await orderRes.json().catch(() => ({}))) as {
        success: boolean;
        error?: string;
        orderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
      };

      if (!orderData.success || !orderData.orderId) {
        if (orderRes.status === 401) {
          router.push('/login?callbackUrl=/presentation');
          return;
        }
        setError(orderData.error ?? 'Failed to initialize payment gateway.');
        setIsLoading(false);
        return;
      }

      // 4. Open Razorpay Checkout Modal
      const razorpay = new window.Razorpay({
        key: orderData.keyId,
        amount: orderData.amount ?? 1000,
        currency: orderData.currency ?? 'INR',
        name: 'DeckMind AI',
        description: `${activeProject.title.slice(0, 35)} (${activeProject.slides.length} slides)`,
        order_id: orderData.orderId,
        handler: async (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) => {
          // 5. Server-side payment signature verification
          try {
            const verifyRes = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                presentationId: activeProject.id,
              }),
            });

            const verifyData = (await verifyRes.json().catch(() => ({}))) as {
              success: boolean;
              error?: string;
            };

            if (verifyData.success) {
              setPaymentId(response.razorpay_payment_id);
              setIsSuccess(true);
              setTimeout(() => {
                onSuccess();
              }, 1200);
            } else {
              setError(verifyData.error ?? 'Payment signature verification failed.');
            }
          } catch {
            setError('Payment verification failed. Please contact support.');
          }
          setIsLoading(false);
        },
        prefill: {
          name: session.user.name ?? '',
          email: session.user.email ?? '',
        },
        theme: {
          color: '#4F46E5', // DeckMind primary brand color
        },
        modal: {
          ondismiss: () => setIsLoading(false),
        },
      });

      razorpay.open();
    } catch (err) {
      console.error('[DeckMind Payment] Unexpected error:', err);
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const startUpiDemoSimulation = () => {
    if (authStatus !== 'authenticated' || !session?.user) {
      router.push('/login?callbackUrl=/presentation');
      return;
    }
    setError(null);
    setIsDemoSimulating(true);
    setDemoCountdown(90);
    setDemoStepStatus('PROCESSING');
  };

  const completeDemoSimulation = async () => {
    if (authStatus !== 'authenticated' || !session?.user) {
      router.push('/login?callbackUrl=/presentation');
      return;
    }

    setIsLoading(true);
    setError(null);
    const refId = 'UPI-DEMO-' + Math.random().toString(36).substring(2, 9).toUpperCase();
    setPaymentId(refId);

    try {
      // Record simulated payment attempt in MongoDB for analytics
      await fetch('/api/payments/demo-confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presentationId: activeProject.id,
          referenceId: refId,
        }),
      }).catch(err => {
        console.warn('[DeckMind Payment] Demo payment API notice:', err);
      });
    } catch (e) {
      console.warn('[DeckMind Payment] Recording demo notice:', e);
    }

    setIsLoading(false);
    setIsSuccess(true);
    setTimeout(() => {
      onSuccess();
    }, 1400);
  };

  const handleUpiPaymentCompleted = () => {
    // Require Authentication
    if (authStatus !== 'authenticated' || !session?.user) {
      router.push('/login?callbackUrl=/presentation');
      return;
    }

    if (!isDemoSimulating) {
      startUpiDemoSimulation();
    } else {
      completeDemoSimulation();
    }
  };

  if (!isOpen) return null;

  const isAuthenticated = authStatus === 'authenticated' && !!session?.user;
  const templateName = activeProject.template?.name ?? selectedTemplate.name;
  const slideCount = activeProject.slides.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-200/90 overflow-hidden text-slate-900 transition-all max-h-[92vh] flex flex-col">
        <div className="h-1.5 rainbow-bar shrink-0" />
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-150 flex items-start justify-between bg-slate-50/80 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-violet-600 uppercase tracking-wider mb-1 font-mono">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Download Presentation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 overflow-y-auto flex-1">
          {/* STATE 1: SUCCESS CONFIRMATION */}
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-gradient-to-tr from-emerald-100 to-teal-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                <CheckCircle2 className="h-8 w-8 animate-bounce" />
              </div>
              <div className="space-y-1">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200">
                  DEMO SIMULATION
                </span>
                <h3 className="text-xl font-black text-slate-900">Demo Payment Completed</h3>
              </div>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Simulation Reference: <span className="font-mono font-bold text-slate-700">{paymentId}</span>
              </p>
              <div className="p-3.5 bg-emerald-50/90 rounded-2xl border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center justify-center gap-2 shadow-xs">
                <Loader2 className="h-4 w-4 animate-spin text-emerald-600" />
                <span>Presentation unlocked! Preparing your PowerPoint (.pptx)...</span>
              </div>
            </div>

          /* STATE 2: NOT LOGGED IN */
          ) : !isAuthenticated ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100 shadow-xs">
                <LogIn className="h-7 w-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900">Sign in to Download</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Please log in or create an account to complete your ₹10 purchase and unlock your presentation.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => router.push('/login?callbackUrl=/presentation')}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 hover:opacity-95 text-white text-sm font-bold rounded-2xl shadow-lg shadow-violet-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In / Register</span>
                </button>
              </div>
            </div>

          /* STATE 3: PAYMENT METHOD SELECTION & PROCESSING */
          ) : (
            <>
              {/* Order Breakdown Summary Box */}
              <div className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Product
                    </span>
                    <span className="text-sm font-black text-slate-900 block leading-tight truncate">
                      {activeProject.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700 border border-violet-200 shrink-0">
                    .PPTX
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>{slideCount} slides</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Palette className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-semibold text-indigo-600">{templateName}</span>
                  </div>
                  <span>·</span>
                  <span className="text-emerald-600 font-bold font-mono">₹10.00</span>
                </div>
              </div>

              {/* Payment Method Selector Tabs */}
              <div className="flex rounded-2xl bg-slate-100/90 p-1 border border-slate-200/80 shadow-2xs">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPaymentMethod('upi_qr');
                    setError(null);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedPaymentMethod === 'upi_qr'
                      ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <QrCode className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Scan UPI QR</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPaymentMethod('gateway');
                    setError(null);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    selectedPaymentMethod === 'gateway'
                      ? 'bg-white text-indigo-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <CreditCard className="h-3.5 w-3.5 text-indigo-600" />
                  <span>Cards / NetBanking</span>
                </button>
              </div>

              {/* ── OPTION A: UPI QR CODE SECTION (WITH DEMO SIMULATION FLOW) ── */}
              {selectedPaymentMethod === 'upi_qr' && (
                <div className="space-y-4 pt-1">
                  {/* Demo Simulation Notice Banner */}
                  <div className="p-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl flex items-start gap-2.5 text-xs text-amber-900 shadow-2xs">
                    <div className="p-1 rounded-lg bg-amber-100/80 text-amber-700 shrink-0 mt-0.5">
                      <Radio className="h-3.5 w-3.5 animate-pulse text-amber-600" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 font-bold">
                        <span>Demo Payment Simulation Mode</span>
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-200/70 text-amber-800">
                          ₹10 Demo
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800/80 mt-0.5 leading-relaxed">
                        This is a simulated checkout flow for preview purposes. No real bank transfer is verified.
                      </p>
                    </div>
                  </div>

                  {/* UPI QR Display Card (Shown while countdown is active or before start, hidden once completed) */}
                  {demoStepStatus !== 'COMPLETED' ? (
                    <div className="rounded-3xl border border-violet-200 bg-gradient-to-b from-violet-50/50 via-white to-amber-50/30 p-5 text-center shadow-lg shadow-violet-500/5 space-y-3 relative overflow-hidden transition-all duration-300">
                      {/* Header */}
                      <div className="space-y-1">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-bold text-indigo-700 font-mono">
                          <Smartphone className="h-3.5 w-3.5 text-indigo-600" />
                          <span>Scan & Pay ₹10 via UPI</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Use Google Pay, PhonePe, Paytm, BHIM or any UPI app
                        </p>
                      </div>

                      {/* QR Code Container */}
                      <div className="relative mx-auto w-48 h-48 sm:w-52 sm:h-52 p-2 rounded-2xl bg-white border-2 border-slate-200 shadow-md flex items-center justify-center group overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/upi-qr.jpg"
                          alt="Scan & Pay ₹10 via UPI QR Code"
                          className="w-full h-full object-contain rounded-xl transition-all duration-300"
                        />

                        {/* Scanner Laser Animation when Simulating */}
                        {isDemoSimulating && (
                          <div className="absolute inset-x-2 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-lg shadow-cyan-400/80 animate-[bounce_2.5s_infinite] pointer-events-none" />
                        )}
                      </div>

                      {/* Live 90-Second Countdown & Animated Status Ticker */}
                      {isDemoSimulating ? (
                        <div className="space-y-2.5 pt-1">
                          {/* Countdown Timer Badge */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 font-mono text-xs font-bold shadow-2xs">
                            <Timer className="h-4 w-4 animate-spin text-indigo-600" />
                            <span>Simulation Timer: {demoCountdown}s remaining</span>
                          </div>

                          {/* Progress Bar (90s full) */}
                          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/80">
                            <div
                              className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-1000 ease-linear rounded-full"
                              style={{ width: `${Math.round(((90 - demoCountdown) / 90) * 100)}%` }}
                            />
                          </div>

                          {/* Dynamic Animated Status Text */}
                          <div className="p-2.5 rounded-xl bg-white/90 border border-slate-200/80 text-xs flex items-center justify-center gap-2 font-medium text-slate-700 shadow-2xs">
                            <Loader2 className="h-3.5 w-3.5 animate-spin text-indigo-600" />
                            {demoStepStatus === 'PROCESSING' && (
                              <span className="text-slate-800 font-semibold animate-pulse">
                                Processing payment simulation...
                              </span>
                            )}
                            {demoStepStatus === 'CONFIRMING' && (
                              <span className="text-indigo-700 font-semibold animate-pulse">
                                Waiting for confirmation from UPI network...
                              </span>
                            )}
                            {demoStepStatus === 'VERIFYING' && (
                              <span className="text-teal-700 font-semibold animate-pulse">
                                Finalizing transaction authorization...
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Supported Apps Ticker when not simulating */
                        <div className="pt-1 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-500">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-semibold text-slate-700">
                            GPay
                          </span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-semibold text-slate-700">
                            PhonePe
                          </span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-semibold text-slate-700">
                            Paytm
                          </span>
                          <span>•</span>
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/60 font-semibold text-slate-700">
                            BHIM
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* QR Code is HIDDEN when demo simulation is completed */
                    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-b from-emerald-50/70 to-teal-50/40 p-6 text-center space-y-3 shadow-lg shadow-emerald-500/5 animate-fade-in">
                      <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-emerald-200">
                        <CheckCircle2 className="h-7 w-7 text-emerald-600" />
                      </div>
                      <div className="space-y-1">
                        <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          COMPLETED
                        </span>
                        <h4 className="text-base font-extrabold text-slate-900">
                          Demo Payment Completed
                        </h4>
                        <p className="text-xs text-slate-500">
                          The PPT download button is now unlocked. You can download the file immediately.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="pt-1 space-y-2">
                    {!isDemoSimulating ? (
                      <button
                        onClick={startUpiDemoSimulation}
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        <Timer className="h-4 w-4" />
                        <span>Start 90s Demo Payment Simulation</span>
                      </button>
                    ) : demoCountdown > 0 ? (
                      <div className="w-full py-3.5 px-4 bg-slate-100/90 border border-slate-200/90 rounded-xl text-slate-600 text-xs font-semibold flex items-center justify-center gap-2 shadow-inner select-none">
                        <Lock className="h-4 w-4 text-amber-600 animate-pulse shrink-0" />
                        <span>Verifying UPI network transaction ({demoCountdown}s remaining)...</span>
                      </div>
                    ) : (
                      <button
                        onClick={completeDemoSimulation}
                        disabled={isLoading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:opacity-95 active:scale-[0.98] text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            <span>Unlocking PPT Download...</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            <span>I Have Completed Payment</span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* ── OPTION B: GATEWAY / CARDS / RAZORPAY SECTION ─────────── */}
              {selectedPaymentMethod === 'gateway' && (
                <div className="space-y-4 pt-1">
                  {/* Supported Payment Methods Quick Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-700">
                    <button
                      type="button"
                      onClick={() => setSelectedPaymentMethod('upi_qr')}
                      className="p-2.5 rounded-xl border border-indigo-200 bg-indigo-50/50 hover:bg-indigo-50 flex flex-col items-center gap-1 shadow-2xs cursor-pointer transition-colors"
                    >
                      <span className="font-extrabold text-indigo-700 text-xs">UPI QR</span>
                      <span className="text-[9px] text-indigo-500 font-semibold">Scan & Pay</span>
                    </button>
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-1 shadow-2xs">
                      <span className="font-bold text-slate-800 text-xs">Cards</span>
                      <span className="text-[9px] text-slate-400">Visa, MC, RuPay</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-1 shadow-2xs">
                      <span className="font-bold text-slate-800 text-xs">NetBanking</span>
                      <span className="text-[9px] text-slate-400">All Major Banks</span>
                    </div>
                  </div>

                  {/* Proceed via Razorpay Gateway Button */}
                  <div className="pt-2">
                    <button
                      onClick={handleProceedToPay}
                      disabled={isLoading}
                      className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 hover:opacity-95 active:scale-[0.98] text-white font-bold text-sm rounded-2xl shadow-lg shadow-violet-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Connecting to Razorpay...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-4 w-4" />
                          <span>Proceed to Pay ₹10</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-600 flex items-start gap-2">
                  <span className="font-bold shrink-0">Notice:</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Security Badge */}
              <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 pt-1">
                <Lock className="h-3 w-3 text-slate-400" />
                <span>100% Secure Checkout · Instant Download · One-Time Fee</span>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-150 flex items-center justify-between text-[10px] text-slate-400 font-mono shrink-0">
          <span>Unified Payments Interface (UPI)</span>
          <span>256-Bit SSL Encryption</span>
        </div>
      </div>
    </div>
  );
}

// Standalone download trigger component for the presentation header
export function DownloadButton() {
  const { activeProject } = usePresentation();
  const [showPayment, setShowPayment] = useState(false);
  const [isPaid, setIsPaid] = useState(activeProject.isPaid ?? false);
  const [isDownloading, setIsDownloading] = useState(false);

  const triggerPptxDownload = async () => {
    setIsDownloading(true);
    try {
      const res = await fetch(`/api/presentations/${activeProject.id}/download`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: activeProject,
        }),
      });

      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const cleanName = (activeProject.title || 'Presentation')
          .replace(/[^a-z0-9]/gi, '_')
          .replace(/_+/g, '_')
          .slice(0, 45);
        a.download = `${cleanName}_DeckMind.pptx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        console.error('[DeckMind Download] Failed:', res.status);
      }
    } catch (err) {
      console.error('[DeckMind Download] Error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleClick = () => {
    if (!isPaid) {
      setShowPayment(true);
    } else {
      triggerPptxDownload();
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={isDownloading}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
          isPaid
            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:opacity-95 text-white shadow-md shadow-emerald-600/20'
            : 'bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 hover:opacity-95 text-white shadow-md shadow-violet-600/20'
        } disabled:opacity-75`}
      >
        {isDownloading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Building PPTX...</span>
          </>
        ) : isPaid ? (
          <>
            <Download className="h-4 w-4" />
            <span>Download PPTX</span>
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            <span>Download PPTX · ₹10</span>
          </>
        )}
      </button>

      <PaymentModal
        isOpen={showPayment}
        onClose={() => setShowPayment(false)}
        onSuccess={() => {
          setIsPaid(true);
          setShowPayment(false);
          setTimeout(() => {
            triggerPptxDownload();
          }, 300);
        }}
      />
    </>
  );
}
