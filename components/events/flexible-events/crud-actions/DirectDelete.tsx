"use client";

import { Button } from "@/components/ui/button";
import { useFlexibleEvent } from "@/contexts/FlexibleEventContext";
import { deleteFlexibleEvent } from "@/lib/api";
import Image from "next/image";
import React, { useState } from "react";

const DirectDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { flexibleEvent } = useFlexibleEvent();

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteFlexibleEvent(flexibleEvent.id);
    setIsDeleting(false);
  };

  return (
    <Button
      className="gap-x-[4px]"
      onClick={handleDelete}
      disabled={isDeleting}
    >
      <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DirectDelete;
