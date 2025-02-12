import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const ThursdayActivities = async () => {
  const activities = await getDayOfWeekActivities("THURSDAY");

  const isDayActive = format(new Date(), "EEEE") === "Thursday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default ThursdayActivities;
