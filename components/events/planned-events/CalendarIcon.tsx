import Image from "next/image";
import React from "react";

const CalendarIcon = ({ isPast = false }: { isPast?: boolean }) => {
  return (
    <Image
      src="/icons/calendar.svg"
      width={24}
      height={24}
      alt="Scheduled Date"
      className={isPast ? "opacity-60" : ""}
    />
  );
};

export default CalendarIcon;
