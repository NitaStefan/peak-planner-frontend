// import ScheduleGrid from "@/components/schedule/schedule-grid";
import ClientScheduleWrapper from "@/components/schedule/schedule-grid/ClientScheduleWrapper";
import { getSchedule } from "@/lib/api";
import React from "react";

const Page = async () => {
  const weekDays = await getSchedule();

  // return <ScheduleGrid weekDays={weekDays} />;
  return <ClientScheduleWrapper initialWeekDays={weekDays} />;
};

export default Page;
