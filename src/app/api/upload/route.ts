import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      throw new Error('No file uploaded');
    }

    // Read the file content
    const fileContent = await file.text();

    // Parse the JSON content
    const jsonData = JSON.parse(fileContent);

    // Extract dependencies
    const dependencies = {
      ...jsonData.dependencies,
      ...jsonData.devDependencies,
    };

    const parsedDependencies = Object.entries(dependencies).map(([name, version]) => ({
      name,
      version: (version as string).replace('^', ''),
    }));

    return NextResponse.json({ dependencies: parsedDependencies });
  } catch (error: any) {
    console.error('Error processing file:', error);
    return NextResponse.json({ error: 'Error processing the file', details: error.message }, { status: 500 });
  }
}
