import React, { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <section className="w-[300px] rounded-md border-2 border-bone-white border-opacity-40 bg-blue-dark p-[20px]">
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
