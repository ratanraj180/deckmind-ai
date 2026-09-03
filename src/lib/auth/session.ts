import { auth } from '@/lib/auth/config';
import { NextResponse } from 'next/server';

/**
 * Returns the current session or null.
 * Use in API routes to verify authentication.
 */
export async function getSession() {
  return auth();
}

/**
 * Require authentication in an API route.
 * Returns the session on success, or a 401 NextResponse if unauthenticated.
 */
export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return {
      session: null,
      response: NextResponse.json(
        { success: false, error: 'Authentication required. Please log in.' },
        { status: 401 }
      ),
    };
  }
  return { session, response: null };
}

/**
 * Require admin role in an API route.
 */
export async function requireAdmin() {
  const session = await auth();
  const role = (session?.user as { role?: string } | null)?.role;
  if (!session?.user || role !== 'ADMIN') {
    return {
      session: null,
      response: NextResponse.json(
        { success: false, error: 'Admin access required.' },
        { status: 403 }
      ),
    };
  }
  return { session, response: null };
}
