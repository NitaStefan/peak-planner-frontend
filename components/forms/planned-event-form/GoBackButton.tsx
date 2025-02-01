import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const GoBackButton = ({ goBack }: { goBack: () => void }) => {
  return (
    <Button
      onClick={goBack}
      className="absolute right-[4px] top-[100px] gap-[3px] text-slate-500 shadow-none"
    >
      <Image src="/icons/arrow-back.svg" width={20} height={20} alt="Go Back" />
      Go Back
    </Button>
  );
};

export default GoBackButton;
