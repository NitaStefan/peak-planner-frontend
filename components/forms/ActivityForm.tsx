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
import { activitySchema, TActivityReq } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { XIcon } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Slider } from "../ui/slider";
import ImpactIndicator from "../ImpactIndicator";

const ActivityForm = ({
  initActivity,
  //   mutateScheduleState,
}: {
  initActivity?: TActivityReq;
  //   mutateScheduleState: () => void; // uses setter
}) => {
  const submitText = initActivity ? "Update Activity" : "Add Activity";

  const form = useForm<z.infer<typeof activitySchema>>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: initActivity?.title || "",
      description: initActivity?.description || "",
      startTime: initActivity?.startTime || "",
      duration: {
        hours: Math.floor((initActivity?.minutes ?? 0) / 60),
        minutes: (initActivity?.minutes ?? 0) % 60,
      },
      impact: initActivity?.impact || 0,
      goalId: initActivity?.goalId || 0,
    },
  });

  const onSubmit = (data: z.infer<typeof activitySchema>) => {
    console.log(data);
    // const { duration, startTime, ...rest } = data;

    // const updatedEventDetails: TEventDetails = {
    //   ...rest,
    //   ...(initEventDetails?.id ? { id: initEventDetails.id } : {}),
    //   ...(startTime ? { startTime } : {}),
    //   ...(duration.hours || duration.minutes
    //     ? { minutes: (duration.hours || 0) * 60 + (duration.minutes || 0) }
    //     : {}),
    // };

    // saveEventDetails(updatedEventDetails);
  };

  const watchGoalId = form.watch("goalId");

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form rounded-b-md"
      >
        {!watchGoalId && (
          <>
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
          </>
        )}
        <FormField
          control={form.control}
          name="startTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Time</FormLabel>
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
          <span className="text-sm">Duration</span>
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
        {!watchGoalId && (
          <FormField
            control={form.control}
            name="impact"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Impact Level</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      value={[field.value || 1]}
                      onValueChange={(value) => field.onChange(value[0])}
                    />
                    <ImpactIndicator impact={field.value || 1} isStatic />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
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

export default ActivityForm;
