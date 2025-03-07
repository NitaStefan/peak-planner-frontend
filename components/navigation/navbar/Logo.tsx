import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ isMobile = false }: { isMobile?: boolean }) => {
  const LinkComponent = (
    <Link href="/" className="flex items-center gap-[6px]">
      <Image src="/logo.svg" width="36" height="36" alt="Peak Planner Logo" />
      <span className={cn("font-permanent-marker text-xl text-white")}>
        Peak Planner
      </span>
    </Link>
  );

  return isMobile ? (
    <SheetClose asChild>{LinkComponent}</SheetClose>
  ) : (
    <>{LinkComponent}</>
  );
};

export default Logo;
