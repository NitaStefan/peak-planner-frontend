import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Link from "next/link";
import React from "react";

const AuthActions = async () => {
  return (
    <div className="mt-[20px] flex items-center justify-center gap-[20px]">
      <Button asChild className="bg-orange-act px-[30px]">
        <Link href={ROUTES.SIGN_UP}>
          <span className="text-base">Get Started!</span>
        </Link>
      </Button>
      <span className="text-slate-500">Or</span>
      <Button asChild className="bg-blue-medium bg-opacity-50">
        <Link href={ROUTES.SIGN_IN}>
          <span className="text-base text-orange-act">Log In</span>
        </Link>
      </Button>
    </div>
  );
};

export default AuthActions;
