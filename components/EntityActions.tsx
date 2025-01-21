"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";

const EntityActions = ({ children }: { children: React.ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger className="ml-auto">
        <Image src="icons/options.svg" width={25} height={25} alt="Options" />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-y-[5px] border-2 border-bone-white bg-blue-dark p-[5px]">
        {children}
      </PopoverContent>
    </Popover>
  );
};

export default EntityActions;
