import React from "react";
import Links from "../Links";

const LeftSideBar = () => {
  return (
    <section className="fixed top-[80px] flex h-screen w-[266px] flex-col gap-[40px] overflow-y-auto bg-blue-dark px-[24px] pt-[40px] max-lg:w-[90px] max-sm:hidden">
      <Links />
    </section>
  );
};

export default LeftSideBar;
