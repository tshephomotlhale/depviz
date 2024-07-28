import { readFile } from 'fs/promises';

export async function parseDependencies(filePath: string) {
  try {
    const content = await readFile(filePath, 'utf-8');
    const packageJson = JSON.parse(content);

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    return Object.entries(dependencies).map(([name, version]) => ({
      name,
      version: (version as string).replace('^', ''),
    }));
  } catch (error) {
    console.error('Error parsing dependencies:', error);
    throw new Error('Failed to parse package.json');
  }
}