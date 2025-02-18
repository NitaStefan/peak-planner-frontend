import React from "react";

const Goals = () => {
  return (
    <div className="mt-[25px] flex items-center gap-x-[10px]">
      <h2 className="rounded-md border-2 border-dashed px-[43px] py-[30px] text-xl font-semibold">
        Goals
      </h2>
      {/* <h2 className="rounded-md border-2 border-dashed text-xl font-semibold">
        Goals
      </h2> */}
      <p className="text-slate-400 max-sm:text-sm">
        Long-term goals are big objectives that require step-by-step progress
        over weeks or months. They include milestones and integrate with
        routines for structured achievement.
      </p>
    </div>
  );
};

export default Goals;
