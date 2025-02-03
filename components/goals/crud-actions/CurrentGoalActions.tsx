"use client";

import React from "react";
import Image from "next/image";
import GoalControls from "./GoalControls";
import { TGoalResponse, TStepRequest } from "@/lib/validations";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addStepToGoal } from "@/lib/api";
import StepForm from "@/components/forms/goals/StepForm";

const CurrentGoalActions = ({ goal }: { goal: TGoalResponse }) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddStep = async (step: TStepRequest) => {
    await addStepToGoal(goal.id, step);
    setIsDialogOpen(false);
  };

  return (
    <div className="flex justify-between gap-[10px] pt-[10px]">
      <GoalControls goal={goal} />
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger className="flex grow items-center justify-center gap-x-[3px] rounded-md bg-orange-act py-[8px] text-sm">
          <Image src="/icons/add.svg" width={18} height={18} alt="Add Step" />
          <span>Add New Step</span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="hidden">Add</DialogTitle>
          </DialogHeader>
          <StepForm
            mutateData={handleAddStep}
            numberOfSteps={goal.numberOfSteps}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurrentGoalActions;
