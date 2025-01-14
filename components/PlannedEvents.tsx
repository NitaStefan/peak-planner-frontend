import { getPlannedEvents } from "@/lib/api";
import Image from "next/image";
import React from "react";

const PlannedEvents = async () => {
  const plannedEvents = await getPlannedEvents();

  return (
    <div className="my-[20px]">
      <div className="flex items-center gap-x-[6px]">
        <Image
          src="icons/calendar.svg"
          width={24}
          height={24}
          alt="Scheduled Date"
        />
        <span className="text-xl">Mon, 23 Ian</span>
        <div>{JSON.stringify(plannedEvents)}</div>
      </div>
    </div>
  );
};

export default PlannedEvents;
