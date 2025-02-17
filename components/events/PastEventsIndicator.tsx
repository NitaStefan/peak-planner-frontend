import React from "react";

const PastEventsIndicator = () => {
  return (
    <div className="mt-6 flex items-center justify-center">
      <div className="relative w-full text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-slate-500"></div>
        </div>
        <div className="relative">
          <span className="rounded-md bg-slate-500 px-4 text-bone-white">
            Past Events
          </span>
        </div>
      </div>
    </div>
  );
};

export default PastEventsIndicator;
