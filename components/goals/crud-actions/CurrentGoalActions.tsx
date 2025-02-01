import React from "react";
import Image from "next/image";
import GoalControls from "./GoalControls";
import { Button } from "@/components/ui/button";

const CurrentGoalActions = () => {
  return (
    <div className="flex justify-between gap-[10px] pt-[10px]">
      <GoalControls />
      <Button className="grow gap-x-[3px] border-[4px] border-orange-act text-orange-act">
        <Image
          src="/icons/add-bold-act.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        <strong> Add New Step</strong>
      </Button>
    </div>
  );
};

export default CurrentGoalActions;
