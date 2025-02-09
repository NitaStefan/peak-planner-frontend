import Image from "next/image";
import React from "react";

const TimeIcon = () => {
  return (
    <div
      className="sticky left-[4px] top-0 z-40 flex items-center justify-center border-b-2 border-slate-500 bg-blue-darker p-2"
      style={{
        gridColumn: "1",
        gridRow: "1",
      }}
    >
      <Image src="/icons/time.svg" width={16} height={16} alt="Time" />
    </div>
  );
};

export default TimeIcon;
