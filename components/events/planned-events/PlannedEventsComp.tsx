"use client";

import { PlannedEventContextProvider } from "@/contexts/PlannedEventContext";
import { formatPlannedEventDate } from "@/lib/format";
import { TPlannedEvent } from "@/lib/validations";
import React from "react";
import PlannedEventsActions from "./crud-actions/PlannedEventsActions";
import EventDetails from "./EventDetails";
import PastEventsIndicator from "../PastEventsIndicator";
import UpdatePlannedEvDialog from "./crud-actions/UpdatePlannedEvDialog";
import DirectPlannedEventDelete from "./crud-actions/DirectPlannedEventDelete";
import AddPlannedEvDialog from "./crud-actions/AddPlannedEvDialog";
import CalendarIcon from "./CalendarIcon";

const PlannedEventsComp = ({
  upcomingPlannedEvents,
  pastPlannedEvents,
}: {
  upcomingPlannedEvents: (TPlannedEvent & { id: number })[];
  pastPlannedEvents: (TPlannedEvent & { id: number })[];
}) => {
  const processedUpcomingEvents = upcomingPlannedEvents.map((event) => ({
    ...event,
    eventDetails: event.eventDetails
      .map((detail) => ({
        ...detail,
        // startTime: detail.startTime
        //   ? convertUTCToLocal(detail.startTime)
        //   : undefined,
      }))
      .sort((a, b) => {
        if (!a.startTime && !b.startTime) return 0;
        if (!a.startTime) return 1; // Put undefined at the end
        if (!b.startTime) return -1;
        return a.startTime.localeCompare(b.startTime);
      }),
  }));

  // const processedPastEvents = pastPlannedEvents.map((event) => ({
  //   ...event,
  //   eventDetails: event.eventDetails.map((detail) => ({
  //     ...detail,
  //     startTime: detail.startTime
  //       ? convertUTCToLocal(detail.startTime)
  //       : undefined,
  //   })),
  // }));

  return (
    <>
      {processedUpcomingEvents.map((plannedEvent, index) => {
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

export default PlannedEventsComp;
