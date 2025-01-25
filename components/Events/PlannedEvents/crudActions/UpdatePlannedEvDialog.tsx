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
import PlannedEventForm from "../../../forms/PlannedEventForm";
import { updatePlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";
import { usePlannedEvent } from "@/contexts/PlannedEventContext";

const UpdatePlannedEvDialog = ({
  closePopover,
}: {
  closePopover: () => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { plannedEvent, otherDates } = usePlannedEvent();

  const handleUpdatePlannedEvent = async (plannedEvent: TPlannedEvent) => {
    await updatePlannedEvent(plannedEvent as TPlannedEvent & { id: number });
    setIsDialogOpen(false);
    closePopover();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex w-full items-center justify-start gap-1 bg-transparent px-[16px] py-[8px] text-sm text-bone-white shadow-none">
        <Image src="icons/edit.svg" width={18} height={18} alt="Edit" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Update</DialogTitle>
        </DialogHeader>
        <PlannedEventForm
          mutateData={handleUpdatePlannedEvent}
          initPlannedEvent={plannedEvent}
          otherDates={otherDates}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlannedEvDialog;
