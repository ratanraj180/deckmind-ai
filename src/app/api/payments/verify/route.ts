import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { requireAuth } from '@/lib/auth/session';
import { db } from '@/lib/db/client';

export async function POST(request: NextRequest) {
  // 1. Verify authentication
  const { session, response: authError } = await requireAuth();
  if (authError || !session?.user?.id) {
    return authError ?? NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }
  const userId = session.user.id;

  try {
    const body = await request.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      presentationId,
    } = body as {
      razorpay_order_id: string;
      razorpay_payment_id: string;
      razorpay_signature: string;
      presentationId: string;
    };

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !presentationId) {
      return NextResponse.json({ success: false, error: 'Missing payment verification fields.' }, { status: 400 });
    }

    // 2. Server-side HMAC-SHA256 signature verification
    // NEVER trust frontend payment success alone
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return NextResponse.json({ success: false, error: 'Payment gateway not configured.' }, { status: 503 });
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    const expectedBuffer = Buffer.from(expectedSignature, 'utf8');
    const actualBuffer = Buffer.from(razorpay_signature, 'utf8');
    const isSignatureValid =
      expectedBuffer.length === actualBuffer.length &&
      crypto.timingSafeEqual(expectedBuffer, actualBuffer);

    if (!isSignatureValid) {
      console.error(`[DeckMind Payment] Signature mismatch! order=${razorpay_order_id}`);
      return NextResponse.json({ success: false, error: 'Payment verification failed. Invalid signature.' }, { status: 400 });
    }

    // 3. Update Payment record to SUCCESSFUL
    const payment = await db.payment.findFirst({
      where: {
        providerOrderId: razorpay_order_id,
        userId,
        status: 'PENDING',
        presentationId,
      },
    });

    if (!payment) {
      // Check if it was already marked successful (idempotent retry)
      const existingSuccess = await db.payment.findFirst({
        where: {
          providerOrderId: razorpay_order_id,
          userId,
          status: 'SUCCESSFUL',
          presentationId,
        },
      });
      if (existingSuccess) {
        return NextResponse.json({
          success: true,
          message: 'Payment already verified.',
          presentationId,
        });
      }
      return NextResponse.json({ success: false, error: 'Payment record not found or does not match this presentation.' }, { status: 404 });
    }

    await db.payment.update({
      where: { id: payment.id },
      data: {
        providerPaymentId: razorpay_payment_id,
        providerSignature: razorpay_signature,
        status: 'SUCCESSFUL',
        updatedAt: new Date(),
      },
    });

    // 4. Mark presentation as PAID
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
      update: { status: 'PAID', updatedAt: new Date() },
    });

    console.log(`[DeckMind Payment] ✓ Verified: ${razorpay_payment_id} for presentation ${presentationId}`);

    return NextResponse.json({
      success: true,
      message: 'Payment verified. Download unlocked.',
      presentationId,
    });
  } catch (error) {
    console.error('[DeckMind Payment] verify error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error.' }, { status: 500 });
  }
}
