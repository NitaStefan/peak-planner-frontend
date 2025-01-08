import React from "react";
import Links from "./Links";

const LeftSideBar = () => {
  return (
    <section className="fixed top-[60px] flex h-screen w-[266px] flex-col gap-[45px] overflow-y-auto bg-blue-dark pl-[22px] pt-[40px] max-sm:hidden">
      <Links />
    </section>
  );
};

export default LeftSideBar;
