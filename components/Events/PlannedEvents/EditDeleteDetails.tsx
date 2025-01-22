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
    <div className="flex flex-col gap-y-[8px]">
      <Button
        onClick={onDelete}
        className="h-fit border-2 border-orange-act p-[5px]"
      >
        <Image
          src="icons/delete-act.svg"
          width={18}
          height={18}
          alt="Delete Details"
        />
      </Button>
      <Button
        onClick={onUpdate}
        className="h-fit border-2 border-orange-act p-[5px]"
      >
        <Image
          src="icons/edit-act.svg"
          width={18}
          height={18}
          alt="Edit Details"
        />
      </Button>
    </div>
  );
};

export default EditDeleteDetails;
