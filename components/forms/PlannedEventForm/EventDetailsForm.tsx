"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  eventDetailsSchema,
  TEventDetails,
  TEventDetailsSchema,
  TPlannedEvent,
} from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const EventDetailsForm = ({
  eventDetails,
  setPlannedEvent,
}: {
  eventDetails?: TEventDetails;
  setPlannedEvent: React.Dispatch<React.SetStateAction<TPlannedEvent>>;
}) => {
  const submitText = eventDetails
    ? "Update Event Details"
    : "Add Event Details";

  const form = useForm<TEventDetailsSchema>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: {
      title: eventDetails?.title || "",
      description: eventDetails?.description || "",
      startTime: eventDetails?.startTime || "",
      duration: {
        minutes: Math.floor((eventDetails?.minutes ?? 0) / 60),
        hours: (eventDetails?.minutes ?? 0) % 60,
      },
    },
  });

  const onSubmit = (data: TEventDetailsSchema) => {
    const { duration, startTime, ...rest } = data;

    const updatedEventDetails: TEventDetails = {
      ...rest,
      ...(eventDetails?.id ? { id: eventDetails.id } : {}),
      ...(startTime ? { startTime } : {}),
      ...(duration.hours || duration.minutes
        ? { minutes: (duration.hours || 0) * 60 + (duration.minutes || 0) }
        : {}),
    };

    setPlannedEvent((prev) => ({
      ...prev,
      eventDetails: eventDetails?.id
        ? // Replace the eventDetails with matching id
          prev.eventDetails.map((ev) =>
            ev.id === eventDetails.id ? updatedEventDetails : ev,
          )
        : // Add a new eventDetails if no id exists
          [...(prev.eventDetails || []), updatedEventDetails],
    }));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form border-b-2"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Scheduled Hour{" "}
                <span className="ml-[5px] opacity-50">(Optional)</span>
              </FormLabel>
              <FormControl>
                <Input type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <span className="text-sm">
            Duration<span className="ml-[5px] opacity-50">(Optional)</span>
          </span>
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="duration.hours"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-row-reverse items-center gap-[5px]">
                    <FormLabel>Hours</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ? field.value : ""}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration.minutes"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex flex-row-reverse items-center gap-[5px]">
                    <FormLabel>Minutes</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        value={field.value ? field.value : ""}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value) || 0)
                        }
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="border-2 border-orange-act text-base text-orange-act"
        >
          {submitText}
        </Button>
      </form>
    </Form>
  );
};

export default EventDetailsForm;
