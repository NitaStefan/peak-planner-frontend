import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const SundayActivities = async () => {
  const activities = await getDayOfWeekActivities("SUNDAY");

  const isDayActive = format(new Date(), "EEEE") === "Sunday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default SundayActivities;
