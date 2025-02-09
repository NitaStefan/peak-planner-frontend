import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateGridPosition = (startTime: string, duration: number) => {
  const [hours, mins] = startTime.split(":").map(Number);
  const startRow = Math.floor((hours * 60 + mins) / 5) + 2; // Start from row 2
  const rowSpan = Math.floor(duration / 5);
  return { startRow, rowSpan };
};
