import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "./Activities";

const WednesdayActivities = async () => {
  const activities = await getDayOfWeekActivities("WEDNESDAY");

  return <Activities activities={activities} />;
};

export default WednesdayActivities;
