"use client";

import React, { useRef, useState } from "react";
import { TActivityReq, TActivityRes, TWeekDayRes } from "@/lib/validations";
import {
  DayOfWeek,
  GoalWithCurrStep,
  ScheduleUpdateRequest,
} from "@/lib/types";
import AddActivity from "./AddActivity";
import SelectDeleteTabs from "./SelectDeleteTabs";
import { Button } from "@/components/ui/button";
import ActivityForm from "@/components/forms/schedule/ActivityForm";
import ScheduleGrid from "../schedule-grid";
import { Accordion } from "@/components/ui/accordion";
import ActivityItem from "../activities/ActivityItem";
import ToggleDays from "./ToggleDays";
import { hasOverlappingIntervals } from "@/lib/checks";
import { updateSchedule } from "@/lib/api";

const ManageSchedule = ({
  initWeekDays,
  goalOptionsPromise,
}: {
  initWeekDays: TWeekDayRes[];
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
}) => {
  const [weekDays, setWeekDays] = useState(initWeekDays);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<
    TActivityRes | undefined
  >(undefined);
  const [currentAction, setCurrentAction] = useState<"start" | "edit" | "done">(
    "start",
  );
  const arbitraryId = useRef(-1); // resets on unmount
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const selectedActivityId = useRef<number | undefined>(undefined);
  const activityIdsPerDay = useRef(new Map<DayOfWeek, number>());
  const requestObject = useRef<ScheduleUpdateRequest>({
    idsToDelete: [],
    activitiesToAdd: {} as Record<DayOfWeek, TActivityReq[]>,
  });

  const getSelectedActivity = (activity: TActivityRes, day: DayOfWeek) => {
    setCurrentActivity(activity);
    setSelectedDays([day]);
    setCurrentAction("start");
    selectedActivityId.current = activity.id;

    activityIdsPerDay.current = new Map<DayOfWeek, number>();

    // Store in the map only if it's not already stored
    if (!activityIdsPerDay.current.has(day)) {
      activityIdsPerDay.current.set(day, activity.id);
    }
  };

  const ableToAddToDay = (day: DayOfWeek): boolean => {
    // Find the weekDay object corresponding to the given day
    const weekDay = weekDays.find((wd) => wd.day === day);
    if (!weekDay) return false; // If day not found, return false

    // Extract existing activities for that day
    const existingIntervals = weekDay.activities.map((activity) => ({
      h1: activity.startTime,
      h2: activity.endTime,
    }));

    // Ensure there is a current activity to check against
    if (!currentActivity) return false;

    // Create the interval for the currentActivity
    const currentActivityInterval = {
      h1: currentActivity.startTime,
      h2: currentActivity.endTime,
    };

    return !hasOverlappingIntervals([
      ...existingIntervals,
      currentActivityInterval,
    ]);
  };

  const deleteSelectedActivity = (activityId: number) => {
    setWeekDays((prevWeekDays) =>
      prevWeekDays.map((weekDay) => ({
        ...weekDay,
        activities: weekDay.activities.filter(
          (activity) => activity.id !== activityId,
        ),
      })),
    );

    // Check if removed manually instead of by day
    let removedDay: DayOfWeek | undefined;
    activityIdsPerDay.current.forEach((id, day) => {
      if (id === activityId) {
        removedDay = day;
        activityIdsPerDay.current.delete(day); // Remove from tracking
      }
    });

    if (removedDay) {
      setSelectedDays((prev) => prev.filter((day) => day !== removedDay));
    }

    // Remove from requestObject if it was an arbitrary ID
    Object.keys(requestObject.current.activitiesToAdd).forEach((day) => {
      requestObject.current.activitiesToAdd[day as DayOfWeek] =
        requestObject.current.activitiesToAdd[day as DayOfWeek].filter(
          (activity) => activity.id !== activityId,
        );
    });

    // if id is present in the db, prepare to delete it
    if (activityId > 0) {
      requestObject.current.idsToDelete.push(activityId);
    }
  };

  const currentActivityReq: TActivityReq | undefined = currentActivity
    ? {
        ...(currentActivity.id ? { id: currentActivity.id } : {}),
        startTime: currentActivity.startTime,
        minutes: currentActivity.minutes,
        ...(currentActivity.goalId
          ? { goalId: Number(currentActivity.goalId) }
          : {
              title: currentActivity.title,
              description: currentActivity.description,
              impact: currentActivity.impact,
            }),
      }
    : undefined;

  const addActivityToDay = (day: DayOfWeek) => {
    if (!currentActivity) return;

    // Assign a new arbitrary ID only if this day doesn't already have an assigned activity
    const newActivityId = arbitraryId.current--;
    activityIdsPerDay.current.set(day, newActivityId);

    const newActivity = { ...currentActivity, id: newActivityId };

    setWeekDays((prevWeekDays) =>
      prevWeekDays.map((weekDay) =>
        weekDay.day === day
          ? { ...weekDay, activities: [...weekDay.activities, newActivity] }
          : weekDay,
      ),
    );

    requestObject.current.activitiesToAdd[day] = [
      ...(requestObject.current.activitiesToAdd[day] || []),
      currentActivity.goalId
        ? {
            startTime: currentActivity.startTime,
            minutes: currentActivity.minutes,
            goalId: currentActivity.goalId,
            id: newActivityId,
          }
        : {
            startTime: currentActivity.startTime,
            minutes: currentActivity.minutes,
            title: currentActivity.title,
            description: currentActivity.description,
            impact: currentActivity.impact,
            id: newActivityId,
          },
    ];

    setIsDeleting(false);
  };

  const removeActivityFromDay = (day: DayOfWeek) => {
    if (!currentActivity) return;

    const activityIdToRemove = activityIdsPerDay.current.get(day); // Get assigned ID
    if (activityIdToRemove !== undefined) {
      deleteSelectedActivity(activityIdToRemove);
      activityIdsPerDay.current.delete(day);
    }
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateSchedule(requestObject.current);
    setIsUpdating(false);
  };

  console.log(activityIdsPerDay.current);

  return (
    <div className="flex w-full flex-col items-center gap-y-[20px]">
      {!currentActivity && currentAction === "start" && (
        <div className="flex w-full flex-col gap-y-[20px]">
          <AddActivity
            handleAddActivity={() => {
              setCurrentAction("edit");
              setCurrentActivity(undefined);
            }}
          />
          <div className="flex items-center gap-[25px]">
            <SelectDeleteTabs
              setIsDeleting={setIsDeleting}
              isDeleting={isDeleting}
            />
            {/* Send final TWeekDayReq version (negative ids are removed 0)*/}
            <Button
              onClick={handleUpdate}
              className="h-[56px] whitespace-pre-line bg-orange-act text-base"
              disabled={isUpdating}
            >
              {isUpdating ? "Updating..." : "Update\nSchedule"}
            </Button>
          </div>
        </div>
      )}
      {currentAction === "edit" && (
        <ActivityForm
          // input - currAct Req | result - currAct (Res) modified;
          submit={(activity: TActivityRes) => {
            setCurrentActivity(activity);
            setCurrentAction("done");
            setSelectedDays([]);

            // TODO: replace selected activity with the one edited if possible
            // selectedActivityId.current = undefined;
            activityIdsPerDay.current = new Map<DayOfWeek, number>();
          }}
          initActivity={currentActivityReq}
          goalOptionsPromise={goalOptionsPromise}
          cancel={() => setCurrentAction("start")}
        />
      )}
      {currentActivity &&
        (currentAction === "start" || currentAction === "done") && (
          <div className="w-full">
            <Accordion type="single" collapsible className="pl-[10px]">
              <ActivityItem
                // Act Res
                activity={currentActivity}
                onEdit={() => setCurrentAction("edit")}
              />
            </Accordion>
            <div className="mt-[30px] flex flex-col gap-y-[10px]">
              <ToggleDays
                selectedDays={selectedDays}
                setSelectedDays={setSelectedDays}
                ableToAddToDay={ableToAddToDay}
                addActivityToDay={addActivityToDay}
                removeActivityFromDay={removeActivityFromDay}
              />
              <div className="flex gap-[10px]">
                <SelectDeleteTabs
                  setIsDeleting={setIsDeleting}
                  isDeleting={isDeleting}
                />
                <Button
                  className="h-[56px] bg-orange-act text-lg"
                  onClick={() => {
                    setCurrentAction("start");
                    setCurrentActivity(undefined);
                    setSelectedDays([]);
                    selectedActivityId.current = undefined;
                    setIsDeleting(false);
                  }}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}

      <ScheduleGrid
        weekDays={weekDays}
        getSelectedActivity={getSelectedActivity}
        deleteSelectedActivity={deleteSelectedActivity}
        selectedActivityId={selectedActivityId.current}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ManageSchedule;
