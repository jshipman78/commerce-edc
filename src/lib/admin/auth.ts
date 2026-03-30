'use server';

import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const ADMIN_EMAIL = 'Joe@luminouspro.com';
const ADMIN_PASSWORD_HASH = '$2b$12$107iltMHqYjUSpcB4QzRbeyW9nddUKyomh46Ry4qnRab7HovtoUDi';
const JWT_SECRET = new TextEncoder().encode(
  process.env.ADMIN_JWT_SECRET || 'commerce-edc-admin-secret-key-2026'
);
const COOKIE_NAME = 'admin-session';

export async function login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return { success: false, error: 'Invalid credentials' };
  }

  const valid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
  if (!valid) {
    return { success: false, error: 'Invalid credentials' };
  }

  const token = await new SignJWT({ email: ADMIN_EMAIL, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  });

  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getSession(): Promise<{ email: string; role: string } | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return { email: payload.email as string, role: payload.role as string };
  } catch {
    return null;
  }
}

export async function requireAuth() {
  const session = await getSession();
  if (!session) {
    throw new Error('Unauthorized');
  }
  return session;
}
