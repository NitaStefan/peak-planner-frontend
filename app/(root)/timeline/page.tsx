import ScheduleGrid from "@/components/schedule/schedule-grid";
import { getSchedule } from "@/lib/api";
import React from "react";

const Page = async () => {
  const weekDays = await getSchedule();
  return <ScheduleGrid weekDays={weekDays} />;
};

export default Page;
