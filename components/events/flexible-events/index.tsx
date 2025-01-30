import { getFlexibleEvents } from "@/lib/api";
import { format } from "date-fns";
import Image from "next/image";
import React from "react";
import AddFlexibleEvDialog from "./crud-actions/AddFlexibleEvDialog";
import FlexibleEventsActions from "./crud-actions/FlexibleEventsActions";
import { FlexibleEventContextProvider } from "@/contexts/FlexibleEventContext";
import { cn } from "@/lib/utils";

const FlexibleEvents = async () => {
  const flexibleEvents = await getFlexibleEvents();

  return (
    <>
      {flexibleEvents.map((flexibleEvent) => {
        const startDate = format(
          flexibleEvent.startDate,
          "EEE,\u00A0MMM\u00A0 dd,\u00A0yyyy",
        );

        const endDate = format(
          flexibleEvent.endDate,
          "EEE,\u00A0MMM\u00A0 dd,\u00A0yyyy",
        );

        return (
          <FlexibleEventContextProvider
            key={flexibleEvent.id}
            flexibleEvent={flexibleEvent}
          >
            <div>
              <div className="flex items-center gap-x-[4px]">
                <Image
                  src="icons/calendar.svg"
                  width={24}
                  height={24}
                  alt="Start Date"
                  className="max-sm:hidden"
                />
                <span className="text-xl max-sm:text-lg">{startDate}</span>
                <Image
                  src="icons/curved-arrow.svg"
                  width={22}
                  height={22}
                  alt="Arrow"
                  className="rotate-90"
                />
                <span className="text-xl max-sm:text-lg">{endDate}</span>
                <FlexibleEventsActions />
              </div>
              <div
                className={cn(
                  "px mb-[30px] mt-[10px] rounded-md py-[20px]",
                  flexibleEvent.isActive ? "bg-blue-medium" : "bg-blue-dark",
                )}
              >
                <h2 className="text-lg">{flexibleEvent.title}</h2>
                <div className="pt-[10px] font-karla">
                  {flexibleEvent.description}
                </div>
              </div>
            </div>
          </FlexibleEventContextProvider>
        );
      })}
      <AddFlexibleEvDialog />
    </>
  );
};

export default FlexibleEvents;
