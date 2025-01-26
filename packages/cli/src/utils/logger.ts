import chalk from 'chalk';

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
}; 