import { Command } from 'commander';
import { runInit } from '../utils/init-utils';
import { logger } from '../utils/visuals';
import { handleError } from '../utils/errors';
import { exists } from '../utils/files';

export const initCommand = new Command('init')
  .description('Setup libui in your project')
  .action(async () => {
    try {
      // Initial validation
      if (await exists('libui.config.json')) {
        logger.error('libui.config.json already exists in this directory. Initialization aborted.');
        process.exit(1);
      }

      // Run core command logic
      await runInit();

    } catch (error) {
      handleError(error);
    }
  });
