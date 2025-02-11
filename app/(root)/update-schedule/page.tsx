import { getGoalsWithCurrentStep, getSchedule } from "@/lib/api";
import React, { Suspense } from "react";
import ManageSchedule from "@/components/schedule/ManageSchedule";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();
  const goalOptions = getGoalsWithCurrentStep();

  return (
    <Suspense fallback={<div>Loading schedule...</div>}>
      <ManageSchedule
        initWeekDays={weekDays}
        goalOptionsPromise={goalOptions}
      />
    </Suspense>
  );
};

export default ModifySchedulePage;
