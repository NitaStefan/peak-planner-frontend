import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const AddPlannedEvent = () => {
  return (
    <Button className="absolute right-0 top-[-49px] h-auto w-fit rounded-md bg-orange-act px-[10px] py-[7px] text-base hover:bg-orange-act max-sm:px-[7px] sm:top-[-52px]">
      <span className="inline max-sm:hidden">Add Planned Event</span>
      <Image
        src="icons/add.svg"
        width={18}
        height={18}
        alt="Add Planned Event"
        className="block sm:hidden"
      />
    </Button>
  );
};

export default AddPlannedEvent;
