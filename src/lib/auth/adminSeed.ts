import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';

/**
 * Seeds the admin user from environment variables.
 * Call this once at app startup or via a seed script.
 * Credentials are NEVER hardcoded — sourced from .env only.
 */
export async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  if (!adminEmail || !adminPassword) {
    return;
  }

  try {
    const existing = await db.user.findUnique({ where: { email: adminEmail } });
    if (existing) {
      const updates: Record<string, any> = {};
      const currentRole = String(existing.role || '').toUpperCase();
      if (currentRole !== 'ADMIN') {
        updates.role = 'admin';
      }

      // Verify if password matches; if not, sync with ADMIN_PASSWORD from env
      const isPasswordMatching = existing.passwordHash
        ? await bcrypt.compare(adminPassword, existing.passwordHash)
        : false;

      if (!isPasswordMatching) {
        updates.passwordHash = await bcrypt.hash(adminPassword, 12);
      }

      if (Object.keys(updates).length > 0) {
        await db.user.update({ where: { email: adminEmail }, data: updates });
        console.log('[DeckMind Auth] ✓ Synchronized admin account credentials & role for:', adminEmail);
      }
      return;
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await db.user.create({
      data: {
        email: adminEmail,
        name: 'Admin',
        passwordHash,
        role: 'admin',
      },
    });
    console.log('[DeckMind Auth] ✓ Admin account initialized from environment:', adminEmail);
  } catch (err: any) {
    console.warn('[DeckMind Auth] Admin auto-seed notice:', err?.message || err);
  }
}

