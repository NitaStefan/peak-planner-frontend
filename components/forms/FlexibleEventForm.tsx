"use client";

import { flexibleEventSchema, TFlexibleEvent } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { toUTCDate } from "@/lib/timeHelpers";

const FlexibleEventForm = ({
  initFlexibleEvent = undefined,
  mutateData,
}: {
  initFlexibleEvent?: TFlexibleEvent;
  mutateData: (data: TFlexibleEvent) => Promise<void>;
}) => {
  const form = useForm<z.infer<typeof flexibleEventSchema>>({
    resolver: zodResolver(flexibleEventSchema),
    defaultValues: {
      title: initFlexibleEvent?.title || "",
      description: initFlexibleEvent?.description || "",
      startDate: initFlexibleEvent
        ? new Date(initFlexibleEvent.startDate)
        : undefined,
      endDate: initFlexibleEvent
        ? new Date(initFlexibleEvent.endDate)
        : undefined,
    },
  });

  const startDate = form.watch("startDate");

  const onSubmit = async (data: z.infer<typeof flexibleEventSchema>) => {
    const finalData = {
      ...data,
      ...(initFlexibleEvent && { id: initFlexibleEvent.id }),
    };
    await mutateData(finalData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form rounded-md border-2"
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
        <div className="flex justify-between gap-x-[15px]">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="flex grow flex-col">
                <FormLabel>From</FormLabel>
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
                          format(field.value, "EEE, MMM d, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-40" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(toUTCDate(date))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      // className="bg-blue-darker "
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem className="flex grow flex-col">
                <FormLabel>To</FormLabel>
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
                          format(field.value, "EEE, MMM d, yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-40" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => field.onChange(toUTCDate(date))}
                      disabled={(date) =>
                        date < new Date() ||
                        (startDate && date < new Date(startDate))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="bg-orange-act text-base"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting
            ? "Submitting..."
            : initFlexibleEvent?.id
              ? "Update Flexible Event"
              : "Add Flexible Event"}
        </Button>
      </form>
    </Form>
  );
};

export default FlexibleEventForm;
