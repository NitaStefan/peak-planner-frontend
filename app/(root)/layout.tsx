import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/NavBar";
import { isLoggedIn } from "@/lib/actions";
import { cn } from "@/lib/utils";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await isLoggedIn();

  return (
    <main className="flex">
      <NavBar isAuthenticated={isAuthenticated} />
      {isAuthenticated && <LeftSideBar />}
      <section className={cn("min-h-screen grow")}>
        <div className="mx-auto max-w-5xl px-[30px] pb-[40px] pt-[120px]">
          {children}
        </div>
      </section>
    </main>
  );
};

export default RootLayout;
