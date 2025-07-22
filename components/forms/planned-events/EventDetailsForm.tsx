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
import { formatTime } from "@/lib/format";
import { eventDetailsSchema, TEventDetails } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const EventDetailsForm = ({
  initEventDetails,
  saveEventDetails,
}: {
  initEventDetails?: TEventDetails;
  saveEventDetails: (updatedEventDetails: TEventDetails) => void;
}) => {
  const submitText = initEventDetails
    ? "Update Event Details"
    : "Add Event Details";

  const form = useForm<z.infer<typeof eventDetailsSchema>>({
    resolver: zodResolver(eventDetailsSchema),
    defaultValues: {
      title: initEventDetails?.title || "",
      description: initEventDetails?.description,
      startTime: initEventDetails?.startTime ? new Date(initEventDetails.startTime)
          .toLocaleTimeString("en-GB", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
      : "",
      duration: {
        hours: Math.floor((initEventDetails?.minutes ?? 0) / 60),
        minutes: (initEventDetails?.minutes ?? 0) % 60,
      },
    },
  });

  const onSubmit = (data: z.infer<typeof eventDetailsSchema>) => {
    const { duration, startTime, ...rest } = data;

    let startTimeISO
    if(startTime) {
      const [hour, minute] = startTime.split(":").map(Number);
      const now = new Date()
      now.setHours(hour, minute, 0, 0);
      startTimeISO = now.toISOString(); 
    }

    const updatedEventDetails: TEventDetails = {
      ...rest,
      ...(initEventDetails?.id ? { id: initEventDetails.id } : {}),
      ...(startTime ? { startTime:startTimeISO } : {}),
      ...(duration.hours || duration.minutes
        ? { minutes: (duration.hours || 0) * 60 + (duration.minutes || 0) }
        : {}),
    };

    saveEventDetails(updatedEventDetails);
  };

  const { errors } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form rounded-b-md"
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
              <FormLabel>
                Description
                <span className="ml-[5px] opacity-50">(Optional)</span>
              </FormLabel>
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
                Scheduled Hour
                <span className="ml-[5px] opacity-50">(Optional)</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type="time"
                    {...field}
                    value={formatTime(field.value)}
                    onChange={(e) => field.onChange(e.target.value)}
                    className="pr-10"
                  />
                  {field.value && (
                    <Button
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2"
                      onClick={() => field.onChange("")}
                    >
                      <XIcon />
                    </Button>
                  )}
                </div>
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
            {errors.duration && (
              <p className="mt-1 text-sm text-red-400">
                {errors.duration.message}
              </p>
            )}
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
