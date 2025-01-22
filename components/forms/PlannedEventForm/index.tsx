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
import React, { useState } from "react";
import EventDetailsForm from "./EventDetailsForm";
import EventDetails from "@/components/Events/PlannedEvents/EventDetails";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";

const PlannedEventForm = ({
  initPlannedEvent = undefined,
  mutateData,
}: {
  initPlannedEvent?: TPlannedEvent;
  mutateData: (data: TPlannedEvent) => Promise<void>;
}) => {
  const { toast } = useToast();

  const [plannedEvent, setPlannedEvent] = useState(
    () =>
      initPlannedEvent ?? {
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // next day
        eventDetails: [],
      },
  );

  const [toBeUpdated, setToBeUpdated] = useState<{
    index: number | null;
    initEventDetails?: TEventDetails;
  }>({
    index: plannedEvent.eventDetails.length === 0 ? -1 : null,
  });

  const saveEventDetails = (
    updatedEventDetails: TEventDetails,
    indexToUpdate?: number,
  ) => {
    setPlannedEvent((prev) => ({
      ...prev,
      eventDetails:
        indexToUpdate !== -1
          ? // Replace the event detail at the given index
            prev.eventDetails.map((ev, i) =>
              i === indexToUpdate ? updatedEventDetails : ev,
            )
          : // Add a new event detail if no index is -1
            [...(prev.eventDetails || []), updatedEventDetails],
    }));
  };

  const deleteEventDetail = (indexToRemove: number) => {
    setPlannedEvent((prev) => ({
      ...prev,
      eventDetails: prev.eventDetails.filter(
        (_, index) => index !== indexToRemove,
      ),
    }));
  };

  const form = useForm<TPlannedEventSchema>({
    resolver: zodResolver(plannedEventSchema),
    defaultValues: {
      scheduledDate: new Date(plannedEvent.scheduledDate),
    },
  });

  const onSubmit = async (data: TPlannedEventSchema) => {
    if (plannedEvent.eventDetails.length === 0)
      toast({
        title: "Submission Failed",
        description: "Event Details are required",
        variant: "destructive",
      });
    else {
      plannedEvent.scheduledDate = data.scheduledDate;
      await mutateData(plannedEvent);
      //TODO: also delete the event details that were deleted
    }
  };

  return (
    <div className="relative rounded-md border-2 border-bone-white border-opacity-40 pb-[76px]">
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
            className="absolute bottom-[20px] w-[calc(100%-40px)] bg-orange-act text-base"
          >
            {/* TODO: disable if EventDetailsForm is shown */}
            {form.formState.isSubmitting
              ? "Submitting..."
              : plannedEvent.id
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
        <div className="flex flex-col gap-y-[20px] border-b-2 border-bone-white border-opacity-40 pb-[20px]">
          <EventDetails
            eventDetails={plannedEvent.eventDetails}
            setToBeUpdated={setToBeUpdated}
            onDelete={deleteEventDetail}
          />
          <Button
            type="submit"
            onClick={() => setToBeUpdated({ index: -1 })}
            className="mx-auto mt-[10px] w-[calc(100%-40px)] border-2 border-orange-act text-base text-orange-act"
          >
            Add Other Event Details
          </Button>
        </div>
      )}
      {toBeUpdated.index !== null && plannedEvent.eventDetails.length !== 0 && (
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
