import { getPlannedEvents } from "@/lib/api";
import Image from "next/image";
import React from "react";
import EventDetails from "./EventDetails";

const PlannedEvents = async () => {
  const plannedEvents = await getPlannedEvents();

  //TODO: add AddEvent component relative to this one

  return plannedEvents.map((plannedEvent) => {
    const scheduledDate = new Date(plannedEvent.scheduledDate);
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
      .format(scheduledDate)
      .replace(/, /g, ",\u00A0\u00A0");

    return (
      <div key={plannedEvent.id}>
        <div className="flex items-center gap-x-[5px]">
          <Image
            src="icons/calendar.svg"
            width={24}
            height={24}
            alt="Scheduled Date"
          />
          <span className="text-xl">{formattedDate}</span>
        </div>
        <div className="mb-[30px] mt-[15px] flex flex-col gap-y-[25px]">
          <EventDetails eventDetails={plannedEvent.eventDetails} />
        </div>
      </div>
    );
  });
};

export default PlannedEvents;
