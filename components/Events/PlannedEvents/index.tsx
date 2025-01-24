import { getPlannedEvents } from "@/lib/api";
import Image from "next/image";
import React from "react";
import { format } from "date-fns";
import PlannedEventsActions from "./crudActions/PlannedEventsActions";
import EventDetails from "./EventDetails";
import AddPlannedEvDialog from "../AddPlannedEvDialog";
import { PlannedEventContextProvider } from "@/contexts/PlannedEventContext";

const PlannedEvents = async () => {
  const plannedEvents = await getPlannedEvents();

  const allDates = plannedEvents.map((event) => event.scheduledDate);

  return (
    <React.Fragment>
      {plannedEvents.map((plannedEvent, index) => {
        const formattedDate = format(
          plannedEvent.scheduledDate,
          "EEEE,\u00A0\u00A0MMMM dd,\u00A0\u00A0yyyy",
        );
        const otherDates = plannedEvents
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
                <Image
                  src="icons/calendar.svg"
                  width={24}
                  height={24}
                  alt="Scheduled Date"
                />
                <span className="text-xl">{formattedDate}</span>
                <PlannedEventsActions />
              </div>
              <div className="mb-[30px] mt-[15px] flex flex-col gap-y-[25px]">
                <EventDetails eventDetails={plannedEvent.eventDetails} />
              </div>
            </div>
          </PlannedEventContextProvider>
        );
      })}

      <AddPlannedEvDialog allDates={allDates} />
    </React.Fragment>
  );
};

export default PlannedEvents;
