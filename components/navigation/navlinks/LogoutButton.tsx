"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { logout } from "@/lib/actions";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();

    router.push("/");
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
