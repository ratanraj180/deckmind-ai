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

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setIsLoading(false);
      setIsSuccess(false);
      setPaymentId(null);
    }
  }, [isOpen]);

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

  if (!isOpen) return null;

  const isAuthenticated = authStatus === 'authenticated' && !!session?.user;
  const templateName = activeProject.template?.name ?? selectedTemplate.name;
  const slideCount = activeProject.slides.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden text-slate-900 transition-all">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
              <ShieldCheck className="h-4 w-4" />
              <span>Secure Checkout</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">Download Presentation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* STATE 1: SUCCESS CONFIRMATION */}
          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="h-8 w-8 animate-bounce" />
              </div>
              <h3 className="text-lg font-black text-slate-900">Payment Verified!</h3>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Payment ID: <span className="font-mono font-medium text-slate-700">{paymentId}</span>
              </p>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 font-medium flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generating and downloading your PowerPoint (.pptx)...</span>
              </div>
            </div>

          /* STATE 2: NOT LOGGED IN */
          ) : !isAuthenticated ? (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto border border-indigo-100">
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
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Sign In / Register</span>
                </button>
              </div>
            </div>

          /* STATE 3: ORDER SUMMARY MODAL */
          ) : (
            <>
              {/* Order Breakdown Box */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Product
                    </span>
                    <span className="text-sm font-black text-slate-900 block leading-tight">
                      DeckMind AI Presentation
                    </span>
                    <span className="text-xs text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {activeProject.title}
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200 flex-shrink-0">
                    .PPTX
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs text-slate-600 pt-1">
                  <div className="flex items-center gap-1">
                    <Layers className="h-3.5 w-3.5 text-slate-400" />
                    <span>{slideCount} slides</span>
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Palette className="h-3.5 w-3.5 text-slate-400" />
                    <span className="font-semibold text-indigo-600">{templateName}</span>
                  </div>
                </div>

                {/* Price Line Items */}
                <div className="pt-3 border-t border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Base Price</span>
                    <span>₹10.00</span>
                  </div>
                  <div className="flex justify-between text-slate-500 text-[11px]">
                    <span>Taxes & Processing Fee</span>
                    <span className="text-emerald-600 font-medium">Included (₹0.00)</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                    <span>Total Payable</span>
                    <span className="text-2xl font-black text-indigo-600 font-mono">₹10</span>
                  </div>
                </div>
              </div>

              {/* Supported Payment Methods */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 tracking-wider">
                  Supported Payment Methods
                </span>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px] font-medium text-slate-700">
                  <div className="p-2 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-1 shadow-sm">
                    <span className="font-black text-indigo-600 text-xs">UPI</span>
                    <span className="text-[9px] text-slate-400">GPay, PhonePe</span>
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-1 shadow-sm">
                    <span className="font-black text-indigo-600 text-xs">Cards</span>
                    <span className="text-[9px] text-slate-400">Visa, MC, RuPay</span>
                  </div>
                  <div className="p-2 rounded-xl border border-slate-200 bg-white flex flex-col items-center gap-1 shadow-sm">
                    <span className="font-black text-indigo-600 text-xs">NetBanking</span>
                    <span className="text-[9px] text-slate-400">All Major Banks</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600 flex items-start gap-2">
                  <span className="font-bold flex-shrink-0">Notice:</span>
                  <span>{error}</span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  onClick={handleProceedToPay}
                  disabled={isLoading}
                  className="w-full py-3.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold text-sm rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
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

              {/* Security Badge */}
              <p className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3 text-slate-400" />
                <span>100% Secure Checkout · Instant Download · One-Time Fee</span>
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
          <span>Powered by Razorpay</span>
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
            ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
            : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/20'
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
