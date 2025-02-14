import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DayOfWeek } from "@/lib/types";
import React from "react";

const ToggleDays = ({
  ableToAddToDay,
  selectedDays,
  setSelectedDays,
  addActivityToDay,
  removeActivityFromDay,
}: {
  ableToAddToDay: (day: DayOfWeek) => boolean;
  selectedDays: DayOfWeek[];
  setSelectedDays: React.Dispatch<React.SetStateAction<DayOfWeek[]>>;
  addActivityToDay: (day: DayOfWeek) => void;
  removeActivityFromDay: (day: DayOfWeek) => void;
}) => {
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
