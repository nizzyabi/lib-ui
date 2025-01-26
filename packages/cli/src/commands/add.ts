import { Command } from 'commander';
import { addComponent } from '../utils/add-utils';
import { logger } from '../utils/visuals';
import { handleError } from '../utils/errors';
import { exists } from '../utils/files';

export const addCommand = new Command('add')
  .description('Add a new libui component to your project')
  .argument('<componentName>', 'Name of the component to add')
  .action(async (componentName: string) => {
    try {
      // Initial validation
      if (componentName !== 'auth') {
        logger.error('Only the "auth" component can be added at this time.');
        process.exit(1);
      }
      if (!(await exists('libui.config.json'))) {
        throw new Error('libui.config.json not found. Please run `libui-next init` first.');
      }
  
      // Run core command logic
      await addComponent(componentName);

    } catch (error) {
      handleError(error);
    }
  });
