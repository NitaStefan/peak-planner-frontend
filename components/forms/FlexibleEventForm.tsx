"use client";

import {
  flexibleEventSchema,
  TFlexibleEventRequest,
  TFlexibleEventResponse,
} from "@/lib/validations";
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
import { DateRange } from "react-day-picker";

const FlexibleEventForm = ({
  initFlexibleEvent = undefined,
  mutateData,
}: {
  initFlexibleEvent?: TFlexibleEventResponse;
  mutateData: (data: TFlexibleEventRequest) => Promise<void>;
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
        <FormItem className="flex flex-col">
          <FormLabel>Date Interval</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start bg-transparent text-left font-normal hover:bg-transparent hover:text-bone-white",
                    (!form.watch("startDate") || !form.watch("endDate")) &&
                      "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.watch("startDate") && form.watch("endDate") ? (
                    <>
                      {format(form.watch("startDate"), "LLL dd, y")} -{" "}
                      {format(form.watch("endDate"), "LLL dd, y")}
                    </>
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={form.watch("startDate") || new Date()}
                selected={{
                  from: form.watch("startDate"),
                  to: form.watch("endDate"),
                }}
                onSelect={(range: DateRange | undefined) => {
                  if (range?.from)
                    form.setValue("startDate", range.from, {
                      shouldValidate: true,
                    });
                  if (range?.to)
                    form.setValue("endDate", range.to, {
                      shouldValidate: true,
                    });
                }}
                numberOfMonths={2}
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date < today;
                }}
              />
            </PopoverContent>
          </Popover>
          <FormMessage>
            {form.formState.errors.startDate?.message ||
              form.formState.errors.endDate?.message}
          </FormMessage>
        </FormItem>
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
