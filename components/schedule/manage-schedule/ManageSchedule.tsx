"use client";

import React, { useState } from "react";
import { TActivityReq, TWeekDayRes } from "@/lib/validations";
import { GoalWithCurrStep } from "@/lib/types";
import AddActivity from "./AddActivity";
import SelectDeleteTabs from "./SelectDeleteTabs";
import { Button } from "@/components/ui/button";
import ActivityForm from "@/components/forms/schedule/ActivityForm";
import ScheduleGrid from "../schedule-grid";

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
    TActivityReq | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  const getSelectedActivity = (activity: TActivityReq) => {
    setCurrentActivity(activity);
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
  };

  console.log(currentActivity);

  return (
    <div className="flex w-full flex-col items-center gap-y-[20px]">
      {!currentActivity && !editMode && (
        <div className="flex w-full flex-col gap-y-[20px]">
          <AddActivity
            handleAddActivity={() => {
              setEditMode(true);
              setCurrentActivity(undefined);
            }}
          />
          <div className="flex items-center justify-between">
            <SelectDeleteTabs setIsDeleting={setIsDeleting} />
            <Button className="h-[60px] whitespace-pre-line bg-orange-act text-base">
              Update{"\n"}Schedule
            </Button>
          </div>
        </div>
      )}
      {editMode && (
        <ActivityForm
          initActivity={currentActivity}
          goalOptionsPromise={goalOptionsPromise}
          closeForm={() => setEditMode(false)}
        />
      )}
      {currentActivity && (
        <div>
          {currentActivity.title} - [edit], [dupl]{" "}
          <div>Mon, Tue, Wed,... Sun</div>
          <SelectDeleteTabs setIsDeleting={setIsDeleting} />
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
