"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/actions";
import ROUTES from "@/constants/routes";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh(); // This will cause the server components to re-render
    router.push(ROUTES.HOME);
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-blue-darker bg-opacity-50 hover:bg-blue-darker max-lg:p-0"
    >
      <Image
        src="/icons/logout.svg"
        width={18}
        height={18}
        alt="Log Out"
        className="max-sm:hidden lg:hidden"
      />
      <span className="text-base max-lg:hidden max-sm:inline">Log Out</span>
    </Button>
  );
};
