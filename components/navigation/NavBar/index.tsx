import React from "react";
import Logo from "./Logo";

const NavBar = () => {
  return (
    <nav className="fixed h-[60px] w-screen bg-blue-dark">
      <Logo />
    </nav>
  );
};

export default NavBar;
