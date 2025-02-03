"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";
import { addGoal } from "@/lib/api";
import { TGoalRequest } from "@/lib/validations";
import { cn } from "@/lib/utils";
import GoalForm from "@/components/forms/goals/GoalForm";

const AddGoalDialog = ({
  closePopover = () => {},
  className = "",
}: {
  closePopover?: () => void;
  className?: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleAddGoal = async (goal: TGoalRequest) => {
    await addGoal(goal);
    setIsDialogOpen(false);
    closePopover();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger
        className={cn(
          "flex grow items-center justify-center gap-x-[3px] rounded-md border-2 border-orange-sec text-sm text-orange-sec",
          className,
        )}
      >
        <Image src="/icons/add-sec.svg" width={18} height={18} alt="Add Goal" />
        <span>Add New Goal</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Add</DialogTitle>
        </DialogHeader>
        <GoalForm mutateData={handleAddGoal} />
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
