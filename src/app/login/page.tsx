'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, ArrowRight, Layers } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    if (mode === 'signup') {
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password, name: cleanName }),
        });
        const data = (await res.json().catch(() => ({}))) as { success: boolean; error?: string };
        if (!data.success) {
          setError(data.error ?? 'Registration failed. Please check your details and try again.');
          setIsLoading(false);
          return;
        }
      } catch (err: any) {
        setError(err?.message || 'Network error occurred during registration. Please try again.');
        setIsLoading(false);
        return;
      }
      // Auto-login after registration
    }

    const result = await signIn('credentials', {
      email: cleanEmail,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid email or password. Please try again.');
      setIsLoading(false);
      return;
    }

    // Redirect back or to dashboard
    const callbackUrl = new URLSearchParams(window.location.search).get('callbackUrl') ?? '/dashboard';
    router.push(callbackUrl);
  };

  return (
    <div className="min-h-screen mesh-canvas-dark text-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Aurora mesh glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-cyan-500/10 blur-[160px]" />
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-4 group">
            <div className="p-2.5 rounded-2xl brand-mark shadow-xl shadow-blue-500/30 group-hover:scale-105 transition-transform">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-black text-white tracking-tight">DeckMind</span>
              <span className="text-2xl font-black bg-gradient-to-r from-blue-300 via-amber-200 to-emerald-300 bg-clip-text text-transparent">AI</span>
            </div>
          </Link>
          <p className="text-slate-400 text-sm">
            {mode === 'login' ? 'Sign in to access your presentations' : 'Create your free account'}
          </p>
        </div>

        {/* Card with subtle gradient border */}
        <div className="relative p-0.5 rounded-3xl bg-gradient-to-b from-blue-400/50 via-violet-400/40 to-amber-300/30 shadow-2xl">
          <div className="bg-[#101628]/90 backdrop-blur-2xl rounded-[23px] p-7 sm:p-8 space-y-6">
            {/* Mode tabs */}
            <div className="flex rounded-2xl bg-white/5 border border-white/10 p-1">
              {(['login', 'signup'] as const).map(m => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(null); }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    mode === m
                      ? 'bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 text-white shadow-md shadow-violet-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 font-mono">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={8}
                    className="w-full pl-10 pr-12 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-violet-600 to-amber-400 hover:opacity-95 text-white text-sm font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-violet-600/30 active:scale-[0.98] cursor-pointer mt-3"
              >
                {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                <span>{isLoading ? 'Please wait...' : mode === 'login' ? 'Sign In to Workspace' : 'Create Free Account'}</span>
              </button>
            </form>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          By continuing you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
