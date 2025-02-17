import Image from "next/image";
import React from "react";

const CurvedArrow = ({ isPast = false }: { isPast?: boolean }) => {
  return (
    <Image
      src="/icons/curved-arrow.svg"
      width={22}
      height={22}
      alt="Arrow"
      className={`rotate-90 ${isPast ? "opacity-50" : ""}`}
    />
  );
};

export default CurvedArrow;
