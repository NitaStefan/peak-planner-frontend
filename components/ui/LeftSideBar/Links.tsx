import { sidebarLinks } from "@/constants/sidebarLinks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Links = () => {
  return (
    <>
      {sidebarLinks.map((item) => {
        return (
          <Link href={item.route} key={item.label} className="flex gap-[8px]">
            <Image src={item.imgURL} width="20" height="20" alt={item.label} />
            <p className="text-lg">{item.label}</p>
          </Link>
        );
      })}
    </>
  );
};

export default Links;
