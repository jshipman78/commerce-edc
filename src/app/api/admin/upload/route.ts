import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Sanitize filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').toLowerCase();
    const timestamp = Date.now();
    const filename = `${timestamp}-${safeName}`;

    // Determine target directory
    let targetDir: string;
    if (folder === 'agendas') {
      targetDir = path.join(process.cwd(), 'public/documents/agendas');
    } else {
      targetDir = path.join(process.cwd(), 'public/uploads');
    }

    await fs.mkdir(targetDir, { recursive: true });

    const filePath = path.join(targetDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(filePath, buffer);

    const publicPath = folder === 'agendas'
      ? `/documents/agendas/${filename}`
      : `/uploads/${filename}`;

    return NextResponse.json({
      success: true,
      path: publicPath,
      filename,
      size: file.size,
    });
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
