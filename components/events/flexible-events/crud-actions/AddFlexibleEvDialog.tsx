"use client";

import Image from "next/image";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TFlexibleEvent } from "@/lib/validations";
import { addFlexibleEvent } from "@/lib/api";
import FlexibleEventForm from "@/components/forms/FlexibleEventForm";

const AddFlexibleEvDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddFlexibleEvent = async (flexibleEvent: TFlexibleEvent) => {
    await addFlexibleEvent(flexibleEvent);
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="absolute right-0 top-[-40px] h-auto w-fit rounded-md bg-orange-act px-[10px] py-[7px] text-base hover:bg-orange-act max-sm:px-[7px] sm:top-[-45px]">
        <span className="inline max-sm:hidden">Add Flexible Event</span>
        <Image
          src="icons/add.svg"
          width={18}
          height={18}
          alt="Add Flexible Event"
          className="block sm:hidden"
        />
      </DialogTrigger>
      <DialogContent className="rounded-none">
        <DialogHeader>
          <DialogTitle className="hidden">Flexible Event</DialogTitle>
        </DialogHeader>
        <FlexibleEventForm mutateData={handleAddFlexibleEvent} />
      </DialogContent>
    </Dialog>
  );
};

export default AddFlexibleEvDialog;
