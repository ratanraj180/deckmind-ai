import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/session';
import { db } from '@/lib/db/client';

export async function GET(request: NextRequest) {
  const { response: adminError } = await requireAdmin();
  if (adminError) return adminError;

  try {
    const [
      userCount,
      presentationCount,
      downloadCount,
      uniqueDownloaders,
      payments,
      recentPayments,
      usersList,
      recentDownloads,
      recentUsers,
    ] = await Promise.all([
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
        limit: 100,
        sort: { createdAt: -1 },
      }),
      db.downloadHistory.findMany({
        limit: 10,
        sort: { downloadedAt: -1 },
      }),
      db.user.findMany({
        limit: 5,
        sort: { createdAt: -1 },
      }),
    ]);

    const totalRevenuePaise = payments._sum.amount ?? 0;
    const totalRevenueRupees = totalRevenuePaise / 100;

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: userCount,
        totalPresentations: presentationCount,
        totalPptDownloads: downloadCount,
        uniqueUsersDownloaded: uniqueDownloaders,
        totalRevenueRupees,
        users: usersList.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: String(u.role || 'user').toLowerCase(),
          createdAt: u.createdAt,
          lastLogin: u.lastLogin || null,
          presentationsCreated: u.presentationsCreated ?? 0,
          presentationsDownloaded: u.presentationsDownloaded ?? 0,
          totalDownloads: u.totalDownloads ?? 0,
        })),
        recentRegistrations: recentUsers.map((u: any) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: String(u.role || 'user').toLowerCase(),
          createdAt: u.createdAt,
        })),
        recentDownloads: recentDownloads.map((d: any) => ({
          id: d.id,
          fileName: d.fileName,
          fileSize: d.fileSize,
          templateId: d.templateId,
          isDemo: d.isDemo ?? false,
          paymentMethod: d.paymentMethod || 'direct',
          downloadedAt: d.downloadedAt,
          userEmail: d.user?.email || 'Anonymous',
          userName: d.user?.name || 'Guest User',
          presentationTitle: d.presentation?.title || 'Presentation',
        })),
        recentPayments: recentPayments.map((p: any) => ({
          id: p.id,
          userEmail: p.user?.email,
          userName: p.user?.name,
          presentationTitle: p.presentation?.title,
          amountRupees: p.amount / 100,
          provider: p.provider || 'razorpay',
          isDemo: p.isDemo ?? false,
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
