"use client";

import { Button } from "@/components/ui/button";
import { usePlannedEvent } from "@/contexts/PlannedEventContext";
import { deletePlannedEvent } from "@/lib/api";
import Image from "next/image";
import React, { useState } from "react";

const DirectPlannedEventDelete = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { plannedEvent } = usePlannedEvent();

  const handleDelete = async () => {
    setIsDeleting(true);

    await deletePlannedEvent(plannedEvent.id);

    setIsDeleting(false);
  };

  return (
    <Button
      onClick={handleDelete}
      disabled={isDeleting}
      className="gap-x-[4px]"
    >
      <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};

export default DirectPlannedEventDelete;
