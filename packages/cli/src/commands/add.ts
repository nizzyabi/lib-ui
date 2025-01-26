import { Command } from 'commander';
import { addComponent } from '../utils/add-component';

export const addCommand = new Command('add')
  .description('add a new component')
  .argument('<componentName>', 'Name of the component to add')
  .action(async (componentName: string) => {
    if (componentName !== 'auth') {
      console.error('Only the "auth" component can be added at this time.');
      process.exit(1);
    }
    await addComponent(componentName);
  });
