"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import PlannedEventForm from "../../../forms/planned-events";
import { addPlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";
import { usePlannedEvent } from "@/contexts/PlannedEventContext";

const DuplicatePlannedEvDialog = ({
  closePopover,
}: {
  closePopover: () => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { plannedEvent, otherDates } = usePlannedEvent();

  const removeIds = (event: TPlannedEvent): TPlannedEvent => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, eventDetails, scheduledDate } = event;

    const nextDay = new Date(scheduledDate);
    nextDay.setDate(nextDay.getDate() + 1);

    return {
      scheduledDate: nextDay,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      eventDetails: eventDetails.map(({ id, ...details }) => details),
    };
  };

  const handleAddPlannedEvent = async (plannedEvent: TPlannedEvent) => {
    await addPlannedEvent(plannedEvent as TPlannedEvent & { id: number });
    setIsDialogOpen(false);
    closePopover();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex w-full items-center justify-start gap-1 bg-transparent px-[16px] py-[8px] text-sm text-bone-white shadow-none">
        <Image src="/icons/duplicate.svg" width={18} height={18} alt="Edit" />
        Duplicate
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Duplicate</DialogTitle>
        </DialogHeader>
        <PlannedEventForm
          mutateData={handleAddPlannedEvent}
          initPlannedEvent={removeIds(plannedEvent)}
          otherDates={[...otherDates, plannedEvent.scheduledDate]}
        />
      </DialogContent>
    </Dialog>
  );
};

export default DuplicatePlannedEvDialog;
