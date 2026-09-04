import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const { email, password, name } = body as { email?: string; password?: string; name?: string };

    // 1. Validate Email
    if (!email || typeof email !== 'string' || !email.trim()) {
      return NextResponse.json({ success: false, error: 'Email address is required.' }, { status: 400 });
    }

    const cleanEmail = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json({ success: false, error: 'Please enter a valid email address.' }, { status: 400 });
    }

    // 2. Validate Password
    if (!password || typeof password !== 'string') {
      return NextResponse.json({ success: false, error: 'Password is required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters long.' }, { status: 400 });
    }

    if (password.length > 128) {
      return NextResponse.json({ success: false, error: 'Password must not exceed 128 characters.' }, { status: 400 });
    }

    // 3. Sanitize Name (ensures non-empty string for Mongoose schema validation)
    const cleanName = (name && typeof name === 'string' && name.trim().length > 0)
      ? name.trim().slice(0, 100)
      : cleanEmail.split('@')[0].slice(0, 100);

    // 4. Check for duplicate account
    const existing = await db.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    // 5. Hash password securely
    const passwordHash = await bcrypt.hash(password, 12);

    // 6. Create user in database
    const user = await db.user.create({
      data: {
        email: cleanEmail,
        name: cleanName,
        passwordHash,
        role: 'user',
      },
    });

    console.log(`[DeckMind Auth] ✓ New user registered: ${user.email} (ID: ${user.id})`);
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error: any) {
    console.error('[DeckMind Auth] Registration error:', error);

    // Handle Mongoose duplicate key error (code 11000)
    if (error?.code === 11000 || error?.message?.includes('duplicate key') || error?.message?.includes('E11000')) {
      return NextResponse.json(
        { success: false, error: 'An account with this email already exists. Please sign in instead.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Registration failed. Please check your details and try again.',
      },
      { status: 500 }
    );
  }
}
