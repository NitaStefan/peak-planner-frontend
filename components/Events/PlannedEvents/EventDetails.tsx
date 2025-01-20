import React from "react";
import Time from "./Time";
import { cn } from "@/lib/utils";
import { TEventDetails } from "@/lib/validations";

const EventDetails = ({ eventDetails }: { eventDetails: TEventDetails[] }) => {
  return eventDetails.map((detail) => {
    return (
      <div
        key={detail.id}
        className={cn(
          "relative rounded-md bg-blue-dark p-[20px] max-sm:p-[15px]",
          (detail.startTime || detail.minutes) && "pb-[25px] max-sm:pb-[25px]",
        )}
      >
        <h2 className="text-lg">{detail.title}</h2>
        <Time startTime={detail.startTime} minutes={detail.minutes} />
        <div className="pt-[10px] font-karla">{detail.description}</div>
      </div>
    );
  });
};

export default EventDetails;
