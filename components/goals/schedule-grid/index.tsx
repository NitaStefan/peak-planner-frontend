import { TWeekDayRes } from "@/lib/validations";
import React from "react";
import BgMask from "./BgMask";
import TimeIcon from "./TimeIcon";
import HoursColumn from "./HoursColumn";
import WeekdayHeaders from "./WeekdayHeaders";
import Activities from "./Activities";

const ScheduleGrid = ({ weekDays }: { weekDays: TWeekDayRes[] }) => {
  return (
    <div className="relative w-full max-sm:w-[calc(100vw-30px)] sm:max-w-[calc(100vw-150px)] lg:max-w-[calc(100vw-300px)]">
      <div
        className="scrollbar-thin grid h-[500px] w-full overflow-auto rounded-md border-2 border-r-0 border-slate-500 bg-blue-darker"
        style={{
          gridTemplateColumns: "30px repeat(7, minmax(110px, 1fr))",
          gridTemplateRows: "auto repeat(288, 3px)", // 288 rows (each 5 min = 3px)
          scrollbarGutter: "stable both-edges",
        }}
      >
        {/* Background Mask to Hide Content Behind - caused by the extra-space from vertical scrollbar*/}
        <BgMask />

        {/* Top-left icon */}
        <TimeIcon />

        {/* Hours in the First Column (Sticky on Horizontal Scroll) */}
        <HoursColumn />

        {/* Weekday Headers */}
        <WeekdayHeaders weekDayNames={weekDays.map((day) => day.day)} />

        {/* Activities */}
        <Activities weekDays={weekDays} />
      </div>
    </div>
  );
};

export default ScheduleGrid;
