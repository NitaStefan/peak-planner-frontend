import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/navbar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { isLoggedIn } from "@/lib/actions";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await isLoggedIn();

  if (!isAuthenticated) return <div>LANDING PAGE + sign in/up options</div>;

  return (
    <main className="flex">
      <NavBar />
      <LeftSideBar />
      <section className={cn("min-h-screen grow")}>
        <div className="mx-auto max-w-5xl px-[30px] pb-[20px] pt-[90px] max-sm:px-[10px] max-sm:pt-[80px]">
          {children}
        </div>
      </section>
      <Toaster />
    </main>
  );
};

export default RootLayout;
