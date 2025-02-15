import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { hasOverlappingIntervals } from "@/lib/checks";
import { DayOfWeek } from "@/lib/types";
import { TActivityRes, TWeekDayRes } from "@/lib/validations";
import React from "react";

type ToggleDaysProps = {
  currentActivity: TActivityRes;
  weekDays: TWeekDayRes[];
  selectedDays: DayOfWeek[];
  setSelectedDays: React.Dispatch<React.SetStateAction<DayOfWeek[]>>;
  addActivityToDay: (day: DayOfWeek) => void;
  removeActivityFromDay: (day: DayOfWeek) => void;
};

const ToggleDays = ({
  currentActivity,
  weekDays,
  selectedDays,
  setSelectedDays,
  addActivityToDay,
  removeActivityFromDay,
}: ToggleDaysProps) => {
  const handleClick = (day: DayOfWeek) => {
    if (selectedDays.includes(day)) {
      // If selected, remove it
      setSelectedDays((prev) => prev.filter((d) => d !== day));
      removeActivityFromDay(day);
    } else {
      // If not selected, add it
      setSelectedDays((prev) => [...prev, day]);
      addActivityToDay(day);
    }
  };

  const ableToAddToDay = (day: DayOfWeek): boolean => {
    // Find the weekDay object corresponding to the given day
    const weekDay = weekDays.find((wd) => wd.day === day);
    if (!weekDay) return false; // If day not found, return false

    // Extract existing activities for that day
    const existingIntervals = weekDay.activities.map((activity) => ({
      h1: activity.startTime,
      h2: activity.endTime,
    }));

    // Ensure there is a current activity to check against
    if (!currentActivity) return false;

    // Create the interval for the currentActivity
    const currentActivityInterval = {
      h1: currentActivity.startTime,
      h2: currentActivity.endTime,
    };

    return !hasOverlappingIntervals([
      ...existingIntervals,
      currentActivityInterval,
    ]);
  };

  return (
    <ToggleGroup
      type="multiple"
      className="justify-start rounded-md bg-blue-dark px-[12px]"
      value={selectedDays}
    >
      {(
        [
          "MONDAY",
          "TUESDAY",
          "WEDNESDAY",
          "THURSDAY",
          "FRIDAY",
          "SATURDAY",
          "SUNDAY",
        ] as DayOfWeek[]
      ).map((day) => (
        <ToggleGroupItem
          key={day}
          value={day}
          className="inline text-base data-[state=on]:bg-orange-act data-[state=on]:text-bone-white"
          disabled={!selectedDays.includes(day) && !ableToAddToDay(day)}
          onClick={() => handleClick(day)}
        >
          {day.charAt(0) + day.slice(1, 3).toLowerCase()}
          <span className="max-md:hidden">{day.slice(3).toLowerCase()}</span>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
};

export default ToggleDays;
