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
import { activitySchema, TActivityReq, TActivityRes } from "@/lib/validations";
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
import { addMinutesToTime } from "@/lib/timeHelpers";

const ActivityForm = ({
  initActivity,
  submit,
  goalOptionsPromise,
  cancel,
}: {
  initActivity?: TActivityReq;
  submit: (activity: TActivityRes) => void;
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
  cancel: () => void;
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
      title: initActivity?.title ?? "",
      description: initActivity?.description ?? "",
      startTime: initActivity?.startTime ?? "",
      duration: {
        hours: Math.floor((initActivity?.minutes ?? 0) / 60),
        minutes: (initActivity?.minutes ?? 0) % 60,
      },
      impact: initActivity?.impact ?? 6,
      goalId: (initActivity?.goalId ?? 0).toString(),
    },
  });

  const onSubmit = (data: z.infer<typeof activitySchema>) => {
    const { duration, goalId, startTime, title, description, impact } = data;
    const totalMinutes = (duration.hours || 0) * 60 + (duration.minutes || 0);

    const endTime = addMinutesToTime(startTime, totalMinutes);

    let finalActivity: TActivityRes;

    if (goalId !== "0") {
      const selectedGoal = goalOptions.find(
        (goal) => goal.id === Number(goalId),
      );

      if (!selectedGoal) {
        console.error("Selected goal not found.");
        return;
      }

      // Assign goal-specific values
      finalActivity = {
        ...(initActivity?.id ? { id: initActivity.id } : { id: 0 }),
        startTime,
        endTime,
        minutes: totalMinutes,
        goalId: selectedGoal.id,
        goalTitle: selectedGoal.title,
        title: selectedGoal.currStepTitle,
        description: selectedGoal.currStepDescription as string,
        impact: selectedGoal.currStepImpact ?? 0,
        isActive: false,
      };
    } else {
      finalActivity = {
        ...(initActivity?.id ? { id: initActivity.id } : { id: 0 }),
        startTime,
        endTime, // Always include endTime
        minutes: totalMinutes,
        title: title as string,
        description: description as string,
        impact: impact as number,
        isActive: false,
      };
    }

    console.log("finalActivity", finalActivity);

    submit(finalActivity);
  };

  const watchGoalId = form.watch("goalId");

  const selectedGoal = goalOptions.find(
    (goal) => goal.id === Number(watchGoalId),
  );

  const showImpact = watchGoalId === "0" || selectedGoal?.currStepImpact;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="shadcn-form relative rounded-md border-2"
      >
        <div className="flex items-start gap-x-[15px] max-sm:gap-x-[6px]">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className={cn("grow", watchGoalId !== "0" && "hidden")}>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchGoalId === "0" && <OR />}

          <FormField
            control={form.control}
            name="goalId"
            render={({ field }) => (
              <FormItem className={cn(watchGoalId && "grow")}>
                <div className="mb-[12px] flex items-center gap-x-[4px]">
                  <Image
                    src="/icons/goal-sec.svg"
                    height={15}
                    width={15}
                    alt="Goal"
                  />
                  <FormLabel>Associate Goal</FormLabel>
                </div>

                <Select
                  onValueChange={field.onChange}
                  value={field.value ?? "0"}
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className={cn(watchGoalId !== "0" && "hidden")}>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={!!selectedGoal} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem className={cn(watchGoalId === "0" && "hidden")}>
          <FormLabel>Current Step of the Goal</FormLabel>
          <FormControl>
            <Input
              value={
                goalOptions.find((goal) => goal.id === Number(watchGoalId))
                  ?.currStepTitle ?? ""
              }
              disabled
            />
          </FormControl>
        </FormItem>

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
        <FormField
          control={form.control}
          name="impact"
          render={({ field }) => {
            const impactValue =
              selectedGoal?.currStepImpact ?? (field.value || 1);

            return (
              <FormItem className={cn(!showImpact && "hidden")}>
                <FormLabel>
                  Impact Level{" "}
                  <span className={cn(!selectedGoal && "hidden")}>
                    of Current Step
                  </span>
                </FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-4">
                    <Slider
                      disabled={!!selectedGoal}
                      min={1}
                      max={10}
                      step={1}
                      value={[impactValue]}
                      onValueChange={(value) => field.onChange(value[0])}
                      className={cn(
                        !!selectedGoal && "cursor-not-allowed opacity-50",
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
        <Button
          type="submit"
          className="border-2 border-orange-act text-base text-orange-act"
        >
          {initActivity && initActivity.id !== 0
            ? "Update Activity"
            : "Create Activity"}
        </Button>
        <Button onClick={cancel} className="absolute right-[-10px] top-[-4px]">
          <XIcon />
        </Button>
      </form>
    </Form>
  );
};

export default ActivityForm;
