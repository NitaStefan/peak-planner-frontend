import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const EditDeleteDetails = ({
  onDelete,
  onUpdate,
}: {
  onDelete: () => void;
  onUpdate: () => void;
}) => {
  return (
    <div className="flex flex-col gap-y-[10px]">
      <Button
        onClick={onUpdate}
        className="h-fit border-2 border-orange-act p-[4px]"
      >
        <Image
          src="/icons/edit-act.svg"
          width={16}
          height={16}
          alt="Edit Details"
        />
      </Button>
      <Button
        onClick={onDelete}
        className="h-fit border-2 border-orange-act p-[4px]"
      >
        <Image
          src="/icons/delete-act.svg"
          width={16}
          height={16}
          alt="Delete Details"
        />
      </Button>
    </div>
  );
};

export default EditDeleteDetails;
