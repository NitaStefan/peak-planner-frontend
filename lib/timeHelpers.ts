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
