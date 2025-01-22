"use client";

import DeleteDialog from "@/components/DeleteDialog";
import EntityActions from "@/components/EntityActions";
import PlannedEventForm from "@/components/forms/PlannedEventForm";
import UpdateDialog from "@/components/UpdateDialog";
import { deletePlannedEvent, updatePlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";
import React from "react";

const PlannedEventsActions = ({
  plannedEvent,
}: {
  plannedEvent: TPlannedEvent & { id: number };
}) => {
  const handleDeletePlannedEvent = async () => {
    await deletePlannedEvent(plannedEvent.id);
  };

  const handleUpdatePlannedEvent = async (plannedEvent: TPlannedEvent) => {
    await updatePlannedEvent(plannedEvent as TPlannedEvent & { id: number });
  };

  return (
    <EntityActions>
      <UpdateDialog>
        <PlannedEventForm
          initPlannedEvent={plannedEvent}
          mutateData={handleUpdatePlannedEvent}
        />
      </UpdateDialog>
      {/* DuplicateDialog */}
      <DeleteDialog deleteEntity={handleDeletePlannedEvent} />
    </EntityActions>
  );
};

export default PlannedEventsActions;
