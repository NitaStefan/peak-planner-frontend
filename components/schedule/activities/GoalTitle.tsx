import Image from "next/image";
import React from "react";

const GoalTitle = ({ title }: { title: string | undefined }) => {
  return title ? (
    <div className="absolute left-[40px] top-[-20px] flex items-center gap-x-[3px] text-sm text-orange-sec">
      <Image
        src="/icons/goal-sec.svg"
        height={15}
        width={15}
        alt="Goal Reference"
      />
      {title}
    </div>
  ) : null;
};

export default GoalTitle;
