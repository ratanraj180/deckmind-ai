import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { db } from '@/lib/db/client';

export async function GET(request: NextRequest) {
  const { response: adminError } = await requireAdmin();
  if (adminError) return adminError;

  try {
    const [userCount, presentationCount, payments, recentPayments] = await Promise.all([
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

    const totalRevenuePaise = payments._sum.amount ?? 0;
    const totalRevenueRupees = totalRevenuePaise / 100;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: userCount,
        totalPresentations: presentationCount,
        totalPptDownloads: payments._count,
        totalRevenueRupees,
        recentPayments: recentPayments.map((p: any) => ({
          id: p.id,
          userEmail: p.user.email,
          userName: p.user.name,
          presentationTitle: p.presentation.title,
          amountRupees: p.amount / 100,
          createdAt: p.createdAt,
        })),
      },
    });
  } catch (error: any) {
    console.error('[DeckMind Admin] Failed to fetch stats:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to fetch admin stats' },
      { status: 500 }
    );
  }
}
