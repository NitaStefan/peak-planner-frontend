"use client";

import { TActivityRes } from "@/lib/validations";
import React from "react";
import { Accordion } from "@/components/ui/accordion";
import ActivityItem from "./ActivityItem";

const Activities = ({
  activities,
  isDayActive,
}: {
  activities: TActivityRes[];
  isDayActive: boolean;
}) => {
  const activeId = activities.find((activity) => activity.isActive)?.id ?? null;

  activities = activities
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const defaultActiveActivity =
    activeId && isDayActive ? `item-${activeId}` : undefined;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultActiveActivity}
      className="flex flex-col gap-y-[65px] pl-[10px]"
    >
      {activities.map((activity) => (
        <ActivityItem
          key={activity.id}
          activity={activity}
          isDayActive={isDayActive}
        />
      ))}
    </Accordion>
  );
};

export default Activities;
