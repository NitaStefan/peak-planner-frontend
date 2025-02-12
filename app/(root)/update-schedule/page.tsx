import { getGoalsWithCurrentStep, getSchedule } from "@/lib/api";
import React, { Suspense } from "react";
import Loading from "@/components/Loading";
import ManageSchedule from "@/components/schedule/manage-schedule/ManageSchedule";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();
  const goalOptions = getGoalsWithCurrentStep();

  return (
    <Suspense fallback={<Loading />}>
      <ManageSchedule
        initWeekDays={weekDays}
        goalOptionsPromise={goalOptions}
      />
    </Suspense>
  );
};

export default ModifySchedulePage;
