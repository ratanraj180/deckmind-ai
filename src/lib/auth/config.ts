import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db/client';
import { seedAdminUser } from '@/lib/auth/adminSeed';

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        if (typeof credentials.email !== 'string' || typeof credentials.password !== 'string') return null;

        const email = credentials.email.trim().toLowerCase();
        const password = credentials.password;

        // Check if this is the admin attempting to log in; ensure admin seed/sync is up to date
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        if (adminEmail && email === adminEmail) {
          await seedAdminUser().catch(err =>
            console.warn('[DeckMind Auth] seedAdminUser in authorize notice:', err?.message)
          );
        }

        const user = await db.user.findUnique({
          where: { email },
        });

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) return null;

        // Record last login timestamp non-blockingly
        db.user.updateLastLogin(user.id).catch(err =>
          console.warn('[DeckMind Auth] Could not update lastLogin:', err?.message)
        );

        const normalizedRole = String(user.role || 'user').toLowerCase() === 'admin' ? 'admin' : 'user';

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: normalizedRole,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        const roleStr = String((user as { role?: string }).role || 'user').toLowerCase();
        token.role = roleStr === 'admin' ? 'admin' : 'user';
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        if (session.user) {
          (session.user as any).id = token.id as string;
          const roleStr = String(token.role || 'user').toLowerCase();
          (session.user as any).role = roleStr === 'admin' ? 'admin' : 'user';
        }
      }
      return session;
    },
  },
});

