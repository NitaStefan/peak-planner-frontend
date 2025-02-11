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
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Slider } from "../../ui/slider";
import ImpactIndicator from "../../ImpactIndicator";
import { GoalWithCurrStep } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { cn } from "@/lib/utils";
import Image from "next/image";
import OR from "./OR";

const ActivityForm = ({
  initActivity,
  //   mutateScheduleState,
  goalOptionsPromise,
}: {
  initActivity?: TActivityReq;
  //   mutateScheduleState: () => void; // uses setter
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
}) => {
  const [goalOptions, setGoalOptions] = useState<GoalWithCurrStep[]>([]);

  useEffect(() => {
    const loadGoalOptions = async () => {
      try {
        const options = await goalOptionsPromise;
        setGoalOptions(options);
      } catch (error) {
        console.error("Failed to load goal options:", error);
      }
    };
    loadGoalOptions();
  }, [goalOptionsPromise]);

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

  //TODO: change logic
  const submitText = initActivity ? "Update Activity" : "Add Activity";

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

  const currentStep = goalOptions.find(
    (goal) => goal.id === Number(watchGoalId),
  );

  const showImpact = watchGoalId === 0 || currentStep?.currStepImpact;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form rounded-md border-2"
      >
        <div className="flex items-end gap-x-[15px]">
          {!watchGoalId && (
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!watchGoalId && <OR />}

          <FormField
            control={form.control}
            name="goalId"
            render={({ field }) => (
              <FormItem className={cn(watchGoalId && "grow")}>
                <div className="flex items-center gap-x-[4px]">
                  <Image
                    src="/icons/goal-sec.svg"
                    height={15}
                    width={15}
                    alt="Goal"
                  />
                  <FormLabel>Associate Goal</FormLabel>
                </div>

                <Select
                  onValueChange={(val) => field.onChange(Number(val))}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">None</SelectItem>
                    {goalOptions.map((goal) => (
                      <SelectItem key={goal.id} value={goal.id.toString()}>
                        {goal.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {!watchGoalId ? (
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea disabled={!!currentStep} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormItem>
            <FormLabel>Current Step of the Goal</FormLabel>
            <FormControl>
              <Input
                value={
                  goalOptions.find((goal) => goal.id === Number(watchGoalId))
                    ?.currStepTitle
                }
                disabled
              />
            </FormControl>
          </FormItem>
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
        {showImpact && (
          <FormField
            control={form.control}
            name="impact"
            render={({ field }) => {
              const impactValue =
                currentStep?.currStepImpact ?? (field.value || 1);

              return (
                <FormItem>
                  <FormLabel>
                    Impact Level{" "}
                    <span className={cn(!currentStep && "hidden")}>
                      of Current Step
                    </span>
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-4">
                      <Slider
                        disabled={!!currentStep}
                        min={1}
                        max={10}
                        step={1}
                        value={[impactValue]}
                        onValueChange={(value) => field.onChange(value[0])}
                        className={cn(
                          !!currentStep && "cursor-not-allowed opacity-50",
                        )}
                      />
                      <ImpactIndicator impact={impactValue} isStatic />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
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
