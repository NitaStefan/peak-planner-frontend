"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { useState } from "react";
import DeleteFlexibleEvDialog from "./DeleteFlexibleEvDialog";
import UpdateFlexibleEvDialog from "./UpdateFlexibleEvDialog";

const FlexibleEventsActions = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="ml-auto">
        <Image src="icons/options.svg" width={25} height={25} alt="Options" />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-y-[5px] border-2 border-bone-white bg-blue-dark p-[5px]">
        <UpdateFlexibleEvDialog closePopover={() => setIsOpen(false)} />
        <DeleteFlexibleEvDialog />
      </PopoverContent>
    </Popover>
  );
};

export default FlexibleEventsActions;
