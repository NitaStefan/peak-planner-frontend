import { getSchedule } from "@/lib/api";
import React from "react";
import ScheduleGrid from "@/components/goals/schedule-grid";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();

  return (
    <div className="flex w-full flex-col items-center">
      <h1 className="mb-4 text-2xl">Modify Schedule</h1>

      <ScheduleGrid weekDays={weekDays} />
    </div>
  );
};

export default ModifySchedulePage;
