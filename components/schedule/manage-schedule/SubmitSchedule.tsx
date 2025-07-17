"use client";

import { Button } from "@/components/ui/button";
import { updateSchedule } from "@/lib/api";
import { DayOfWeek, ScheduleUpdateRequest } from "@/lib/types";
import { TActivityReq } from "@/lib/validations";
import React, { useState } from "react";

const SubmitSchedule = ({
  requestObject,
}: {
  requestObject: ScheduleUpdateRequest;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updatedActivities = Object.fromEntries(
    Object.entries(requestObject.activitiesToAdd).map(([key, value]) => [
      key as DayOfWeek,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      value.map(({ id, ...rest }) => ({
        ...rest,
      })),
    ]),
  ) as Record<DayOfWeek, TActivityReq[]>;

  const updatedRequestObject = {
    ...requestObject,
    activitiesToAdd: updatedActivities,
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    await updateSchedule(updatedRequestObject);
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
