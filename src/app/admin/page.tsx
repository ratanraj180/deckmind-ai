import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/client';
import { Users, Presentation, IndianRupee, Download, TrendingUp, ShieldCheck, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminDashboardPage() {
  const session = await auth();
  const role = (session?.user as { role?: string } | null)?.role;
  const isAdmin = role && String(role).toLowerCase() === 'admin';

  if (!session?.user || !isAdmin) {
    redirect('/login?callbackUrl=/admin');
  }

  // Fetch stats server-side
  let userCount = 0;
  let presentationCount = 0;
  let downloadCount = 0;
  let uniqueDownloaders = 0;
  let payments = { _sum: { amount: 0 }, _count: 0 };
  let recentPayments: any[] = [];
  let usersList: any[] = [];
  let recentDownloads: any[] = [];

  try {
    const results = await Promise.all([
      db.user.count(),
      db.presentation.count(),
      db.downloadHistory.count(),
      db.downloadHistory.countUniqueUsers(),
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
      db.user.findMany({
        limit: 50,
        sort: { createdAt: -1 },
      }),
      db.downloadHistory.findMany({
        limit: 10,
        sort: { downloadedAt: -1 },
      }),
    ]);
    userCount = results[0];
    presentationCount = results[1];
    downloadCount = results[2];
    uniqueDownloaders = results[3];
    payments = results[4];
    recentPayments = results[5];
    usersList = results[6];
    recentDownloads = results[7];
  } catch (dbErr) {
    console.warn('[DeckMind Admin] DB stats fetch warning:', dbErr);
  }

  const totalRevenue = (payments._sum.amount ?? 0) / 100;

  const statCards = [
    {
      label: 'Total Registered Users',
      value: userCount.toLocaleString(),
      subtext: `${usersList.length} active profiles`,
      icon: Users,
      iconBg: 'bg-indigo-50 text-indigo-600 border-indigo-200/70',
      topLine: 'bg-gradient-to-r from-blue-500 to-indigo-500',
    },
    {
      label: 'Presentations Created',
      value: presentationCount.toLocaleString(),
      subtext: 'Across all AI templates',
      icon: Presentation,
      iconBg: 'bg-purple-50 text-purple-600 border-purple-200/70',
      topLine: 'bg-gradient-to-r from-purple-500 to-pink-500',
    },
    {
      label: 'Total PPT Downloads',
      value: downloadCount.toLocaleString(),
      subtext: `${uniqueDownloaders} unique creators`,
      icon: Download,
      iconBg: 'bg-cyan-50 text-cyan-700 border-cyan-200/70',
      topLine: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    },
    {
      label: 'Unique Downloaders',
      value: uniqueDownloaders.toLocaleString(),
      subtext: `${userCount > 0 ? Math.round((uniqueDownloaders / userCount) * 100) : 0}% conversion rate`,
      icon: ShieldCheck,
      iconBg: 'bg-amber-50 text-amber-600 border-amber-200/70',
      topLine: 'bg-gradient-to-r from-amber-500 to-orange-500',
    },
    {
      label: 'Gross Revenue',
      value: `₹${totalRevenue.toLocaleString()}`,
      subtext: `${payments._count} completed orders`,
      icon: IndianRupee,
      iconBg: 'bg-emerald-50 text-emerald-700 border-emerald-200/70',
      topLine: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen mesh-canvas text-slate-900 pb-20">
      {/* Top Header */}
      <header className="bg-white/80 backdrop-blur-xl border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {statCards.map(stat => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="relative bg-white/90 backdrop-blur-sm rounded-3xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between overflow-hidden group"
              >
                {/* Top Accent Line */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${stat.topLine}`} />

                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2.5 rounded-2xl border shadow-2xs ${stat.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">Live</span>
                </div>

                <div>
                  <div className="text-2xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                  <div className="text-xs font-semibold text-slate-700 mt-0.5">{stat.label}</div>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">{stat.subtext}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Users Table Section (Passwords NEVER exposed) */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 shadow-2xs">
                <Users className="h-4 w-4" />
              </div>
              <h2 className="text-sm font-bold text-slate-900 tracking-tight">Registered Users ({userCount})</h2>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
              Role & Usage Analytics
            </span>
          </div>

          {usersList.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-slate-400 font-medium">
              No registered users in database.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-3">User</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Joined Date</th>
                    <th className="px-4 py-3">Last Login</th>
                    <th className="px-4 py-3 text-center">Decks Created</th>
                    <th className="px-6 py-3 text-center">PPT Downloads</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {usersList.map((u: any) => {
                    const isAdminUser = String(u.role || '').toLowerCase() === 'admin';
                    return (
                      <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="px-6 py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                              {u.email ? u.email[0].toUpperCase() : 'U'}
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900 truncate">{u.name || 'User'}</p>
                              <p className="text-[11px] text-slate-500 font-mono truncate">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase ${
                              isAdminUser
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : 'bg-slate-100 text-slate-600 border border-slate-200'
                            }`}
                          >
                            {isAdminUser ? 'Admin' : 'User'}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">
                          {u.createdAt
                            ? new Date(u.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })
                            : '—'}
                        </td>
                        <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">
                          {u.lastLogin
                            ? new Date(u.lastLogin).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Never'}
                        </td>
                        <td className="px-4 py-3.5 text-center font-bold text-slate-900 font-mono">
                          {u.presentationsCreated ?? 0}
                        </td>
                        <td className="px-6 py-3.5 text-center">
                          <span className="inline-block px-2.5 py-0.5 rounded-full font-mono text-[11px] font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                            {u.totalDownloads ?? u.presentationsDownloaded ?? 0}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Dual Grid: Recent PPT Downloads & Recent Payments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent PPT Downloads */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200 shadow-2xs">
                  <Download className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent PPTX Downloads</h2>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-0.5 rounded-full border border-cyan-200">
                Tracking Logs
              </span>
            </div>

            {recentDownloads.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-slate-400 font-medium">
                No presentation downloads logged yet.
              </div>
            ) : (
              <div className="divide-y divide-slate-100 flex-1">
                {recentDownloads.map((d: any) => (
                  <div key={d.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                    <div className="min-w-0 pr-3">
                      <div className="flex items-center gap-1.5">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {d.presentation?.title || d.fileName || 'DeckMind Presentation'}
                        </p>
                        {d.isDemo && (
                          <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded shrink-0">
                            DEMO
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 font-mono truncate">
                        {d.user?.email || 'Guest User'} •{' '}
                        {d.downloadedAt
                          ? new Date(d.downloadedAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })
                          : 'Just now'}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <span className="text-[11px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                        {d.fileSize ? `${Math.round(d.fileSize / 1024)} KB` : 'PPTX'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Payments Section */}
          <div className="bg-white/95 backdrop-blur-sm rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col">
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
              <div className="divide-y divide-slate-100 flex-1">
                {recentPayments.map((payment: any) => (
                  <div key={payment.id} className="px-6 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center gap-3 min-w-0 pr-3">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        {payment.user?.email ? payment.user.email[0].toUpperCase() : '₹'}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {payment.presentation?.title || 'Generated Presentation'}
                          </p>
                          {payment.isDemo && (
                            <span className="text-[9px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.2 rounded shrink-0">
                              DEMO
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono truncate">
                          {payment.user?.email || 'User'} •{' '}
                          {new Date(payment.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-emerald-700 font-mono bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                        ₹{payment.amount / 100}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
