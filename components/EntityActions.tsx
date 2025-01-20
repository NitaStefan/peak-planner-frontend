"use client";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import React from "react";
import DeleteDialog from "./DeleteDialog";

const EntityActions = ({
  deleteEntity,
}: {
  deleteEntity: () => Promise<void>;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="ml-auto">
        <Image src="icons/options.svg" width={25} height={25} alt="Options" />
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col gap-y-[5px] border-2 border-bone-white bg-blue-dark p-[5px]">
        <Button className="w-full justify-start gap-1 bg-transparent shadow-none">
          <Image src="icons/edit.svg" width={18} height={18} alt="Edit" />
          Edit
        </Button>
        <Button className="w-full justify-start gap-1 bg-transparent shadow-none">
          <Image
            src="icons/duplicate.svg"
            width={18}
            height={18}
            alt="Duplicate"
          />
          Duplicate
        </Button>
        <DeleteDialog deleteEntity={deleteEntity} />
      </PopoverContent>
    </Popover>
  );
};

export default EntityActions;
