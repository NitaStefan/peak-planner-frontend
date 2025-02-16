import React from "react";
import NavLinks from "./navlinks";

const LeftSideBar = () => {
  return (
    <section className="sticky top-[60px] flex h-[calc(100vh-60px)] w-[240px] shrink-0 flex-col justify-between gap-[15px] overflow-y-auto bg-blue-dark p-[15px] px-[24px] pt-[40px] max-lg:w-[90px] max-sm:hidden">
      <NavLinks />
    </section>
  );
};

export default LeftSideBar;
