import React from "react";

const BgMask = () => {
  return (
    <>
      <div className="absolute left-[1.5px] top-[4px] z-20 h-[calc(100%-10px)] w-[8px] rounded-full bg-blue-darker" />
      <div className="absolute left-[1.5px] top-[3px] z-[35] h-[32px] w-[8px] rounded-full bg-blue-darker" />
    </>
  );
};

export default BgMask;
