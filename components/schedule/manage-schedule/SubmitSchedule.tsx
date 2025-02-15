import { Button } from "@/components/ui/button";
import { updateSchedule } from "@/lib/api";
import { ScheduleUpdateRequest } from "@/lib/types";
import React, { useState } from "react";

const SubmitSchedule = ({
  requestObject,
}: {
  requestObject: ScheduleUpdateRequest;
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

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
