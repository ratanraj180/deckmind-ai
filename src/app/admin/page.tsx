import { auth } from '@/lib/auth/config';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db/client';
import { Users, Presentation, IndianRupee, Download, TrendingUp } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-extrabold text-slate-900">DeckMind Admin</h1>
            <p className="text-xs text-slate-500">Signed in as {session.user.email}</p>
          </div>
          <span className="text-xs font-mono bg-red-100 text-red-700 px-2.5 py-1 rounded-full border border-red-200 font-bold">
            ADMIN
          </span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Stats grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Total Users', value: userCount.toLocaleString(), icon: Users, color: 'indigo' },
            { label: 'Presentations', value: presentationCount.toLocaleString(), icon: Presentation, color: 'violet' },
            { label: 'PPT Downloads', value: payments._count.toLocaleString(), icon: Download, color: 'blue' },
            { label: 'Revenue', value: `₹${totalRevenue.toLocaleString()}`, icon: IndianRupee, color: 'emerald' },
          ].map(stat => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                <div className={`inline-flex p-2 rounded-xl mb-3 bg-${stat.color}-50`}>
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                </div>
                <div className="text-2xl font-black text-slate-900">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Recent Payments */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900">Recent Successful Payments</h2>
          </div>
          {recentPayments.length === 0 ? (
            <div className="px-6 py-8 text-center text-sm text-slate-400">No payments yet.</div>
          ) : (
            <div className="divide-y divide-slate-100">
              {recentPayments.map((payment: { id: string; presentation: { title: string }; user: { email: string }; createdAt: Date; amount: number }) => (
                <div key={payment.id} className="px-6 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{payment.presentation.title}</p>
                    <p className="text-xs text-slate-500">{payment.user.email} · {new Date(payment.createdAt).toLocaleDateString('en-IN')}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-700">₹{payment.amount / 100}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
