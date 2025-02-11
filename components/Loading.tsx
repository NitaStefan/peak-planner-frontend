import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center gap-[6px]">
      <Image
        src="/logo.svg"
        alt="Logo"
        width={30}
        height={30}
        className="animate-bounce-custom"
      />
      <p className="animate-pulse text-lg text-slate-500">Loading...</p>
    </div>
  );
};

export default Loading;
