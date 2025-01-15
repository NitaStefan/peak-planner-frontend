import React from "react";
import { type EventDetails } from "@/lib/types";
import Time from "./Time";

const EventDetails = ({ eventDetails }: { eventDetails: EventDetails[] }) => {
  return eventDetails.map((detail) => {
    return (
      <div key={detail.id} className="rounded-md bg-blue-dark p-[20px]">
        <div className="flex items-center gap-x-[15px]">
          <h2 className="text-lg">{detail.title}</h2>
          <Time startTime={detail.startTime} minutes={detail.minutes} />
        </div>
        <div className="pt-[20px] font-karla">{detail.description}</div>
      </div>
    );
  });
};

export default EventDetails;
