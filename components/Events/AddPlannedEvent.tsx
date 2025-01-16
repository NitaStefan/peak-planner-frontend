import Image from "next/image";
import React from "react";

const AddPlannedEvent = () => {
  return (
    <div className="absolute right-0 top-[-50px] w-fit rounded-md bg-orange-act px-[10px] py-[5px] max-md:py-[10px] max-sm:left-0 max-sm:py-[5px]">
      <span className="inline max-md:hidden max-sm:inline">
        Add Planned Event
      </span>
      <Image
        src="icons/add.svg"
        width={18}
        height={18}
        alt="Add Planned Event"
        className="block max-sm:hidden md:hidden"
      />
    </div>
  );
};

export default AddPlannedEvent;
