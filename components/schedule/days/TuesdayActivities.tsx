import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const TuesdayActivities = async () => {
  const activities = await getDayOfWeekActivities("TUESDAY");

  const isDayActive = format(new Date(), "EEEE") === "Tuesday";

  return <Activities activities={activities} isDayActive={isDayActive} />;
};

export default TuesdayActivities;
