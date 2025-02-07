import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";

const TuesdayActivities = async () => {
  const activities = await getDayOfWeekActivities("TUESDAY");

  return <Activities activities={activities} />;
};

export default TuesdayActivities;
