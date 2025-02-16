import { format, parseISO } from "date-fns";

export const formatTime = (time: string | undefined) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

export const convertTimeToISO = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) throw new Error("Invalid time format");

  // Get current local date and set the time
  const now = new Date();
  now.setHours(hours, minutes, 0, 0); // Set the local time
  now.setFullYear(2025, 0, 1); // Ensure fixed date to avoid DST issues

  // Convert local time to UTC using `toISOString()`
  const utcTime = now.toISOString().split("T")[1].slice(0, 5);

  return utcTime;
};

export const convertUTCToLocal = (utcTime?: string): string => {
  if (!utcTime) return "";

  const [hours, minutes] = utcTime.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) throw new Error("Invalid time format");

  // Create a Date object with today's date but UTC time
  const utcDate = new Date();
  utcDate.setUTCHours(hours, minutes, 0, 0); // Set time in UTC

  // Convert to local time
  const localHours = utcDate.getHours().toString().padStart(2, "0");
  const localMinutes = utcDate.getMinutes().toString().padStart(2, "0");

  return `${localHours}:${localMinutes}`;
};

export const formatDate4M2d4y = (dateString: string): string => {
  try {
    return format(
      parseISO(new Date(dateString).toISOString()),
      "MMMM dd, yyyy",
    );
  } catch (error) {
    console.error("Error formatting date:", error);
    return "Unknown date";
  }
};

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60); // Calculate full hours
  const remainingMinutes = minutes % 60; // Calculate remaining minutes

  // Build the duration string
  let result = "";
  if (hours > 0) result += `${hours}h `;
  if (remainingMinutes > 0) result += `${remainingMinutes}m`;

  return result.trim(); // Remove trailing spaces
}

export const removeLeadingZeros = (time: string | undefined) => {
  if (!time) return "";
  const [hours, minutes] = time.split(":");
  return `${parseInt(hours, 10)}:${minutes}`;
};

export const formatPlannedEventDate = (date: Date) =>
  format(date, "EEEE,\u00A0\u00A0MMMM dd,\u00A0\u00A0yyyy");
