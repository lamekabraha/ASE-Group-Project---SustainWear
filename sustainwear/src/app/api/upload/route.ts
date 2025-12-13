import { writeFile, mkdir, stat } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get('file') as unknown as File;

  if (!file) {
    return NextResponse.json({ success: false, error: 'No file uploaded.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads');

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === 'ENOENT') {
      await mkdir(uploadDir, { recursive: true });
    } else {
      console.error('Error checking directory:', e);
      return NextResponse.json({ success: false, error: 'Failed to create upload directory.' }, { status: 500 });
    }
  }

  const filename = `${Date.now()}-${file.name.replace(/\s/g, '_')}`;
  const uploadPath = path.join(uploadDir, filename);

  await writeFile(uploadPath, buffer);
  const url = `/uploads/${filename}`;
  return NextResponse.json({ success: true, url });
}