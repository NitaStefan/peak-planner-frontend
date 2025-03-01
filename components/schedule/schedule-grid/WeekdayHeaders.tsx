import { DayOfWeek } from "@/lib/types";
import React from "react";
import EventsNotification from "./EventsNotification";
import { cn } from "@/lib/utils";
import { TFlexibleEventResponse, TPlannedEvent } from "@/lib/validations";
import { format } from "date-fns";

const WeekdayHeaders = ({
  weekDayNames,
  weekDates,
  upPlannedEvents,
  upFlexibleEvents,
}: {
  weekDayNames: DayOfWeek[];
  weekDates?: Record<DayOfWeek, Date>;
  upPlannedEvents?: (TPlannedEvent & { id: number })[];
  upFlexibleEvents?: TFlexibleEventResponse[];
}) => {
  const inTimeline = !!weekDates;

  return weekDayNames.map((dayName, index) => (
    <div
      key={index}
      className={cn(
        "sticky top-0 z-10 border-b-2 border-slate-500 bg-blue-darker py-[6px] text-center",
        inTimeline && "text-left",
      )}
      style={{ gridColumn: index + 2 }}
    >
      <div className="flex items-center gap-x-[6px]">
        <div>
          <span>
            {dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()}
          </span>
          {inTimeline && (
            <p className="mt-[-3px] text-xs leading-none text-slate-500">
              {format(weekDates![dayName], "d MMM")}
            </p>
          )}
        </div>
        {inTimeline && upPlannedEvents && upFlexibleEvents && (
          <EventsNotification
            dayName={dayName}
            upPlannedEvents={upPlannedEvents}
            upFlexibleEvents={upFlexibleEvents}
          />
        )}
      </div>
    </div>
  ));
};

export default WeekdayHeaders;
