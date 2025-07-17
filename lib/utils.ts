import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TActivityReq, TActivityRes } from "./validations";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateGridPosition = (startTime: string, duration: number) => {
  const date = new Date(startTime);
  const hours = date.getHours();  
  const mins = date.getMinutes();

  const startRow = Math.floor((hours * 60 + mins) / 5) + 2; // Start from row 2
  const rowSpan = Math.floor(duration / 5);

  return { startRow, rowSpan };
};

export const mapActivityToRequestVersion = (
  activity?: TActivityRes,
): TActivityReq | undefined => {
  if (!activity) return undefined;

  return {
    id: activity.id,
    startTime: activity.startTime,
    minutes: activity.minutes,
    ...(activity.goalId
      ? { goalId: activity.goalId }
      : {
          title: activity.title,
          description: activity.description,
          impact: activity.impact,
        }),
  };
};
