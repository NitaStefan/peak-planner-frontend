import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { isLoggedIn } from "@/lib/actions";
import LandingPage from "@/components/presentations/LandingPage";
import NavBar from "@/components/navigation/navbar/NavBar";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await isLoggedIn();

  if (!isAuthenticated) return <LandingPage />;

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
