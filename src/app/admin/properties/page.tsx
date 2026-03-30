import { getPropertiesTyped } from '@/lib/admin/data';
import { PropertiesManager } from '@/components/admin/managers/PropertiesManager';

export default async function AdminPropertiesPage() {
  const properties = await getPropertiesTyped();

  return <PropertiesManager initialData={properties} />;
}
