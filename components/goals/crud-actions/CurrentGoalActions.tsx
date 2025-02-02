import React from "react";
import Image from "next/image";
import GoalControls from "./GoalControls";
import { Button } from "@/components/ui/button";

const CurrentGoalActions = () => {
  return (
    <div className="flex justify-between gap-[10px] pt-[10px]">
      <GoalControls />
      <Button className="grow gap-x-[3px] bg-orange-act">
        <Image src="/icons/add.svg" width={18} height={18} alt="Edit Goal" />
        <span> Add New Step</span>
      </Button>
    </div>
  );
};

export default CurrentGoalActions;
