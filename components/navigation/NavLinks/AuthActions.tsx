import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AuthActions = async () => {
  return (
    <>
      <Button
        asChild
        className="bg-blue-medium bg-opacity-50 hover:bg-blue-medium max-lg:p-0"
      >
        <Link href={ROUTES.SIGN_IN}>
          <Image
            src="/icons/account.svg"
            width={18}
            height={18}
            alt="Log In"
            className="max-sm:hidden lg:hidden"
          />
          <span className="text-base text-orange-act max-lg:hidden max-sm:inline">
            Log In
          </span>
        </Link>
      </Button>
      <Button
        asChild
        className="bg-blue-darker bg-opacity-50 hover:bg-blue-darker max-lg:p-0"
      >
        <Link href={ROUTES.SIGN_UP}>
          <Image
            src="/icons/sign-up.svg"
            width={18}
            height={18}
            alt="Sign Up"
            className="max-sm:hidden lg:hidden"
          />
          <span className="text-base max-lg:hidden max-sm:inline">Sign Up</span>
        </Link>
      </Button>
    </>
  );
};

export default AuthActions;
