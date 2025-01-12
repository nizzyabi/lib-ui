import { createSpinner } from 'nanospinner'

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