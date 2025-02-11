import { getGoalsWithCurrentStep, getSchedule } from "@/lib/api";
import React, { Suspense } from "react";
import ManageSchedule from "@/components/schedule/ManageSchedule";
import Loading from "@/components/Loading";

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
