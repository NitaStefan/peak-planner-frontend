"use client";

import DeleteDialog from "@/components/DeleteDialog";
import EntityActions from "@/components/EntityActions";
import UpdatePlannedEvDialog from "@/components/events/PlannedEvents/crudActions/UpdatePlannedEvDialog";
import { deletePlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";

const PlannedEventsActions = ({
  plannedEvent,
}: {
  plannedEvent: TPlannedEvent & { id: number };
}) => {
  const handleDeletePlannedEvent = async () => {
    await deletePlannedEvent(plannedEvent.id);
  };

  return (
    <EntityActions>
      <UpdatePlannedEvDialog plannedEvent={plannedEvent} />
      {/* DuplicateDialog */}
      <DeleteDialog
        deleteEntity={handleDeletePlannedEvent}
        message="This will permanently delete the event."
      />
    </EntityActions>
  );
};

export default PlannedEventsActions;
