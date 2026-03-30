import { getBuildingsTyped } from '@/lib/admin/data';
import { BuildingsManager } from '@/components/admin/managers/BuildingsManager';

export default async function AdminBuildingsPage() {
  const buildings = await getBuildingsTyped();

  return <BuildingsManager initialData={buildings} />;
}
