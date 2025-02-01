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
import { updateFlexibleEvent } from "@/lib/api";
import { TFlexibleEventRequest } from "@/lib/validations";
import { useFlexibleEvent } from "@/contexts/FlexibleEventContext";
import FlexibleEventForm from "@/components/forms/FlexibleEventForm";

const UpdateFlexibleEvDialog = ({
  closePopover,
}: {
  closePopover: () => void;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { flexibleEvent } = useFlexibleEvent();

  const handleUpdateFlexibleEvent = async (
    flexibleEvent: TFlexibleEventRequest,
  ) => {
    await updateFlexibleEvent(flexibleEvent);
    setIsDialogOpen(false);
    closePopover();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="flex w-full items-center justify-start gap-1 bg-transparent px-[16px] py-[8px] text-sm text-bone-white shadow-none">
        <Image src="/icons/edit.svg" width={18} height={18} alt="Edit" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Update</DialogTitle>
        </DialogHeader>
        <FlexibleEventForm
          mutateData={handleUpdateFlexibleEvent}
          initFlexibleEvent={flexibleEvent}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateFlexibleEvDialog;
