import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";

const SundayActivities = async () => {
  const activities = await getDayOfWeekActivities("SUNDAY");

  return <Activities activities={activities} />;
};

export default SundayActivities;
