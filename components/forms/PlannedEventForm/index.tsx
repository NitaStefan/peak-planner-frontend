"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  plannedEventSchema,
  TEventDetails,
  TPlannedEvent,
  TPlannedEventSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import EventDetailsForm from "./EventDetailsForm";
import EventDetails from "@/components/Events/PlannedEvents/EventDetails";
import Image from "next/image";
import { deleteEventDetails } from "@/lib/api";

type PlannedEventFormProps = {
  initPlannedEvent?: TPlannedEvent;
  mutateData: (data: TPlannedEvent) => Promise<void>;
};

const PlannedEventForm = ({
  initPlannedEvent = undefined,
  mutateData,
}: PlannedEventFormProps) => {
  //TODO: create a custom hook and refactor code + complete functionality
  const plannedEventRef = useRef<TPlannedEvent>(
    initPlannedEvent ?? {
      scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // next day
      eventDetails: [],
    },
  );

  const eventDetailsIdsForDeletion = useRef<number[]>([]);

  const [toBeUpdated, setToBeUpdated] = useState<{
    index: number | null;
    initEventDetails?: TEventDetails;
  }>({
    index: plannedEventRef.current.eventDetails.length === 0 ? -1 : null,
  });

  const form = useForm<TPlannedEventSchema>({
    resolver: zodResolver(plannedEventSchema),
    defaultValues: {
      scheduledDate: new Date(plannedEventRef.current.scheduledDate),
    },
  });

  const saveEventDetails = (
    updatedEventDetails: TEventDetails,
    indexToUpdate?: number,
  ) => {
    plannedEventRef.current.eventDetails =
      indexToUpdate !== -1
        ? // Replace the event detail at the given index
          plannedEventRef.current.eventDetails.map((ev, i) =>
            i === indexToUpdate ? updatedEventDetails : ev,
          )
        : // Add a new event detail if no index is -1
          [
            ...(plannedEventRef.current.eventDetails || []),
            updatedEventDetails,
          ];
  };

  const deleteEventDetail = (indexToRemove: number) => {
    if (plannedEventRef.current.eventDetails[indexToRemove].id)
      eventDetailsIdsForDeletion.current.push(
        plannedEventRef.current.eventDetails[indexToRemove].id as number,
      );

    plannedEventRef.current.eventDetails =
      plannedEventRef.current.eventDetails.filter(
        (_, index) => index !== indexToRemove,
      );

    setToBeUpdated({ index: null });
  };

  const onSubmit = async (data: TPlannedEventSchema) => {
    const localDate = new Date(data.scheduledDate);
    const utcDate = new Date(
      Date.UTC(
        localDate.getFullYear(),
        localDate.getMonth(),
        localDate.getDate(),
      ),
    );
    plannedEventRef.current.scheduledDate = utcDate;
    await deleteEventDetails(eventDetailsIdsForDeletion.current);
    await mutateData(plannedEventRef.current);
  };

  return (
    <div
      className={cn(
        "relative w-full rounded-md border-2 border-bone-white border-opacity-40 bg-blue-dark pb-[56px]",
        (plannedEventRef.current.eventDetails.length === 0 ||
          toBeUpdated.index !== null) &&
          "pb-0",
      )}
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="shadcn-form rounded-t-md border-b-2"
        >
          <FormField
            control={form.control}
            name="scheduledDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Scheduled Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        className={cn(
                          "date-button pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(
                            field.value,
                            "EEEE,\u00A0\u00A0MMMM dd,\u00A0\u00A0yyyy",
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={form.formState.isSubmitting}
            type="submit"
            className={cn(
              "absolute bottom-[20px] w-[calc(100%-50px)] bg-orange-act text-base max-sm:w-[calc(100%-24px)]",
              (plannedEventRef.current.eventDetails.length === 0 ||
                toBeUpdated.index !== null) &&
                "hidden",
            )}
          >
            {/* TODO: Dont show Button if EventDetailsForm is shown */}
            {form.formState.isSubmitting
              ? "Submitting..."
              : plannedEventRef.current.id
                ? "Update Planned Event"
                : "Add Planned Event"}
          </Button>
        </form>
      </Form>
      {toBeUpdated.index !== null ? (
        <EventDetailsForm
          initEventDetails={toBeUpdated.initEventDetails}
          saveEventDetails={(updatedEventDetails: TEventDetails) => {
            saveEventDetails(updatedEventDetails, toBeUpdated.index as number);
            setToBeUpdated({ index: null });
          }}
        />
      ) : (
        <div className="flex flex-col gap-y-[20px] border-bone-white border-opacity-40 pb-[20px]">
          <EventDetails
            eventDetails={plannedEventRef.current.eventDetails}
            setToBeUpdated={setToBeUpdated}
            onDelete={deleteEventDetail}
            // pendingDeletions={eventDetailsIdsForDeletion.current}
          />
          <div className="px">
            <Button
              onClick={() => setToBeUpdated({ index: -1 })}
              className="mt-[10px] w-full border-2 border-orange-act text-base text-orange-act"
            >
              Add Other Event Details
            </Button>
          </div>
        </div>
      )}
      {toBeUpdated.index !== null &&
        plannedEventRef.current.eventDetails.length !== 0 && (
          <Button
            onClick={() => setToBeUpdated({ index: null })}
            className="absolute right-[4px] top-[100px] gap-[3px] text-slate-500 shadow-none"
          >
            <Image
              src="icons/arrow-back.svg"
              width={20}
              height={20}
              alt="Go Back"
            />
            Go Back
          </Button>
        )}
    </div>
  );
};

export default PlannedEventForm;
