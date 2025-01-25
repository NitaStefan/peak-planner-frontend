import { useRef, useState } from "react";
import type { TEventDetails, TPlannedEvent } from "@/lib/validations";
import { addMinutesToTime } from "@/lib/timeHelpers";
import { useToast } from "@/hooks/use-toast";
import { findOverlappingIntervals } from "@/lib/checks";

export const usePlannedEvent = (initPlannedEvent?: TPlannedEvent) => {
  // make a copy, in case an event detail is deleted and the form is not submitted
  const plannedEventRef = useRef<TPlannedEvent>(
    initPlannedEvent
      ? {
          ...initPlannedEvent,
          eventDetails: [...initPlannedEvent.eventDetails],
        }
      : {
          scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)),
          eventDetails: [],
        },
  );

  const eventDetailsIdsForDeletion = useRef<number[]>([]);
  const { toast } = useToast();

  const [toBeUpdated, setToBeUpdated] = useState<{
    index: number | null;
    initEventDetails?: TEventDetails;
  }>({
    index: plannedEventRef.current.eventDetails.length === 0 ? -1 : null,
  });

  const saveEventDetails = (
    updatedEventDetails: TEventDetails,
    indexToUpdate?: number,
  ) => {
    plannedEventRef.current.eventDetails =
      indexToUpdate !== -1
        ? plannedEventRef.current.eventDetails.map((ev, i) =>
            i === indexToUpdate ? updatedEventDetails : ev,
          )
        : [...plannedEventRef.current.eventDetails, updatedEventDetails];
  };

  const deleteEventDetail = (indexToRemove: number) => {
    if (plannedEventRef.current.eventDetails[indexToRemove].id) {
      eventDetailsIdsForDeletion.current.push(
        plannedEventRef.current.eventDetails[indexToRemove].id as number,
      );
    }

    plannedEventRef.current.eventDetails =
      plannedEventRef.current.eventDetails.filter(
        (_, index) => index !== indexToRemove,
      );

    setToBeUpdated({ index: null });
  };

  const checkOverlappingEvents = () => {
    const intervals = plannedEventRef.current.eventDetails
      .filter((detail) => detail.startTime)
      .map((detail) => {
        const h1 = detail.startTime as string;
        const h2 = detail.minutes
          ? addMinutesToTime(
              detail.startTime as string,
              detail.minutes as number,
            )
          : h1;
        return { h1, h2, title: detail.title };
      });

    const overlappingTitles = findOverlappingIntervals(intervals);

    if (overlappingTitles) {
      toast({
        title: "Overlapping Events",
        description: `The events "${overlappingTitles.title1}" and "${overlappingTitles.title2}" have overlapping intervals. Please adjust them.`,
        variant: "destructive",
      });
      return true;
    }

    return false;
  };

  return {
    plannedEventRef,
    eventDetailsIdsForDeletion,
    toBeUpdated,
    setToBeUpdated,
    saveEventDetails,
    deleteEventDetail,
    checkOverlappingEvents,
  };
};
