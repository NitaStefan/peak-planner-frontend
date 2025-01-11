import React from "react";
import PageLinks from "./PageLinks";
import AuthActions from "./AuthActions";

const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => {
  return (
    <>
      <div className="flex flex-col gap-[40px]">
        <PageLinks isMobile={isMobile} />
      </div>
      <div className="flex flex-col gap-[15px]">
        <AuthActions />
      </div>
    </>
  );
};

export default NavLinks;
