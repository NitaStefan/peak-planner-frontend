import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const WednesdayActivities = async () => {
  const activities = await getDayOfWeekActivities("WEDNESDAY");

  const isDayActive = format(new Date(), "EEEE") === "Wednesday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default WednesdayActivities;
