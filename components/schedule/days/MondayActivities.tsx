import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";

const MondayActivities = async () => {
  const activities = await getDayOfWeekActivities("MONDAY");

  return <Activities activities={activities} />;
};

export default MondayActivities;
