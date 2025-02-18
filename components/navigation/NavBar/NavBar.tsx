import React from "react";
import Logo from "./Logo";
import MobileSheet from "./MobileSheet";

const NavBar = () => {
  return (
    <nav className="fixed top-0 z-50 flex h-[60px] w-screen items-center justify-between bg-blue-dark px-[25px]">
      <Logo />
      <MobileSheet />
    </nav>
  );
};

export default NavBar;
