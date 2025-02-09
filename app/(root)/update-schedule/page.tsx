import { getSchedule } from "@/lib/api";
import React from "react";
import ScheduleGrid from "@/components/goals/schedule-grid";
import ActivityForm from "@/components/forms/ActivityForm";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();

  return (
    <div className="flex w-full flex-col items-center">
      <ActivityForm />

      <ScheduleGrid weekDays={weekDays} />
    </div>
  );
};

export default ModifySchedulePage;
