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
            "relative flex flex-col items-center justify-between rounded-sm border-x border-slate-500 bg-blue-dark bg-opacity-70 p-[2px] pr-[8px] text-xs",
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
              "text-center",
              activity.minutes <= 20 && "-translate-y-[4px]",
              activity.minutes <= 15 && "-translate-y-[3px]",
            )}
          >
            {activity.title}
          </div>
          <p
            className={cn(
              "text-xs text-slate-400",
              activity.minutes <= 40 && "hidden",
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
