import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "./Activities";

const ThursdayActivities = async () => {
  const activities = await getDayOfWeekActivities("THURSDAY");

  return <Activities activities={activities} />;
};

export default ThursdayActivities;
