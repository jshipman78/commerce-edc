import { NextResponse } from 'next/server';
import { getMediaFiles, deleteMediaFile } from '@/lib/admin/data';

export async function GET() {
  const files = await getMediaFiles();
  return NextResponse.json({ files });
}

export async function DELETE(request: Request) {
  const { path } = await request.json();
  const result = await deleteMediaFile(path);
  return NextResponse.json(result);
}
