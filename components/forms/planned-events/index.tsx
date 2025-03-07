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
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import EventDetailsForm from "./EventDetailsForm";
import { usePlannedEvent } from "@/hooks/usePlannedEvent";
import EventDetailsManger from "./EventDetailsManger";
import GoBackButton from "./GoBackButton";
import { z } from "zod";

type PlannedEventFormProps = {
  initPlannedEvent?: TPlannedEvent;
  mutateData: (data: TPlannedEvent) => Promise<void>;
  otherDates?: Date[];
};

const PlannedEventForm = ({
  initPlannedEvent = undefined,
  mutateData,
  otherDates = [],
}: PlannedEventFormProps) => {
  const {
    plannedEventRef,
    toBeUpdated,
    setToBeUpdated,
    saveEventDetails,
    deleteEventDetail,
    checkOverlappingEvents,
  } = usePlannedEvent(initPlannedEvent);

  const form = useForm<z.infer<typeof plannedEventSchema>>({
    resolver: zodResolver(plannedEventSchema),
    defaultValues: {
      scheduledDate: initPlannedEvent
        ? new Date(initPlannedEvent.scheduledDate)
        : undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof plannedEventSchema>) => {
    // Show toast error if there are overlapping events
    if (checkOverlappingEvents()) return;

    plannedEventRef.current.scheduledDate = data.scheduledDate;
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
                      onSelect={(date) => {
                        if (date) {
                          const normalizedDate = new Date(date);
                          normalizedDate.setHours(0, 0, 0, 0);
                          field.onChange(normalizedDate);
                        }
                      }}
                      disabled={(date) =>
                        date < new Date() ||
                        otherDates.some(
                          (d) =>
                            new Date(d).toISOString() === date.toISOString(),
                        )
                      }
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
        <EventDetailsManger
          eventDetails={plannedEventRef.current.eventDetails}
          setToBeUpdated={setToBeUpdated}
          onDelete={deleteEventDetail}
        />
      )}
      {toBeUpdated.index !== null &&
        plannedEventRef.current.eventDetails.length !== 0 && (
          <GoBackButton goBack={() => setToBeUpdated({ index: null })} />
        )}
    </div>
  );
};

export default PlannedEventForm;
