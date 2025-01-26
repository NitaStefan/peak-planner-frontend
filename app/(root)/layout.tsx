import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex">
      <NavBar />
      <LeftSideBar />
      <section className={cn("min-h-screen grow")}>
        <div className="mx-auto max-w-5xl px-[30px] pb-[20px] pt-[120px] max-sm:px-[15px] max-sm:pt-[100px]">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default RootLayout;
