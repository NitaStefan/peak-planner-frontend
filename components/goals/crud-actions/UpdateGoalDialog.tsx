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
import { updateGoal } from "@/lib/api";
import { TGoalRequest, TGoalResponse } from "@/lib/validations";
import GoalForm from "@/components/forms/GoalForm";
import { cn } from "@/lib/utils";

const UpdateGoalDialog = ({
  closePopover = () => {},
  goal,
  className = "",
}: {
  closePopover?: () => void;
  goal: TGoalResponse;
  className?: string;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleUpdateGoal = async (goal: TGoalRequest) => {
    await updateGoal(goal as TGoalRequest & { id: number });
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
        <Image
          src="/icons/edit-sec.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        <span>Edit This Goal</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Update</DialogTitle>
        </DialogHeader>
        <GoalForm mutateData={handleUpdateGoal} initGoal={goal} />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateGoalDialog;
