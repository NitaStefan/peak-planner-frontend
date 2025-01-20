"use client";

import EntityActions from "@/components/EntityActions";
import { deletePlannedEvent } from "@/lib/api";
import React from "react";

const PlannedEventsActions = ({
  plannedEventId,
}: {
  plannedEventId: number;
}) => {
  const handleDeletePlannedEvent = async () => {
    await deletePlannedEvent(plannedEventId);
  };

  return <EntityActions deleteEntity={handleDeletePlannedEvent} />;
};

export default PlannedEventsActions;
