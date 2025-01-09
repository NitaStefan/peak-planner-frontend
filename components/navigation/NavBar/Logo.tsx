import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ showFull = false }: { showFull?: boolean }) => {
  return (
    <Link href="/" className="flex items-center gap-[6px]">
      <Image src="logo.svg" width="36" height="36" alt="Peak Planner Logo" />
      <span
        className={cn(
          "font-permanent-marker text-xl text-white",
          showFull ? "" : "max-sm:hidden",
        )}
      >
        Peak Planner
      </span>
    </Link>
  );
};

export default Logo;
