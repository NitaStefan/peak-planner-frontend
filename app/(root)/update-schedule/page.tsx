import { getSchedule } from "@/lib/api";
import React from "react";

const ModifySchedulePage = async () => {
  const weekDays = await getSchedule();

  return <div>{JSON.stringify(weekDays)}</div>;
};

export default ModifySchedulePage;
