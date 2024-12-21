import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateLevelAndProgressBar(xp: number) {
  // each level is 300 xp
  const level = Math.floor(xp / 300);

  // progressBar is the percentage of the current level completed
  const progressBar = Math.floor((xp / 300 - level) * 100);

  return { level, progressBar };
}