import { getEmployersTyped } from '@/lib/admin/data';
import { EmployersManager } from '@/components/admin/managers/EmployersManager';

export default async function AdminEmployersPage() {
  const { employers, partners } = await getEmployersTyped();

  return <EmployersManager initialEmployers={employers} initialPartners={partners} />;
}
