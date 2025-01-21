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
import EventDetails from "@/components/Events/PlannedEvents/EventDetails";
import { useToast } from "@/hooks/use-toast";

const PlannedEventForm = ({
  initPlannedEvent = undefined,
  mutateData = (data) => {
    console.log(data);
    return Promise.resolve();
  },
}: {
  initPlannedEvent?: TPlannedEvent;
  mutateData?: (data: TPlannedEvent) => Promise<void>;
}) => {
  const { toast } = useToast();

  const [plannedEvent, setPlannedEvent] = useState(
    () =>
      initPlannedEvent ?? {
        scheduledDate: new Date(new Date().setDate(new Date().getDate() + 1)), // next day
        eventDetails: [],
      },
  );

  const [showEventDetailsForm, setShowEventDetailsForm] = useState(
    plannedEvent.eventDetails.length === 0,
  );

  const form = useForm<TPlannedEventSchema>({
    resolver: zodResolver(plannedEventSchema),
    defaultValues: {
      scheduledDate: new Date(plannedEvent.scheduledDate),
    },
  });

  const onSubmit = (data: TPlannedEventSchema) => {
    if (plannedEvent.eventDetails.length === 0)
      toast({
        title: "Submission Failed",
        description: "Event Details are required",
        variant: "destructive",
      });
    else {
      plannedEvent.scheduledDate = data.scheduledDate;
      mutateData(plannedEvent);
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
            type="submit"
            className="absolute bottom-[20px] w-[calc(100%-40px)] bg-orange-act text-base"
          >
            {plannedEvent.id ? "Update Planned Event" : "Add Planned Event"}
          </Button>
        </form>
      </Form>
      {showEventDetailsForm ? (
        <EventDetailsForm
          setPlannedEvent={(updatePlEv) => {
            setPlannedEvent(updatePlEv);
            setShowEventDetailsForm(false);
          }}
        />
      ) : (
        <div className="flex flex-col gap-y-[20px] border-b-2 border-bone-white border-opacity-40 pb-[20px]">
          <EventDetails eventDetails={plannedEvent.eventDetails} />
          <Button
            type="submit"
            onClick={() => setShowEventDetailsForm(true)}
            className="mx-auto mt-[10px] w-[calc(100%-40px)] border-2 border-orange-act text-base text-orange-act"
          >
            Add Other Event Details
          </Button>
        </div>
      )}
      {plannedEvent.eventDetails.length !== 0 && showEventDetailsForm && (
        <Button
          onClick={() => setShowEventDetailsForm(false)}
          className="absolute right-[20px] top-[100px] text-slate-500 shadow-none"
        >
          Go Back
          {/* also add icon */}
        </Button>
      )}
    </div>
  );
};

export default PlannedEventForm;
