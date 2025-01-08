import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-[6px]">
      <Image src="logo.svg" width="28" height="28" alt="Peak Planner Logo" />
      <span className="font-permanent-marker text-xl text-white">
        Peak Planner
      </span>
    </Link>
  );
};

export default Logo;
