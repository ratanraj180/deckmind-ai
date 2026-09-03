import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body as { email: string; password: string; name?: string };

    if (!email || !password) {
      return NextResponse.json({ success: false, error: 'Email and password are required.' }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ success: false, error: 'Password must be at least 8 characters.' }, { status: 400 });
    }

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ success: false, error: 'An account with this email already exists.' }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await db.user.create({
      data: { email, name: name ?? email.split('@')[0], passwordHash, role: 'USER' },
    });

    console.log(`[DeckMind Auth] New user registered: ${user.email}`);
    return NextResponse.json({ success: true, userId: user.id });
  } catch (error) {
    console.error('[DeckMind Auth] Registration error:', error);
    return NextResponse.json({ success: false, error: 'Registration failed.' }, { status: 500 });
  }
}
