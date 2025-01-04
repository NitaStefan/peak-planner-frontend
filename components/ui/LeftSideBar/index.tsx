import React from "react";
import Logo from "./Logo";
import Links from "./Links";

const LeftSideBar = () => {
  return (
    <section className="bg-blue-dark fixed flex h-screen flex-col gap-[80px] overflow-y-auto pl-[22px] pt-[40px] max-sm:hidden lg:w-[266px]">
      <Logo />
      <div className="flex flex-col gap-[45px]">
        <Links />
      </div>
    </section>
  );
};

export default LeftSideBar;
