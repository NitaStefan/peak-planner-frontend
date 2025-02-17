import React from "react";
import PlannedEventsActions from "./crud-actions/PlannedEventsActions";
import EventDetails from "./EventDetails";
import { PlannedEventContextProvider } from "@/contexts/PlannedEventContext";
import AddPlannedEvDialog from "./crud-actions/AddPlannedEvDialog";
import UpdatePlannedEvDialog from "./crud-actions/UpdatePlannedEvDialog";
import CalendarIcon from "./CalendarIcon";
import { formatPlannedEventDate } from "@/lib/format";
import { getPastPlannedEvents, getUpcomingPlannedEvents } from "@/lib/api";
import DirectPlannedEventDelete from "./crud-actions/DirectPlannedEventDelete";
import PastEventsIndicator from "../PastEventsIndicator";

const PlannedEvents = async () => {
  const [upcomingPlannedEvents, pastPlannedEvents] = await Promise.all([
    getUpcomingPlannedEvents(),
    getPastPlannedEvents(),
  ]);

  return (
    <>
      {upcomingPlannedEvents.map((plannedEvent, index) => {
        const otherDates = upcomingPlannedEvents
          .filter((_, i) => i !== index)
          .map((event) => event.scheduledDate);

        return (
          <PlannedEventContextProvider
            key={plannedEvent.id}
            plannedEvent={plannedEvent}
            otherDates={otherDates}
          >
            <div>
              <div className="flex items-center gap-x-[5px]">
                <CalendarIcon />
                <span className="text-xl">
                  {formatPlannedEventDate(plannedEvent.scheduledDate)}
                </span>
                <PlannedEventsActions />
              </div>
              <div className="mb-[30px] mt-[10px] flex flex-col gap-y-[25px]">
                <EventDetails eventDetails={plannedEvent.eventDetails} />
              </div>
            </div>
          </PlannedEventContextProvider>
        );
      })}
      {pastPlannedEvents.length > 0 && <PastEventsIndicator />}
      {pastPlannedEvents.map((pastPlannedEvent) => (
        <PlannedEventContextProvider
          key={pastPlannedEvent.id}
          plannedEvent={pastPlannedEvent}
        >
          <div>
            <div className="flex items-center gap-x-[5px]">
              <CalendarIcon isPast />
              <span className="text-xl opacity-60">
                {formatPlannedEventDate(pastPlannedEvent.scheduledDate)}
              </span>
              <div className="ml-auto">
                <UpdatePlannedEvDialog />
                <DirectPlannedEventDelete />
              </div>
            </div>
            <div className="mb-[30px] mt-[10px] flex flex-col gap-y-[25px] opacity-60">
              <EventDetails eventDetails={pastPlannedEvent.eventDetails} />
            </div>
          </div>
        </PlannedEventContextProvider>
      ))}

      <AddPlannedEvDialog
        allDates={upcomingPlannedEvents.map((event) => event.scheduledDate)}
      />
    </>
  );
};

export default PlannedEvents;
