import React, { ReactNode } from "react";
import LeftSideBar from "@/components/navigation/LeftSideBar";
import NavBar from "@/components/navigation/NavBar";
import { isLoggedIn } from "@/lib/actions";
import { cn } from "@/lib/utils";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isAuthenticated = await isLoggedIn();

  return (
    <main>
      <NavBar isAuthenticated />
      {isAuthenticated && <LeftSideBar />}
      <section
        className={cn(
          "mt-[80px] h-[calc(100vh-80px)]",
          isAuthenticated && "ml-[266px] max-lg:ml-[90px] max-sm:ml-0",
        )}
      >
        <div className="mx-auto max-w-5xl">{children}</div>
      </section>
    </main>
  );
};

export default RootLayout;
