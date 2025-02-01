import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import NavLinks from "../navlinks";
import Logo from "./Logo";
import Image from "next/image";

const MobileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="w-[70px] max-sm:w-[30px]">
        <Image
          src="/icons/menu.svg"
          width={35}
          height={35}
          alt="Menu"
          className="float-end sm:hidden"
        />
      </SheetTrigger>
      <SheetContent className="w-fit border-none bg-blue-dark py-[40px]">
        <SheetHeader>
          <SheetTitle className="hidden">Mobile Links</SheetTitle>
          <SheetDescription className="hidden">
            Navigate through the pages even if on the mobile
          </SheetDescription>
        </SheetHeader>
        <Logo showFull isMobile />
        <section className="mt-[50px] flex h-[calc(100%-80px)] w-[192px] flex-col justify-between gap-[15px] overflow-y-auto">
          <NavLinks isMobile />
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
