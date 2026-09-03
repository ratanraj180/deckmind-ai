import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';

/**
 * Seeds the admin user from environment variables.
 * Call this once at app startup or via a seed script.
 * Credentials are NEVER hardcoded — sourced from .env only.
 */
export async function seedAdminUser() {
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    console.warn('[DeckMind Auth] ADMIN_EMAIL or ADMIN_PASSWORD not set. Skipping admin seed.');
    return;
  }

  const existing = await db.user.findUnique({ where: { email: adminEmail } });
  if (existing) {
    if (existing.role !== 'ADMIN') {
      await db.user.update({ where: { email: adminEmail }, data: { role: 'ADMIN' } });
      console.log('[DeckMind Auth] Upgraded existing user to ADMIN:', adminEmail);
    }
    return;
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);
  await db.user.create({
    data: {
      email: adminEmail,
      name: 'Admin',
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log('[DeckMind Auth] Admin user created:', adminEmail);
}
