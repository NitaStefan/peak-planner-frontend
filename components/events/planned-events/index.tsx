import { getPlannedEvents } from "@/lib/api";
import React from "react";
import PlannedEventsActions from "./crud-actions/PlannedEventsActions";
import EventDetails from "./EventDetails";
import { PlannedEventContextProvider } from "@/contexts/PlannedEventContext";
import AddPlannedEvDialog from "./crud-actions/AddPlannedEvDialog";
import UpdatePlannedEvDialog from "./crud-actions/UpdatePlannedEvDialog";
import DeletePlannedEvDialog from "./crud-actions/DeletePlannedEvDialog";
import CalendarIcon from "./CalendarIcon";
import { formatPlannedEventDate } from "@/lib/format";

const PlannedEvents = async () => {
  const plannedEvents = await getPlannedEvents();

  // Get today's date at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // TODO: Separate call not awaited, sorted descending (same for flexible)
  const pastPlannedEvents = plannedEvents.filter(
    (event) => new Date(event.scheduledDate) < today,
  );

  const upcomingPlannedEvents = plannedEvents.filter(
    (event) => new Date(event.scheduledDate) >= today,
  );

  const allDates = upcomingPlannedEvents.map((event) => event.scheduledDate);

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
      {pastPlannedEvents.length > 0 && <hr />}
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
                {/* TODO: create a separate delete component that directly calls the
                delete api */}
                <DeletePlannedEvDialog />
              </div>
            </div>
            <div className="mb-[30px] mt-[10px] flex flex-col gap-y-[25px] opacity-60">
              <EventDetails eventDetails={pastPlannedEvent.eventDetails} />
            </div>
          </div>
        </PlannedEventContextProvider>
      ))}

      <AddPlannedEvDialog allDates={allDates} />
    </>
  );
};

export default PlannedEvents;
