import React from "react";
import AddFlexibleEvDialog from "./crud-actions/AddFlexibleEvDialog";
import FlexibleEventsActions from "./crud-actions/FlexibleEventsActions";
import { FlexibleEventContextProvider } from "@/contexts/FlexibleEventContext";
import { cn } from "@/lib/utils";
import { getPastFlexibleEvents, getUpcomingFlexibleEvents } from "@/lib/api";
import { formatFlexibleEventDate } from "@/lib/format";
import FlexibleCalendarIcon from "./FlexibleCalendarIcon";
import CurvedArrow from "./CurvedArrow";
import PastEventsIndicator from "../PastEventsIndicator";
import UpdateFlexibleEvDialog from "./crud-actions/UpdateFlexibleEvDialog";
import DirectDelete from "./crud-actions/DirectDelete";

const FlexibleEvents = async () => {
  const [upcomingFlexibleEvents, pastFlexibleEvents] = await Promise.all([
    getUpcomingFlexibleEvents(),
    getPastFlexibleEvents(),
  ]);

  return (
    <>
      {upcomingFlexibleEvents.map((flexibleEvent) => (
        <FlexibleEventContextProvider
          key={flexibleEvent.id}
          flexibleEvent={flexibleEvent}
        >
          <div>
            <div
              className={cn(
                "flex items-center gap-x-[4px]",
                flexibleEvent.isActive &&
                  "rounded-md border-b-2 border-blue-medium",
              )}
            >
              <FlexibleCalendarIcon />
              <span className="text-xl max-sm:text-lg">
                {formatFlexibleEventDate(flexibleEvent.startDate)}
              </span>
              <CurvedArrow />
              <span className="text-xl max-sm:text-lg">
                {formatFlexibleEventDate(flexibleEvent.endDate)}
              </span>
              <FlexibleEventsActions />
            </div>
            <div className="px mb-[30px] mt-[10px] rounded-md bg-blue-dark py-[20px]">
              <h2 className="text-lg">{flexibleEvent.title}</h2>
              <div className="whitespace-pre-line pt-[10px] font-karla">
                {flexibleEvent.description}
              </div>
            </div>
          </div>
        </FlexibleEventContextProvider>
      ))}
      {pastFlexibleEvents.length > 0 && <PastEventsIndicator />}
      {pastFlexibleEvents.map((flexibleEvent) => (
        <FlexibleEventContextProvider
          key={flexibleEvent.id}
          flexibleEvent={flexibleEvent}
        >
          <div>
            <div className="flex items-center gap-x-[4px]">
              <FlexibleCalendarIcon isPast />
              <span className="text-xl opacity-60 max-sm:text-base">
                {formatFlexibleEventDate(flexibleEvent.startDate)}
              </span>
              <CurvedArrow isPast />
              <span className="text-xl opacity-60 max-sm:text-base">
                {formatFlexibleEventDate(flexibleEvent.endDate)}
              </span>
              <div className="ml-auto">
                <UpdateFlexibleEvDialog />
                <DirectDelete />
              </div>
            </div>
            <div className="px mb-[30px] mt-[10px] rounded-md bg-blue-dark py-[20px] opacity-60">
              <h2 className="text-lg">{flexibleEvent.title}</h2>
              <div className="whitespace-pre-line pt-[10px] font-karla">
                {flexibleEvent.description}
              </div>
            </div>
          </div>
        </FlexibleEventContextProvider>
      ))}
      <AddFlexibleEvDialog />
    </>
  );
};

export default FlexibleEvents;
