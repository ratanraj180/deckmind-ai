import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth/session';
import { db } from '@/lib/db/client';

// ₹10 = 1000 paise
const PRICE_PAISE = 1000;

export async function POST(request: NextRequest) {
  // 1. Verify authentication
  const { session, response: authError } = await requireAuth();
  if (authError || !session?.user?.id) {
    return authError ?? NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const body = await request.json();
    const { presentationId, presentationTitle, templateName, slideCount } = body;

    if (!presentationId) {
      return NextResponse.json({ success: false, error: 'presentationId is required.' }, { status: 400 });
    }

    // 2. Verify Razorpay keys are configured
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { success: false, error: 'Payment gateway is not configured. Please contact support.' },
        { status: 503 }
      );
    }

    // 3. Create Razorpay order via REST API (avoid require() at module level)
    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const razorpayResponse = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: PRICE_PAISE,
        currency: 'INR',
        receipt: `dm_${presentationId.slice(0, 16)}`,
        notes: {
          presentationId,
          userId,
        },
      }),
    });

    if (!razorpayResponse.ok) {
      const err = await razorpayResponse.text();
      console.error('[DeckMind Payment] Razorpay order creation failed:', err);
      return NextResponse.json({ success: false, error: 'Failed to create payment order.' }, { status: 502 });
    }

    const order = await razorpayResponse.json() as { id: string; amount: number; currency: string };

    // 4. Store pending payment in DB
    await db.payment.create({
      data: {
        userId,
        presentationId,
        amount: PRICE_PAISE,
        currency: 'INR',
        provider: 'razorpay',
        providerOrderId: order.id,
        status: 'PENDING',
      },
    });

    console.log(`[DeckMind Payment] Order created: ${order.id} for user ${userId}`);

    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId,
      presentationTitle,
      templateName,
      slideCount,
    });
  } catch (error) {
    console.error('[DeckMind Payment] create-order error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
