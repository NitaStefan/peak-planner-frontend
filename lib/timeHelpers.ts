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
