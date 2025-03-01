"use client";

import ScheduleGrid from "@/components/schedule/schedule-grid";
import {
  TFlexibleEventResponse,
  TPlannedEvent,
  TWeekDayRes,
} from "@/lib/validations";
import { convertUTCToLocal } from "@/lib/format";
import { getWeekDates } from "@/lib/timeHelpers";

const ClientScheduleWrapper = ({
  initialWeekDays,
  upPlannedEvents,
  upFlexibleEvents,
}: {
  initialWeekDays: TWeekDayRes[];
  upPlannedEvents: (TPlannedEvent & { id: number })[];
  upFlexibleEvents: TFlexibleEventResponse[];
}) => {
  const processedWeekDays = initialWeekDays.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      startTime: convertUTCToLocal(activity.startTime),
      endTime: convertUTCToLocal(activity.endTime),
    })),
  }));

  const processedUpcomingEvents = upPlannedEvents.map((event) => ({
    ...event,
    eventDetails: event.eventDetails.map((detail) => ({
      ...detail,
      startTime: detail.startTime
        ? convertUTCToLocal(detail.startTime)
        : undefined,
    })),
  }));

  const weekDates = getWeekDates();

  return (
    <ScheduleGrid
      weekDays={processedWeekDays}
      weekDates={weekDates}
      upPlannedEvents={processedUpcomingEvents}
      upFlexibleEvents={upFlexibleEvents}
    />
  );
};

export default ClientScheduleWrapper;
