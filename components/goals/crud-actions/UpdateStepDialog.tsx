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
import { updateStep } from "@/lib/api";
import { TStepRequest, TStepResponse } from "@/lib/validations";
import StepForm from "@/components/forms/goals/StepForm";

const UpdateStepDialog = ({
  step,
  numberOfSteps,
}: {
  step: TStepResponse;
  numberOfSteps: number;
}) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleUpdateStep = async (step: TStepRequest) => {
    await updateStep(step as TStepRequest & { id: number });
    setIsDialogOpen(false);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className="rounded-md border-2 p-[4px] text-sm">
        <Image src="/icons/edit.svg" width={16} height={16} alt="Edit Step" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Update</DialogTitle>
        </DialogHeader>
        <StepForm
          mutateData={handleUpdateStep}
          initStep={step}
          numberOfSteps={numberOfSteps}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStepDialog;
