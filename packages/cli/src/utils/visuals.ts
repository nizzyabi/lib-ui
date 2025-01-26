import chalk from 'chalk';
import { createSpinner } from 'nanospinner'

export const logger = {
  log: (message: string) => {
    console.log(chalk.grey(message));
  },
  info: (message: string) => {
    console.info(chalk.blue(message));
  },
  warn: (message: string) => {
    console.warn(chalk.yellow(message));
  },
  error: (message: string) => {
    console.error(chalk.red(message));
  },
  success: (message: string) => {
    console.log(chalk.green(message));
  },
}; 

export function spinner(message: string) {
  const sp = createSpinner(message);
  return {
    start: () => {
      sp.start();
      return sp;
    },
    succeed: (text?: string) => {
      sp.success({ text });
      return sp;
    },
    fail: (text?: string) => {
      sp.error({ text });
      return sp;
    },
  };
} 