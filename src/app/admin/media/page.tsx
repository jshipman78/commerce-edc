import { MediaLibrary } from '@/components/admin/MediaLibrary';

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Media Library</h1>
      <p className="mt-1 text-sm text-gray-500">
        Upload and manage images and documents. Files are stored in the public directory.
      </p>
      <MediaLibrary />
    </div>
  );
}
