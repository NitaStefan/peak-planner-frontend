import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const StepActions = () => {
  return (
    <div className="flex flex-col gap-y-[10px] opacity-80">
      <Button
        // onClick={onUpdate}
        className="h-fit border-2 p-[4px]"
      >
        <Image src="/icons/edit.svg" width={16} height={16} alt="Edit Step" />
      </Button>
      <Button
        // onClick={onDelete}
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
