import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { db } from '@/lib/db/client';

// ₹10 = 1000 paise
const DEMO_AMOUNT_PAISE = 1000;

export async function POST(request: NextRequest) {
  // 1. Verify user authentication
  const { session, response: authError } = await requireAuth();
  if (authError || !session?.user?.id) {
    return authError ?? NextResponse.json({ success: false, error: 'Authentication required.' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const body = await request.json().catch(() => ({}));
    const { presentationId, referenceId } = body as {
      presentationId?: string;
      referenceId?: string;
    };

    if (!presentationId) {
      return NextResponse.json(
        { success: false, error: 'presentationId is required.' },
        { status: 400 }
      );
    }

    const demoRef = referenceId || `UPI-DEMO-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;

    // 2. Record demo payment in MongoDB Payment collection (check if already created for this reference)
    let payment: any = await db.payment.findFirst({
      where: { providerOrderId: demoRef, userId },
    }).catch(() => null);

    if (!payment) {
      payment = await db.payment.create({
        data: {
          userId,
          presentationId,
          amount: DEMO_AMOUNT_PAISE,
          currency: 'INR',
          provider: 'upi_demo',
          providerOrderId: demoRef,
          providerPaymentId: demoRef,
          providerSignature: 'DEMO_SIMULATION_SIGNATURE',
          isDemo: true,
          demoNote: 'Demo UPI simulation (90s countdown)',
          status: 'SUCCESSFUL',
        },
      });
    }

    // 3. Mark presentation status as PAID in database
    await db.presentation.upsert({
      where: { id: presentationId },
      create: {
        id: presentationId,
        userId,
        title: 'Presentation',
        templateId: 'unknown',
        status: 'PAID',
        slideCount: 0,
      },
      update: {
        status: 'PAID',
        updatedAt: new Date(),
      },
    });

    console.log(`[DeckMind Payment] ✓ Demo Payment Recorded: ${demoRef} for presentation ${presentationId} (user: ${userId})`);

    const finalPaymentId = payment?._id?.toString() || payment?.id || demoRef;

    return NextResponse.json({
      success: true,
      message: 'Demo payment simulated and recorded successfully.',
      isDemo: true,
      referenceId: demoRef,
      paymentId: finalPaymentId,
      presentationId,
    });
  } catch (error: any) {
    console.error('[DeckMind Payment] Demo payment recording error:', error);
    return NextResponse.json(
      { success: false, error: error?.message || 'Failed to record demo payment.' },
      { status: 500 }
    );
  }
}
