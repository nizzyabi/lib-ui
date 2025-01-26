import { Command } from 'commander';
import { runInit } from '../utils/init-setup';
import { logger } from '../utils/logger';
import { handleError } from '../utils/handle-error';
import path from 'path';
import { promises as fs } from 'fs';

export const initCommand = new Command('init')
  .description('Initialize a new Next.js project with TypeScript and Tailwind CSS')
  .action(async () => {
    try {
      const projectDir = process.cwd();
      const configPath = path.join(projectDir, 'components.json');

      if (await exists(configPath)) {
        logger.error('components.json already exists in this directory. Initialization aborted.');
        process.exit(1);
      }

      await runInit(projectDir);

    } catch (error) {
      handleError(error);
    }
  });

async function exists(path: string): Promise<boolean> {
  try {
    await fs.access(path);
    return true;
  } catch {
    return false;
  }
}