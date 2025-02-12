import { DayOfWeek } from "@/lib/types";
import React from "react";

const WeekdayHeaders = ({ weekDayNames }: { weekDayNames: DayOfWeek[] }) => {
  return weekDayNames.map((dayName, index) => (
    <div
      key={index}
      className="sticky top-0 z-10 border-b-2 border-slate-500 bg-blue-darker py-[6px] text-center"
      style={{ gridColumn: index + 2 }}
    >
      {dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()}
    </div>
  ));
};

export default WeekdayHeaders;
