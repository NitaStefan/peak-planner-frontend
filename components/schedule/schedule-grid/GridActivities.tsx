"use client";

import ImpactIndicator from "@/components/ImpactIndicator";
import { isoToLocalHour } from "@/lib/timeHelpers";
import { DayOfWeek } from "@/lib/types";
import { calculateGridPosition, cn } from "@/lib/utils";
import { TActivityRes, TWeekDayRes } from "@/lib/validations";
import React from "react";

type GridActivitiesProps =
  | { weekDays: TWeekDayRes[] }
  | {
      weekDays: TWeekDayRes[];
      getSelectedActivity: (activity: TActivityRes, day: DayOfWeek) => void;
      deleteSelectedActivity: (activityId: number) => void;
      isDeleting: boolean;
      selectedActivityId?: number;
    };

const GridActivities = (props: GridActivitiesProps) => {
  const editMode = "isDeleting" in props;

  props.weekDays.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      // startTime: convertUTCToLocal(activity.startTime),
      // endTime: convertUTCToLocal(activity.endTime),
    })),
  }));

  return props.weekDays.map((day, dayIndex) =>
    day.activities.map((activity) => {
      const { startRow, rowSpan } = calculateGridPosition(
        activity.startTime,
        activity.minutes,
      );

      return (
        <div
          key={activity.id}
          {...(editMode && {
            onClick: () => {
              if (props.isDeleting) props.deleteSelectedActivity(activity.id);
              else props.getSelectedActivity(activity, day.day);
            },
          })}
          className={cn(
            "relative flex flex-col items-center justify-between rounded-sm border-x border-slate-500 bg-blue-dark bg-opacity-70 p-[2px] text-xs",
            activity.minutes <= 15 && "p-0 text-[9px]",
            activity.goalTitle &&
              "bg-[url('/icons/goal-sec.svg')] bg-left bg-no-repeat",
            editMode && props.isDeleting && "border-x-2 border-red-400",
            editMode && "cursor-pointer",
            editMode &&
              props.selectedActivityId === activity.id &&
              "bg-blue-medium",
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
            {isoToLocalHour(activity.startTime)} -{" "}
            {isoToLocalHour(activity.endTime)}
          </p>
          <ImpactIndicator impact={activity.impact} insideGrid />
        </div>
      );
    }),
  );
};

export default GridActivities;
