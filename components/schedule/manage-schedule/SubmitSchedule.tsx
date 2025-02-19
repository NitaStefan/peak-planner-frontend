import { Button } from "@/components/ui/button";
import { updateSchedule } from "@/lib/api";
import { convertTimeToISO } from "@/lib/format";
import { DayOfWeek, ScheduleUpdateRequest } from "@/lib/types";
import { TActivityReq } from "@/lib/validations";
import React, { useState } from "react";

const SubmitSchedule = ({
  requestObject,
}: {
  requestObject: ScheduleUpdateRequest;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  // Remove arbitrary ids of the activities
  requestObject.activitiesToAdd = Object.fromEntries(
    Object.entries(requestObject.activitiesToAdd).map(([key, value]) => [
      key as DayOfWeek,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value.map(({ id, startTime, ...rest }) => ({
        ...rest,
        startTime: convertTimeToISO(startTime), // Convert on the client time before sending
      })),
    ]),
  ) as Record<DayOfWeek, TActivityReq[]>; // Cast the final object

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateSchedule(requestObject);
    setIsUpdating(false);
  };

  return (
    <Button
      onClick={handleUpdate}
      className="h-[56px] whitespace-pre-line bg-orange-act text-base"
      disabled={isUpdating}
    >
      {isUpdating ? "Updating..." : "Update\nSchedule"}
    </Button>
  );
};

export default SubmitSchedule;
