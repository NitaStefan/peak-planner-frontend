import { getDayOfWeekActivities } from "@/lib/api";
import React from "react";
import Activities from "../activities/Activities";
import { format } from "date-fns";

const WednesdayActivities = async () => {
  const activities = await getDayOfWeekActivities("WEDNESDAY");

  const isDayActive = format(new Date(), "EEEE") === "Wednesday";

  return activities.length > 0 ? (
    <Activities activities={activities} isDayActive={isDayActive} />
  ) : (
    <p className="text-slate-500">No activities scheduled for today.</p>
  );
};

export default WednesdayActivities;
