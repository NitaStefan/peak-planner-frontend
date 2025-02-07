import { getSchedule } from "@/lib/api";
import React from "react";
import { cn } from "@/lib/utils";
import ImpactIndicator from "@/components/ImpactIndicator";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();

  const calculateGridPosition = (startTime: string, duration: number) => {
    const [hours, mins] = startTime.split(":").map(Number);
    const startRow = Math.floor((hours * 60 + mins) / 2) + 2; // start from row 2
    const rowSpan = Math.ceil(duration / 2);
    return { startRow, rowSpan };
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="mb-4 text-2xl">Modify Schedule</h1>

      <div
        className="grid h-[600px] w-full gap-x-[3px] rounded-md border-2 border-slate-500 bg-blue-dark"
        style={{
          gridTemplateColumns: "repeat(7, 1fr)",
          gridTemplateRows: "auto repeat(720, 1fr)",
        }}
      >
        {weekDays.map((day) => (
          <div
            key={day.id}
            className="border-b-2 border-slate-500 py-[6px] text-center"
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

        {/* Activity Items (Spanning 720 Rows) */}
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
                  "relative flex flex-col items-center rounded-md border-2 bg-blue-medium bg-opacity-65 p-[2px] text-sm",
                )}
                style={{
                  gridColumn: dayIndex + 1,
                  gridRow: `${startRow} / span ${rowSpan}`,
                }}
              >
                {activity.title}
                <p className="text-xs">
                  {activity.startTime} - {activity.endTime}
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
