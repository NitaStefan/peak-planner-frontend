"use client";
import UpdatePlannedEvDialog from "@/components/events/planned-events/crud-actions/UpdatePlannedEvDialog";
import DeletePlannedEvDialog from "./DeletePlannedEvDialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import DuplicatePlannedEvDialog from "./DuplicatePlannedEvDialog";

const PlannedEventsActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="ml-auto">
        <Image src="icons/options.svg" width={25} height={25} alt="Options" />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-y-[5px] border-2 border-bone-white bg-blue-dark p-[5px]">
        <UpdatePlannedEvDialog closePopover={() => setIsOpen(false)} />
        <DuplicatePlannedEvDialog closePopover={() => setIsOpen(false)} />
        <DeletePlannedEvDialog />
      </PopoverContent>
    </Popover>
  );
};

export default PlannedEventsActions;
