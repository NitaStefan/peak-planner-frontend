"use client";

import React, { useState } from "react";
import ActivityForm from "../forms/schedule/ActivityForm";
import ScheduleGrid from "../goals/schedule-grid";
import { TWeekDayRes } from "@/lib/validations";
import { GoalWithCurrStep } from "@/lib/types";

const ManageSchedule = ({
  initWeekDays,
  goalOptionsPromise,
}: {
  initWeekDays: TWeekDayRes[];
  goalOptionsPromise: Promise<GoalWithCurrStep[]>;
}) => {
  const [weekDays, setWeekDays] = useState(initWeekDays);

  const [currentActivity, setCurrentActivity] = useState({
    title: "test Title",
    description: "some random description",
    startTime: "14:40",
    minutes: 140,
    impact: 9,
  });

  return (
    <div className="flex w-full flex-col items-center gap-y-[20px]">
      <ActivityForm
        initActivity={currentActivity}
        goalOptionsPromise={goalOptionsPromise}
      />

      <ScheduleGrid weekDays={weekDays} />
    </div>
  );
};

export default ManageSchedule;
