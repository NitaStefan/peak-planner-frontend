import { getSchedule } from "@/lib/api";
import React from "react";
import { cn } from "@/lib/utils";
import ImpactIndicator from "@/components/ImpactIndicator";
import { removeLeadingZeros } from "@/lib/format";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();

  const calculateGridPosition = (startTime: string, duration: number) => {
    const [hours, mins] = startTime.split(":").map(Number);
    const startRow = Math.floor((hours * 60 + mins) / 5) + 2; // start from row 2
    const rowSpan = Math.floor(duration / 5);
    return { startRow, rowSpan };
  };

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-4 text-2xl">Modify Schedule</h1>
      <div
        className="scrollbar-thin grid h-[500px] w-full gap-x-[3px] overflow-auto rounded-md border-2 border-r-0 border-slate-500 bg-blue-darker max-md:max-w-[500px] max-sm:max-w-[320px]"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto repeat(288, 3px)",
          scrollbarGutter: "stable both-edges",
        }}
      >
        {weekDays.map((day) => (
          <div
            key={day.id}
            className="sticky top-0 z-10 border-b-2 border-slate-500 bg-blue-darker py-[6px] text-center"
          >
            <span>
              {day.day.charAt(0).toUpperCase() +
                day.day.slice(1, 3).toLowerCase()}
            </span>
            <span className="max-sm:hidden">
              {day.day.slice(3).toLowerCase()}
            </span>
          </div>
        ))}

        {weekDays.map((day, dayIndex) =>
          day.activities.map((activity) => {
            const { startRow, rowSpan } = calculateGridPosition(
              activity.startTime,
              activity.minutes,
            );

            return (
              <div
                key={activity.id}
                className={cn(
                  "relative flex flex-col items-center justify-between rounded-sm bg-blue-dark p-[2px] pr-[8px] text-xs",
                  activity.minutes <= 15 && "p-0 text-[9px]",
                  activity.goalTitle &&
                    "bg-[url('/icons/goal-sec.svg')] bg-left bg-no-repeat",
                )}
                style={{
                  gridColumn: dayIndex + 1,
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

                {/* TODO: move separately and add curved arrow icon */}
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
        )}
      </div>
    </div>
  );
};

export default ModifySchedulePage;
