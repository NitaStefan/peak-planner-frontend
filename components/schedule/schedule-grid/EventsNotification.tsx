"use client";

import Time from "@/components/events/planned-events/Time";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getWeekDates } from "@/lib/timeHelpers";
import { DayOfWeek } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TFlexibleEventResponse, TPlannedEvent } from "@/lib/validations";
import Image from "next/image";

const EventsNotification = ({
  dayName,
  upPlannedEvents,
  upFlexibleEvents,
}: {
  dayName: DayOfWeek;
  upPlannedEvents: (TPlannedEvent & { id: number })[];
  upFlexibleEvents: TFlexibleEventResponse[];
}) => {
  // Refactor: get events server side and place them inside the content
  const dayOfWeekDate = getWeekDates()[dayName];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const activePlannedEvent = upPlannedEvents.find(
    (plEvent) =>
      new Date(plEvent.scheduledDate).toISOString() ===
      dayOfWeekDate.toISOString(),
  );

  const activeFlexibleEvents = upFlexibleEvents.filter((flEvent) => {
    const startDate = new Date(flEvent.startDate);
    const endDate = new Date(flEvent.endDate);

    return (
      dayOfWeekDate >= startDate &&
      dayOfWeekDate <= endDate &&
      today <= dayOfWeekDate
    );
  });

  return (
    <Popover>
      <PopoverTrigger
        className={cn(
          "relative opacity-20",
          (activePlannedEvent || activeFlexibleEvents.length > 0) &&
            "opacity-100",
        )}
        disabled={!activePlannedEvent && !activeFlexibleEvents.length}
      >
        <Image
          src="/icons/event.svg"
          width={24}
          height={24}
          alt="Active events"
        />
        {activePlannedEvent && (
          <span className="absolute bottom-[-4px] right-[-7px] rounded-full border border-blue-400 bg-blue-darker/70 px-[3px] text-xs font-bold leading-none text-blue-400">
            {activePlannedEvent.eventDetails.length}
          </span>
        )}
        {activeFlexibleEvents.length > 0 && (
          <span className="absolute right-[-7px] top-0 rounded-full border border-blue-200 bg-blue-darker/90 px-[3px] text-xs font-bold leading-none text-blue-200">
            {activeFlexibleEvents.length}
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="border-none bg-blue-medium/70 p-[4px] text-bone-white">
        <div className="flex flex-col gap-y-[5px]">
          {activePlannedEvent && (
            <span className="text-slate-400">- Planned Events -</span>
          )}
          {activePlannedEvent?.eventDetails.map((detail) => (
            <div key={detail.id} className="flex justify-between">
              <span className="max-w-[150px] text-sm">{detail.title}</span>
              <div className="relative top-[-11px] w-[100px]">
                <Time startTime={detail.startTime} minutes={detail.minutes} />
              </div>
            </div>
          ))}
          {activeFlexibleEvents.length > 0 && (
            <span className="text-slate-400">- Flexible Events -</span>
          )}
          {activeFlexibleEvents.map((event) => (
            <span key={event.id} className="text-sm">
              {event.title}
            </span>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EventsNotification;
