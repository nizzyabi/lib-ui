import chalk from 'chalk';

export const highlighter = {
  error: (str: string) => chalk.red(str),
  success: (str: string) => chalk.green(str),
  info: (str: string) => chalk.blue(str),
}; 