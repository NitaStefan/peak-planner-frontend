"use client";

import React, { useState } from "react";
import ActivityForm from "../forms/schedule/ActivityForm";
import ScheduleGrid from "./schedule-grid";
import { TActivityReq, TWeekDayRes } from "@/lib/validations";
import { GoalWithCurrStep } from "@/lib/types";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MousePointer2, Trash2 } from "lucide-react";

const ManageSchedule = ({
  initWeekDays,
  goalOptionsPromise,
}: {
  initWeekDays: TWeekDayRes[];
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
}) => {
  const [weekDays, setWeekDays] = useState(initWeekDays);
  const [currentActivity, setCurrentActivity] = useState<
    TActivityReq | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const getSelectedActivity = (activity: TActivityReq) => {
    setEditMode(true);
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
      {!editMode ? (
        <div className="flex w-full flex-col gap-y-[20px]">
          <Button
            onClick={() => {
              setEditMode(true);
              setCurrentActivity(undefined);
            }}
            className="w-full border-[4px] border-orange-act text-base text-orange-act"
          >
            <strong>Add New Activity</strong>
          </Button>
          <div className="flex items-center justify-between">
            <Tabs
              defaultValue="select"
              className="flex flex-row-reverse rounded-md bg-blue-dark p-[10px] pl-[20px]"
            >
              <TabsList className="bg-blue-darker">
                <TabsTrigger
                  value="select"
                  className="px-[6px] py-[3px] data-[state=active]:bg-blue-medium"
                  onClick={() => setIsDeleting(false)}
                >
                  <MousePointer2 size={20} className="text-bone-white" />
                </TabsTrigger>
                <TabsTrigger
                  value="delete"
                  className="ml-[5px] px-[6px] py-[3px] data-[state=active]:bg-red-400"
                  onClick={() => setIsDeleting(true)}
                >
                  <Trash2 size={20} className="text-bone-white" />
                </TabsTrigger>
              </TabsList>
              <TabsContent value="select" className="w-[125px]">
                Select an Activity
              </TabsContent>
              <TabsContent value="delete" className="w-[125px]">
                Delete Activities
              </TabsContent>
            </Tabs>
            <Button className="h-[60px] whitespace-pre-line bg-orange-act text-base">
              Update{"\n"}Schedule
            </Button>
          </div>
        </div>
      ) : (
        <ActivityForm
          initActivity={currentActivity}
          goalOptionsPromise={goalOptionsPromise}
          closeForm={() => setEditMode(false)}
        />
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
