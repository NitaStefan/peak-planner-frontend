import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

const GoalControls = () => {
  return (
    <>
      <Button className="grow gap-x-[3px] border-2 border-orange-act text-orange-act max-md:hidden">
        <Image
          src="/icons/edit-act.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        <span>Edit This Goal</span>
      </Button>
      <Button className="grow gap-x-[3px] border-2 border-orange-act text-orange-act max-md:hidden">
        <Image
          src="/icons/delete-act.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        Delete This Goal
      </Button>
      <Button className="grow gap-x-[3px] border-2 border-orange-act text-orange-act max-md:hidden">
        <Image
          src="/icons/add-act.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        Add New Goal
      </Button>
      <Popover>
        <PopoverTrigger className="flex grow items-center justify-center gap-x-[3px] rounded-md border-2 border-orange-act text-sm text-orange-act md:hidden">
          <Image
            src="/icons/controls-act.svg"
            width={18}
            height={18}
            alt="Edit Goal"
          />
          Goal Controls
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col items-start gap-y-[4px] border-2 border-blue-dark bg-blue-darker p-[5px]">
          <Button className="grow gap-x-[3px] text-orange-act shadow-none">
            <Image
              src="/icons/edit-act.svg"
              width={18}
              height={18}
              alt="Edit Goal"
            />
            <span>Edit This Goal</span>
          </Button>
          <Button className="grow gap-x-[3px] text-orange-act shadow-none">
            <Image
              src="/icons/delete-act.svg"
              width={18}
              height={18}
              alt="Edit Goal"
            />
            Delete This Goal
          </Button>
          <Button className="grow gap-x-[3px] text-orange-act shadow-none">
            <Image
              src="/icons/add-act.svg"
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
