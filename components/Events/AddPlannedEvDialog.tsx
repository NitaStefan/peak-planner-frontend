"use client";

import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import PlannedEventForm from "../forms/PlannedEventForm";
import { addPlannedEvent } from "@/lib/api";
import { TPlannedEvent } from "@/lib/validations";

const AddPlannedEvDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddPlannedEvent = async (plannedEvent: TPlannedEvent) => {
    await addPlannedEvent(plannedEvent);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="absolute right-0 top-[-49px] h-auto w-fit rounded-md bg-orange-act px-[10px] py-[7px] text-base hover:bg-orange-act max-sm:px-[7px] sm:top-[-52px]">
        <span className="inline max-sm:hidden">Add Planned Event</span>
        <Image
          src="icons/add.svg"
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
        <PlannedEventForm mutateData={handleAddPlannedEvent} />
      </DialogContent>
    </Dialog>
  );
};

export default AddPlannedEvDialog;
