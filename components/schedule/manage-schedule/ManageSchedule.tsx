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
import SubmitSchedule from "./SubmitSchedule";
import { mapActivityToRequestVersion } from "@/lib/utils";

const ManageSchedule = ({
  initWeekDays,
  goalOptionsPromise,
}: {
  initWeekDays: TWeekDayRes[];
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
}) => {
  const [weekDays, setWeekDays] = useState(initWeekDays);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentActivity, setCurrentActivity] = useState<
    TActivityRes | undefined
  >(undefined);
  const [currentAction, setCurrentAction] = useState<"start" | "edit">("start");
  const [selectedDays, setSelectedDays] = useState<DayOfWeek[]>([]);
  const arbitraryId = useRef(-1); // resets on unmount
  const selectedActivityId = useRef<number | undefined>(undefined);
  const activityIdPerDay = useRef(new Map<DayOfWeek, number>());
  const requestObject = useRef<ScheduleUpdateRequest>({
    idsToDelete: [],
    activitiesToAdd: {} as Record<DayOfWeek, TActivityReq[]>,
  });

  const getSelectedActivity = (activity: TActivityRes, day: DayOfWeek) => {
    setCurrentActivity(activity);
    setSelectedDays([day]);
    setCurrentAction("start");
    selectedActivityId.current = activity.id;

    activityIdPerDay.current.set(day, activity.id);
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
    activityIdPerDay.current.forEach((id, day) => {
      if (id === activityId) {
        removedDay = day;
        activityIdPerDay.current.delete(day); // Remove from tracking
      }
    });
    if (removedDay) {
      setSelectedDays((prev) => prev.filter((day) => day !== removedDay));
    }

    // Remove activityToAdd from requestObject
    Object.keys(requestObject.current.activitiesToAdd).forEach((day) => {
      requestObject.current.activitiesToAdd[day as DayOfWeek] =
        requestObject.current.activitiesToAdd[day as DayOfWeek].filter(
          (activity) => activity.id !== activityId,
        );
    });

    // if id is present in the db, prepare to delete it
    if (activityId > 0) requestObject.current.idsToDelete.push(activityId);
  };

  const addActivityToDay = (day: DayOfWeek) => {
    if (!currentActivity) return;

    const newActivityId = arbitraryId.current--;
    activityIdPerDay.current.set(day, newActivityId);

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
      mapActivityToRequestVersion(newActivity) as TActivityReq,
    ];

    setIsDeleting(false);
  };

  const removeActivityFromDay = (day: DayOfWeek) => {
    if (!currentActivity) return;

    const activityIdToRemove = activityIdPerDay.current.get(day); // Get assigned ID
    if (activityIdToRemove !== undefined) {
      deleteSelectedActivity(activityIdToRemove);
      activityIdPerDay.current.delete(day);
    }
  };

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
            <SubmitSchedule requestObject={requestObject.current} />
          </div>
        </div>
      )}
      {currentAction === "edit" && (
        <ActivityForm
          submit={(activity: TActivityRes) => {
            setCurrentActivity(activity);
            setCurrentAction("start");
            setSelectedDays([]);

            // TODO: replace selected activity with the one edited if possible
            // selectedActivityId.current = undefined;
            activityIdPerDay.current = new Map<DayOfWeek, number>();
          }}
          initActivity={mapActivityToRequestVersion(currentActivity)}
          goalOptionsPromise={goalOptionsPromise}
          cancel={() => setCurrentAction("start")}
        />
      )}
      {currentActivity && currentAction === "start" && (
        <div className="w-full">
          <Accordion type="single" collapsible className="pl-[10px]">
            <ActivityItem
              activity={currentActivity}
              onEdit={() => setCurrentAction("edit")}
            />
          </Accordion>
          <div className="mt-[30px] flex flex-col gap-y-[10px]">
            <ToggleDays
              selectedDays={selectedDays}
              setSelectedDays={setSelectedDays}
              weekDays={weekDays}
              currentActivity={currentActivity}
              addActivityToDay={addActivityToDay}
              removeActivityFromDay={removeActivityFromDay}
            />
            <div className="flex gap-[10px]">
              <SelectDeleteTabs
                setIsDeleting={setIsDeleting}
                isDeleting={isDeleting}
                {...(selectedActivityId.current !== undefined && {
                  removeSelectedActivity: () => {
                    deleteSelectedActivity(
                      selectedActivityId.current as number,
                    );
                    selectedActivityId.current = undefined;
                  },
                })}
              />
              <Button
                className="h-[56px] bg-orange-act max-sm:px-[8px] sm:text-lg"
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
