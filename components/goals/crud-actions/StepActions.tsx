"use client";

import { Button } from "@/components/ui/button";
import { deleteStep } from "@/lib/api";
import { TStepResponse } from "@/lib/validations";
import Image from "next/image";
import React, { useState } from "react";
import UpdateStepDialog from "./UpdateStepDialog";

const StepActions = ({
  step,
  numberOfSteps,
}: {
  step: TStepResponse;
  numberOfSteps: number;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteStep(step.id);
    setIsDeleting(false);
  };

  return (
    <div className="flex shrink-0 flex-col gap-y-[20px] opacity-80">
      <UpdateStepDialog step={step} numberOfSteps={numberOfSteps} />
      <Button
        onClick={handleDelete}
        disabled={isDeleting}
        className="h-fit border-2 p-[4px]"
      >
        <Image
          src="/icons/delete.svg"
          width={16}
          height={16}
          alt="Delete Step"
        />
      </Button>
    </div>
  );
};

export default StepActions;
