import { formatDuration } from "@/lib/format";
import { isoToLocalHour } from "@/lib/timeHelpers";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const TimeInterval = ({
  startTime,
  endTime,
  isCurrentActivity,
  duration,
}: {
  startTime: string;
  endTime: string;
  isCurrentActivity: boolean;
  duration: number;
}) => {

  return (
    <>
      <span
        className={cn(
          "absolute left-[-15px] top-[-22px] text-slate-500",
          isCurrentActivity && "top-[-24px] text-lg text-bone-white",
        )}
      >
        {isoToLocalHour(startTime)}
      </span>
      <span
        className={cn(
          "absolute bottom-[-22px] left-[-15px] text-slate-500",
          isCurrentActivity && "bottom-[-24px] text-lg text-bone-white",
        )}
      >
        {isoToLocalHour(endTime)}
      </span>
      <div
        className={cn(
          "absolute left-[-10px] top-[6px] h-[calc(100%-12px)] w-[3px] rounded-full bg-slate-500",
          isCurrentActivity && "bg-bone-white",
        )}
      ></div>
      <div className="absolute bottom-[-20px] left-[40px] flex gap-x-[3px] rounded-full border-2 border-slate-500 px-[4px] py-[1px] text-sm leading-none text-slate-500">
        <Image
          src="/icons/duration-slate.svg"
          width={13}
          height={13}
          alt="Duration"
        />
        {formatDuration(duration)}
      </div>
    </>
  );
};

export default TimeInterval;
