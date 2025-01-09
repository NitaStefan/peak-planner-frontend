import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import React from "react";
import Links from "../Links";
import Logo from "./Logo";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="icons/menu.svg"
          width={35}
          height={35}
          alt="Menu"
          className="sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="w-fit border-none bg-blue-dark py-[40px]">
        <SheetHeader>
          <SheetTitle className="hidden">Mobile Links</SheetTitle>
          <SheetDescription className="hidden">
            Navigate through the pages even if on the mobile
          </SheetDescription>
        </SheetHeader>
        <Logo showFull />
        <section className="mt-[80px] flex w-[266px] flex-col gap-[40px]">
          <Links isMobile />
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
