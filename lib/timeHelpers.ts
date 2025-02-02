import { removeLeadingZeros } from "./format";

export function addMinutesToTime(time: string, minutesToAdd: number): string {
  // Parse the time string into hours and minutes
  const [hours, minutes] = time.split(":").map(Number);

  // Create a Date object initialized with today's date and the given time
  const date = new Date();
  date.setHours(hours, minutes, 0, 0); // Set hours and minutes

  // Add the minutes
  date.setMinutes(date.getMinutes() + minutesToAdd);

  // Format the updated time back to HH:mm
  const updatedHours = date.getHours().toString().padStart(2, "0");
  const updatedMinutes = date.getMinutes().toString().padStart(2, "0");

  return removeLeadingZeros(`${updatedHours}:${updatedMinutes}`);
}

export const subtractDaysFromDate = (date: Date, days: number): Date => {
  const inputDate = new Date(date);
  inputDate.setUTCDate(inputDate.getUTCDate() - days); // Subtract days in UTC
  return inputDate;
};

export const calculateProgress = (endDate: Date, days: number): number => {
  const timeDiff = new Date(endDate).getTime() - new Date().getTime();
  const elapsedDays =
    days - Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24))); // Days passed

  return Math.min(100, Math.max(0, (elapsedDays / days) * 100)); // Normalize progress to 0-100%
};
