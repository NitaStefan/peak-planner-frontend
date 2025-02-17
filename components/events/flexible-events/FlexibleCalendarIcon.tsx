import Image from "next/image";
import React from "react";

const FlexibleCalendarIcon = ({ isPast = false }: { isPast?: boolean }) => {
  return (
    <Image
      src="/icons/calendar.svg"
      width={24}
      height={24}
      alt="Start Date"
      className={`max-sm:hidden ${isPast ? "opacity-60" : ""}`}
    />
  );
};

export default FlexibleCalendarIcon;
