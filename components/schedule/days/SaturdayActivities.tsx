import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const SaturdayActivities = async () => {
  const activities = await getDayOfWeekActivities("SATURDAY");

  const isDayActive = format(new Date(), "EEEE") === "Saturday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default SaturdayActivities;
