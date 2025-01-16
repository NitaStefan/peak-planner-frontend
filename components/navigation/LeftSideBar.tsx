import React from "react";
import NavLinks from "./NavLinks";

const LeftSideBar = async () => {
  return (
    <section className="sticky top-[80px] flex h-[calc(100vh-80px)] w-[266px] shrink-0 flex-col justify-between gap-[15px] overflow-y-auto bg-blue-dark p-[15px] px-[24px] pt-[40px] max-lg:w-[90px] max-sm:hidden">
      <NavLinks />
    </section>
  );
};

export default LeftSideBar;
