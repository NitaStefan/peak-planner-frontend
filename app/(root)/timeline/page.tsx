// import ScheduleGrid from "@/components/schedule/schedule-grid";
import ClientScheduleWrapper from "@/components/schedule/schedule-grid/ClientScheduleWrapper";
import {
  getSchedule,
  getUpcomingFlexibleEvents,
  getUpcomingPlannedEvents,
} from "@/lib/api";
import React from "react";

const Page = async () => {
  const [weekDays, upcomingPlannedEvents, upcomingFlexibleEvents] =
    await Promise.all([
      getSchedule(),
      getUpcomingPlannedEvents(),
      getUpcomingFlexibleEvents(),
    ]);

  // return <ScheduleGrid weekDays={weekDays} />;
  return (
    <ClientScheduleWrapper
      initialWeekDays={weekDays}
      upPlannedEvents={upcomingPlannedEvents}
      upFlexibleEvents={upcomingFlexibleEvents}
    />
  );
};

export default Page;
