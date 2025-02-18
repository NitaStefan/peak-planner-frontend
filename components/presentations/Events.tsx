import React from "react";

const Events = () => {
  return (
    <div className="mt-[25px] flex items-center gap-x-[10px]">
      <h2 className="rounded-md border-2 border-dashed px-[39px] py-[30px] text-xl font-semibold">
        Events
      </h2>
      {/* <h2 className="rounded-md border-2 border-dashed text-xl font-semibold">
        Goals
      </h2> */}
      <p className="text-slate-400 max-sm:text-sm">
        Events are time-bound tasks that can be either fixed (scheduled for a
        specific date) or flexible (to be completed within a timeframe). They
        help structure commitments and deadlines.
      </p>
    </div>
  );
};

export default Events;
