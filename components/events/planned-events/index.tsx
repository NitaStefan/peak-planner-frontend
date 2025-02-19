import React from "react";
import { getPastPlannedEvents, getUpcomingPlannedEvents } from "@/lib/api";
import PlannedEventsComp from "./PlannedEventsComp";

const PlannedEvents = async () => {
  const [upcomingPlannedEvents, pastPlannedEvents] = await Promise.all([
    getUpcomingPlannedEvents(),
    getPastPlannedEvents(),
  ]);

  return (
    <PlannedEventsComp
      upcomingPlannedEvents={upcomingPlannedEvents}
      pastPlannedEvents={pastPlannedEvents}
    />
  );
};

export default PlannedEvents;
