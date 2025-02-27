"use client";

import ScheduleGrid from "@/components/schedule/schedule-grid";
import { TWeekDayRes } from "@/lib/validations";
import { convertUTCToLocal } from "@/lib/format";

const ClientScheduleWrapper = ({
  initialWeekDays,
}: {
  initialWeekDays: TWeekDayRes[];
}) => {
  const processedWeekDays = initialWeekDays.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({
      ...activity,
      startTime: convertUTCToLocal(activity.startTime),
      endTime: convertUTCToLocal(activity.endTime),
    })),
  }));

  return <ScheduleGrid weekDays={processedWeekDays} />;
};

export default ClientScheduleWrapper;
