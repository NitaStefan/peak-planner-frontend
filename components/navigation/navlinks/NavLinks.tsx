import React from "react";
import PageLinks from "./PageLinks";
import { LogoutButton } from "./LogoutButton";

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <>
      <div className="flex flex-col gap-[40px]">
        <PageLinks isMobile={isMobile} />
      </div>
      <div className="flex flex-col gap-[15px]">
        <LogoutButton />
      </div>
    </>
  );
};

export default NavLinks;
