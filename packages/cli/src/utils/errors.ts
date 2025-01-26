import { logger } from './visuals';

export function handleError(error: unknown) {
  if (error instanceof Error) {
    logger.error(error.message);
  } else {
    logger.error('An unknown error occurred.');
  }
  process.exit(1);
} 