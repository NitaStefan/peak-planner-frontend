import React, { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TGoalResponse } from "@/lib/validations";
import UpdateGoalDialog from "./UpdateGoalDialog";
import AddGoalDialog from "./AddGoalDialog";
import DeleteGoalDialog from "./DeleteGoalDialog";

const GoalControls = ({ goal }: { goal: TGoalResponse }) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <>
      <UpdateGoalDialog goal={goal} className="max-md:hidden" />
      <DeleteGoalDialog id={goal.id} className="max-md:hidden" />
      <AddGoalDialog className="max-md:hidden" />
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger className="flex grow items-center justify-center gap-x-[3px] rounded-md border-2 border-orange-sec text-sm text-orange-sec md:hidden">
          <Image
            src="/icons/controls-sec.svg"
            width={18}
            height={18}
            alt="Edit Goal"
          />
          Goal Controls
        </PopoverTrigger>
        <PopoverContent className="flex w-fit flex-col items-start gap-y-[4px] border-2 border-blue-dark bg-blue-darker p-[5px]">
          <UpdateGoalDialog
            closePopover={() => setIsPopoverOpen(false)}
            goal={goal}
            className="border-none px-[16px] py-[8px]"
          />
          <DeleteGoalDialog
            id={goal.id}
            closePopover={() => setIsPopoverOpen(false)}
            className="border-none px-[16px] py-[8px]"
          />
          <AddGoalDialog
            className="border-none px-[16px] py-[8px]"
            closePopover={() => setIsPopoverOpen(false)}
          />
        </PopoverContent>
      </Popover>
    </>
  );
};

export default GoalControls;
