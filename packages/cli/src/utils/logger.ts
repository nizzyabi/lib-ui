import chalk from 'chalk';

export const logger = {
  log: (message: string) => {
    console.log(message);
  },
  error: (message: string) => {
    console.error(chalk.red(message));
  },
  // Add other methods if necessary
}; 