"use client";

import { sidebarLinks } from "@/constants/sidebarLinks";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { SheetClose } from "../../ui/sheet";

const PageLinks = ({ isMobile }: { isMobile?: boolean }) => {
  const pathname = usePathname();

  return (
    <>
      {sidebarLinks.map((item) => {
        const isActive = pathname === item.route;
        const LinkComponent = (
          <Link
            href={item.route}
            className={cn(
              "flex gap-[8px] rounded-md px-[10px] py-[8px] max-lg:justify-center max-lg:py-[10px] max-sm:justify-start",
              isActive && "bg-orange-act",
            )}
          >
            <Image src={item.imgURL} width="20" height="20" alt={item.label} />
            <p className="text-lg max-lg:hidden max-sm:block">{item.label}</p>
          </Link>
        );
        return isMobile ? (
          <SheetClose asChild key={item.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={item.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default PageLinks;
