import { DayOfWeek } from "@/lib/types";
import React from "react";

const WeekdayHeaders = ({ weekDayNames }: { weekDayNames: DayOfWeek[] }) => {
  return weekDayNames.map((dayName, index) => (
    <div
      key={index}
      className="sticky top-0 z-10 border-b-2 border-slate-500 bg-blue-darker py-[6px] text-center"
      style={{ gridColumn: index + 2 }}
    >
      <span>
        {dayName.charAt(0).toUpperCase() + dayName.slice(1, 3).toLowerCase()}
      </span>
      <span className="max-sm:hidden">{dayName.slice(3).toLowerCase()}</span>
    </div>
  ));
};

export default WeekdayHeaders;
