import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "./Activities";

const SaturdayActivities = async () => {
  const activities = await getDayOfWeekActivities("SATURDAY");

  return <Activities activities={activities} />;
};

export default SaturdayActivities;
