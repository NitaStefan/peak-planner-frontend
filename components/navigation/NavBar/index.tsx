import React from "react";
import Logo from "./Logo";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import MobileSheet from "./MobileSheet";

const NavBar = ({ isAuthenticated = false }: { isAuthenticated: boolean }) => {
  return (
    <nav className="fixed top-0 flex h-[80px] w-screen items-center bg-blue-dark px-[25px]">
      <Logo />
      <div className="mx-auto flex rounded-md border-2 border-bone-white px-[10px] py-[6px]">
        <Image
          src="/icons/search.svg"
          width={23}
          height={23}
          alt="search icon"
        />
        <Input
          placeholder={
            isAuthenticated ? "Search users..." : "Search globally..."
          }
          className="max-sm:w-[180px]"
        />
      </div>
      {isAuthenticated && <MobileSheet />}
    </nav>
  );
};

export default NavBar;
