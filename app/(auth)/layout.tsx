import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="rounded-md border-2 bg-blue-dark p-[20px]">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
