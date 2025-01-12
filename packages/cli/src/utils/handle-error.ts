import { logger } from './logger';
import { highlighter } from './highlighter';

export function handleError(error: unknown) {
  if (error instanceof Error) {
    logger.error(highlighter.error(error.message));
  } else {
    logger.error(highlighter.error('An unknown error occurred.'));
  }
  process.exit(1);
} 