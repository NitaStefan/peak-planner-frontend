"use client";

import React, { useRef, useState } from "react";
import { TActivityReq, TActivityRes, TWeekDayRes } from "@/lib/validations";
import { DayOfWeek, GoalWithCurrStep } from "@/lib/types";
import AddActivity from "./AddActivity";
import SelectDeleteTabs from "./SelectDeleteTabs";
import { Button } from "@/components/ui/button";
import ActivityForm from "@/components/forms/schedule/ActivityForm";
import ScheduleGrid from "../schedule-grid";
import { Accordion } from "@/components/ui/accordion";
import ActivityItem from "../activities/ActivityItem";

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
  const [currentAction, setCurrentAction] = useState<
    "start" | "edit" | "duplicate" | "done"
  >("start"); // if true, delete old and try selecting the same day
  //TODO: assign when chosing days for insertion and verify insertion possibility
  // const arbitraryId = useRef(-1); // resets on unmount
  const selectedDays = useRef<DayOfWeek[]>([]);

  const getSelectedActivity = (activity: TActivityRes, day: DayOfWeek) => {
    setCurrentActivity(activity);
    selectedDays.current = [day];
    setCurrentAction("start");
  };

  // const updateWeekDays = (activity: TActivityRes) => {
  //   setCurrentActivity(activity);

  //   setWeekDays((prevWeekDays) =>
  //     prevWeekDays.map((weekDay) =>
  //       selectedDays.current.includes(weekDay.day)
  //         ? {
  //             ...weekDay,
  //             activities: [...weekDay.activities, activity],
  //           }
  //         : weekDay,
  //     ),
  //   );
  // };

  const deleteSelectedActivity = (activityId: number) => {
    setWeekDays((prevWeekDays) =>
      prevWeekDays.map((weekDay) => ({
        ...weekDay,
        activities: weekDay.activities.filter(
          (activity) => activity.id !== activityId,
        ),
      })),
    );
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

  console.log(currentActivity);
  console.log("selectedDay", selectedDays.current);

  return (
    <div className="flex w-full flex-col items-center gap-y-[20px]">
      {!currentActivity && currentAction === "start" && (
        <div className="flex w-full flex-col gap-y-[20px]">
          <AddActivity
            handleAddActivity={() => {
              setCurrentAction("duplicate");
              setCurrentActivity(undefined);
            }}
          />
          <div className="flex items-center justify-between">
            <SelectDeleteTabs setIsDeleting={setIsDeleting} />
            {/* Send final TWeekDayReq version (negative ids are removed 0)*/}
            <Button className="h-[60px] whitespace-pre-line bg-orange-act text-base">
              Update{"\n"}Schedule
            </Button>
          </div>
        </div>
      )}
      {(currentAction === "duplicate" || currentAction === "edit") && (
        <ActivityForm
          // input - currAct Req | result - currAct (Res) modified;
          submit={(activity: TActivityRes) => {
            if (currentAction === "edit" && currentActivity)
              deleteSelectedActivity(currentActivity.id);

            setCurrentActivity(activity);
            setCurrentAction("done");
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
                onDuplicate={
                  currentAction === "done"
                    ? undefined
                    : () => {
                        const newActivity = {
                          ...currentActivity,
                          id: 0,
                        };
                        setCurrentActivity(newActivity);
                        setCurrentAction("duplicate");
                      }
                }
                onEdit={
                  currentAction === "done"
                    ? () => {
                        setCurrentAction("edit");
                      }
                    : undefined
                }
              />
            </Accordion>
            <div className="pt-[30px]">
              Mon, Tue, ..., Sun ______ DONE (to &quot;start&quot;)
            </div>
          </div>
        )}

      <ScheduleGrid
        weekDays={weekDays}
        getSelectedActivity={getSelectedActivity}
        deleteSelectedActivity={deleteSelectedActivity}
        isDeleting={isDeleting}
      />
    </div>
  );
};

export default ManageSchedule;
