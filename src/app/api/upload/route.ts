import { NextRequest, NextResponse } from 'next/server';
import { parseDependencies } from '@/app/lib/dependencyParser';
import { writeFile } from 'fs/promises';
import { join } from 'path';

export async function POST(request: NextRequest) {
  console.log('Received POST request');

  try {
    const formData = await request.formData();
    console.log('FormData received');

    const file = formData.get('file') as File | null;
    if (!file) {
      console.log('No file in FormData');
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    console.log('File received:', file.name, file.type, file.size);

    // Create a temporary file path
    const tempDir = join(process.cwd(), 'tmp');
    const filePath = join(tempDir, file.name);

    // Write the file to the temporary directory
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);
    console.log('File written to:', filePath);

    // Parse dependencies
    const dependencies = await parseDependencies(filePath);
    console.log('Dependencies parsed:', dependencies);

    return NextResponse.json({ dependencies });
  } catch (error) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Server error', details: (error as Error).message }, { status: 500 });
  }
}