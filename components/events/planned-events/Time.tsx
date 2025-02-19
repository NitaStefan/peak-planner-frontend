"use client";

import { formatDuration, removeLeadingZeros } from "@/lib/format";
import { addMinutesToTime } from "@/lib/timeHelpers";
import Image from "next/image";
import React from "react";

const Time = ({
  startTime,
  minutes,
}: {
  startTime?: string;
  minutes?: number;
}) => {
  let TimeComponent = null;
  startTime = removeLeadingZeros(startTime);

  if (!startTime && !minutes) return TimeComponent;

  if (startTime && !minutes)
    TimeComponent = (
      <>
        <Image
          src="/icons/time.svg"
          width={16}
          height={16}
          alt="Time"
          className="opacity-75"
        />
        <span>{startTime}</span>
      </>
    );

  if (!startTime && minutes)
    TimeComponent = (
      <>
        <Image
          src="/icons/duration.svg"
          width={16}
          height={16}
          alt="Duration"
          className="opacity-75"
        />
        <span>{formatDuration(minutes)}</span>
      </>
    );

  if (startTime && minutes)
    TimeComponent = (
      <>
        <span>{startTime}</span>
        <Image
          src="/icons/curved-arrow.svg"
          width={16}
          height={16}
          alt="Arrow"
          className="rotate-90 opacity-75"
        />
        <span>{addMinutesToTime(startTime, minutes)}</span>
      </>
    );

  return (
    <div className="absolute bottom-0 flex translate-y-1/2 gap-x-[3px] rounded-full border-2 border-bone-white border-opacity-75 bg-blue-dark px-[6px] text-sm text-bone-white text-opacity-75">
      {TimeComponent}
    </div>
  );
};

export default Time;
