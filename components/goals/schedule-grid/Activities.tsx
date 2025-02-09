import ImpactIndicator from "@/components/ImpactIndicator";
import { removeLeadingZeros } from "@/lib/format";
import { calculateGridPosition, cn } from "@/lib/utils";
import { TWeekDayRes } from "@/lib/validations";
import React from "react";

const Activities = ({ weekDays }: { weekDays: TWeekDayRes[] }) => {
  return weekDays.map((day, dayIndex) =>
    day.activities.map((activity) => {
      const { startRow, rowSpan } = calculateGridPosition(
        activity.startTime,
        activity.minutes,
      );

      return (
        <div
          key={activity.id}
          className={cn(
            "relative flex flex-col items-center justify-between rounded-sm border-x border-slate-500 bg-blue-dark bg-opacity-70 p-[2px] text-xs",
            activity.minutes <= 15 && "p-0 text-[9px]",
            activity.goalTitle &&
              "bg-[url('/icons/goal-sec.svg')] bg-left bg-no-repeat",
          )}
          style={{
            gridColumn: dayIndex + 2,
            gridRow: `${startRow} / span ${rowSpan}`,
            backgroundSize: "40%",
          }}
        >
          <div
            className={cn(
              "absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 pr-[8px] text-center",
              "overflow-hidden text-ellipsis", //text truncation
              activity.minutes <= 40 && "whitespace-nowrap",
              activity.minutes > 40 && "line-clamp-2",
              activity.minutes >= 60 && "top-0 translate-y-0",
            )}
          >
            {activity.title}
          </div>
          <p
            className={cn(
              "absolute bottom-[1px] right-[3px] text-[10px] leading-none text-slate-500",
              activity.minutes < 65 && "hidden",
            )}
          >
            {removeLeadingZeros(activity.startTime)} -{" "}
            {removeLeadingZeros(activity.endTime)}
          </p>
          <ImpactIndicator impact={activity.impact} insideGrid />
        </div>
      );
    }),
  );
};

export default Activities;
