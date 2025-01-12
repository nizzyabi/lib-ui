#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init';
import { addCommand } from './commands/add';

const program = new Command();

program
  .name('libui-next')
  .description('add full-stack components to your project')
  .version('1.0.0');

program.addCommand(initCommand);
program.addCommand(addCommand);

program.parse(process.argv);