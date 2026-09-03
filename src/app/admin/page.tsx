import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/client';
import { Users, Presentation, IndianRupee, Download, TrendingUp, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = (session?.user as { role?: string } | null)?.role;

  if (!session?.user || role !== 'ADMIN') {
    redirect('/login?callbackUrl=/admin');
  }

  // Fetch stats server-side
  let userCount = 0;
  let presentationCount = 0;
  let payments = { _sum: { amount: 0 }, _count: 0 };
  let recentPayments: any[] = [];

  try {
    const results = await Promise.all([
      db.user.count(),
      db.presentation.count(),
      db.payment.aggregate({
        where: { status: 'SUCCESSFUL' },
        _sum: { amount: true },
        _count: true,
      }),
      db.payment.findMany({
        where: { status: 'SUCCESSFUL' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        include: {
          user: { select: { email: true, name: true } },
          presentation: { select: { title: true } },
        },
      }),
    ]);
    userCount = results[0];
    presentationCount = results[1];
    payments = results[2];
    recentPayments = results[3];
  } catch (dbErr) {
    console.warn('[DeckMind Admin] DB stats fetch warning:', dbErr);
  }

  const totalRevenue = (payments._sum.amount ?? 0) / 100;

  const statCards = [
    {
      label: 'Total Registered Users',
      value: userCount.toLocaleString(),
      icon: Users,
      accent: 'from-blue-600 to-indigo-600',
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70',
      topLine: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
      label: 'Generated Presentations',
      value: presentationCount.toLocaleString(),
      icon: Presentation,
      accent: 'from-purple-600 to-pink-600',
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200/70',
      topLine: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      label: 'PPTX Downloads',
      value: payments._count.toLocaleString(),
      icon: Download,
      accent: 'from-cyan-600 to-blue-600',
      iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/70',
      topLine: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    },
    {
      label: 'Gross Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: IndianRupee,
      accent: 'from-emerald-600 to-teal-600',
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      topLine: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen mesh-canvas text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900 rounded-xl">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <div className="h-4 w-px bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-xs shadow-xs">
                D
              </div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight">
                DeckMind <span className="gradient-text">Admin Portal</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500 hidden sm:inline font-mono">
              {session.user.email}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-rose-50 text-rose-700 px-3 py-1 rounded-full border border-rose-200 font-bold shadow-2xs">
              <ShieldCheck className="h-3 w-3" />
              <span>ADMIN ACCESS</span>
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(stat => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${stat.topLine}`} />

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl border shadow-2xs ${stat.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Realtime</span>
                </div>

                <div>
                  <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-500 mt-1">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Payments Section */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-2xs">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Successful Payments</h2>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              UPI & Cards
            </span>
          </div>

          {recentPayments.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-slate-400 font-medium">
              No successful payments recorded yet.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentPayments.map((payment: { id: string; presentation?: { title: string }; user?: { email: string; name?: string }; createdAt: Date; amount: number }) => (
                <div key={payment.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {payment.user?.email ? payment.user.email[0].toUpperCase() : 'U'}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-900 truncate">
                        {payment.presentation?.title || 'Generated Presentation'}
                      </p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        {payment.user?.email} • {new Date(payment.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <span className="text-xs font-black text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                      ₹{payment.amount / 100}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
