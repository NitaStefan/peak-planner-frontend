import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const FridayActivities = async () => {
  const activities = await getDayOfWeekActivities("FRIDAY");

  const isDayActive = format(new Date(), "EEEE") === "Friday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default FridayActivities;
