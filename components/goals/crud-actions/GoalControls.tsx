import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const GoalControls = () => {
  return (
    <>
      <Button className="border-orange-sec text-orange-sec grow gap-x-[3px] border-2 max-md:hidden">
        <Image
          src="/icons/edit-sec.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        <span>Edit This Goal</span>
      </Button>
      <Button className="border-orange-sec text-orange-sec grow gap-x-[3px] border-2 max-md:hidden">
        <Image
          src="/icons/delete-sec.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        Delete This Goal
      </Button>
      <Button className="border-orange-sec text-orange-sec grow gap-x-[3px] border-2 max-md:hidden">
        <Image
          src="/icons/add-sec.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        Add New Goal
      </Button>
      <Popover>
        <PopoverTrigger className="border-orange-sec text-orange-sec flex grow items-center justify-center gap-x-[3px] rounded-md border-2 text-sm md:hidden">
          <Image
            src="/icons/controls-sec.svg"
            width={18}
            height={18}
            alt="Edit Goal"
          />
          Goal Controls
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col items-start gap-y-[4px] border-2 border-blue-dark bg-blue-darker p-[5px]">
          <Button className="text-orange-sec grow gap-x-[3px] shadow-none">
            <Image
              src="/icons/edit-sec.svg"
              width={18}
              height={18}
              alt="Edit Goal"
            />
            <span>Edit This Goal</span>
          </Button>
          <Button className="text-orange-sec grow gap-x-[3px] shadow-none">
            <Image
              src="/icons/delete-sec.svg"
              width={18}
              height={18}
              alt="Edit Goal"
            />
            Delete This Goal
          </Button>
          <Button className="text-orange-sec grow gap-x-[3px] shadow-none">
            <Image
              src="/icons/add-sec.svg"
              width={18}
              height={18}
              alt="Edit Goal"
            />
            Add New Goal
          </Button>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default GoalControls;
