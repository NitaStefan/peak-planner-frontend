import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      <LeftSideBar />
      {children}
    </main>
  );
};

export default RootLayout;
