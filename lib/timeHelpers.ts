import { addDays, startOfWeek } from "date-fns";
import { DayOfWeek } from "./types";

// export function addMinutesToTimeOLD(time: string, minutesToAdd: number): string {
//   // Parse the time string into hours and minutes
//   const [hours, minutes] = time.split(":").map(Number);

//   // Create a Date object initialized with today's date and the given time
//   const date = new Date();
//   date.setHours(hours, minutes, 0, 0); // Set hours and minutes

//   // Add the minutes
//   date.setMinutes(date.getMinutes() + minutesToAdd);

//   // Format the updated time back to HH:mm
//   const updatedHours = date.getHours().toString().padStart(2, "0");
//   const updatedMinutes = date.getMinutes().toString().padStart(2, "0");

//   return removeLeadingZeros(`${updatedHours}:${updatedMinutes}`);
// }

export function isoToLocalHour(isoString: string): string {
  if (!isoString) return "";

  const date = new Date(isoString);

  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}


export function addMinutesToTime(isoTime: string, minutesToAdd: number): string {

  const date = new Date(isoTime);
  date.setMinutes(date.getMinutes() + minutesToAdd);

  return date.toISOString()
}


export const getWeekDates = (): Record<DayOfWeek, Date> => {
  const startOfThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 });

  return {
    MONDAY: addDays(startOfThisWeek, 0),
    TUESDAY: addDays(startOfThisWeek, 1),
    WEDNESDAY: addDays(startOfThisWeek, 2),
    THURSDAY: addDays(startOfThisWeek, 3),
    FRIDAY: addDays(startOfThisWeek, 4),
    SATURDAY: addDays(startOfThisWeek, 5),
    SUNDAY: addDays(startOfThisWeek, 6),
  };
};
