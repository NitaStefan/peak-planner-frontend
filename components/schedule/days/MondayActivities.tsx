import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const MondayActivities = async () => {
  const activities = await getDayOfWeekActivities("MONDAY");

  const isDayActive = format(new Date(), "EEEE") === "Monday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default MondayActivities;
