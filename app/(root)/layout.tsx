import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/NavBar";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <NavBar />
      <LeftSideBar />
      <section className="bg-blue-darker ml-[266px] mt-[80px] h-[calc(100vh-80px)] max-lg:ml-[90px] max-sm:ml-0">
        <div className="mx-auto max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default RootLayout;
