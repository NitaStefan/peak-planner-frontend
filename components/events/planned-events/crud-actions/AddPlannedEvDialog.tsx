"use client";

import Image from "next/image";
import React from "react";
import { addPlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";
import PlannedEventForm from "@/components/forms/planned-event-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddPlannedEvDialog = ({ allDates }: { allDates: Date[] }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddPlannedEvent = async (plannedEvent: TPlannedEvent) => {
    await addPlannedEvent(plannedEvent);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="absolute right-0 top-[-40px] h-auto w-fit rounded-md bg-orange-act px-[10px] py-[7px] text-base hover:bg-orange-act max-sm:px-[7px] sm:top-[-45px]">
        <span className="inline max-sm:hidden">Add Planned Event</span>
        <Image
          src="/icons/add.svg"
          width={18}
          height={18}
          alt="Add Planned Event"
          className="block sm:hidden"
        />
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle className="hidden">Planned Event</DialogTitle>
        </DialogHeader>
        <PlannedEventForm
          mutateData={handleAddPlannedEvent}
          otherDates={allDates}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddPlannedEvDialog;
