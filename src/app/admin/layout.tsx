import { getSession } from '@/lib/admin/auth';
import { AdminShell } from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin — Commerce EDC',
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  // If no session (e.g. on /admin/login), render children without AdminShell.
  // Middleware handles redirecting unauthenticated users on protected routes.
  if (!session) {
    return <>{children}</>;
  }

  return <AdminShell email={session.email}>{children}</AdminShell>;
}
