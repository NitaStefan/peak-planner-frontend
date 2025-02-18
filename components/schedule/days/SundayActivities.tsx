import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const SundayActivities = async () => {
  const activities = await getDayOfWeekActivities("SUNDAY");

  const isDayActive = format(new Date(), "EEEE") === "Sunday";

  return activities.length > 0 ? (
    <Activities activities={activities} isDayActive={isDayActive} />
  ) : (
    <p className="text-slate-500">No activities scheduled for today.</p>
  );
};

export default SundayActivities;
