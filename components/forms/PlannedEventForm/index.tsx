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
  TPlannedEvent,
  TPlannedEventSchema,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import EventDetailsForm from "./EventDetailsForm";

const PlannedEventForm = ({
  initPlannedEvent = undefined,
}: {
  initPlannedEvent?: TPlannedEvent;
}) => {
  //TODO: Show event details form only when the that array from planned event is empty
  //TODO: maybe fix border radius
  const [plannedEvent, setPlannedEvent] = useState(
    () =>
      initPlannedEvent ?? {
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // next day
        eventDetails: [],
      },
  );

  const form = useForm<TPlannedEventSchema>({
    resolver: zodResolver(plannedEventSchema),
    defaultValues: {
      scheduledDate: plannedEvent.scheduledDate,
    },
  });

  const onSubmit = (data: TPlannedEventSchema) => {
    setPlannedEvent((prevPlannedEvent) => ({
      ...prevPlannedEvent,
      scheduledDate: data.scheduledDate,
    }));
  };

  console.log(plannedEvent);

  return (
    <div className="relative rounded-md pb-[60px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="shadcn-form">
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
            type="submit"
            className="absolute bottom-[20px] w-[calc(100%-40px)] bg-orange-act text-base"
          >
            {plannedEvent.id ? "Update Planned Event" : "Add New Planned Event"}
          </Button>
        </form>
      </Form>
      <EventDetailsForm setPlannedEvent={setPlannedEvent} />
    </div>
  );
};

export default PlannedEventForm;
