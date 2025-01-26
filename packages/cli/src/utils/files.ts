import fs from 'fs/promises';
import path from 'path';

export async function exists(relativePath: string): Promise<boolean> {
  const configPath = path.join(process.cwd(), relativePath);
  try {
    await fs.access(configPath);
    return true;
  } catch {
    return false;
  }
}
