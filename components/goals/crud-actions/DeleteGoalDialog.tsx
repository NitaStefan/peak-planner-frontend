"use client";

import React, { useState } from "react";
import Image from "next/image";
import { deleteGoal } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const DeleteGoalDialog = ({
  id,
  closePopover = () => {},
  className = "",
}: {
  id: number;
  closePopover?: () => void;
  className?: string;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);

    await deleteGoal(id);
    setIsOpen(false);
    closePopover();
    router.push("/goals");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        className={cn(
          "flex grow items-center justify-center gap-x-[3px] rounded-md border-2 border-orange-sec text-sm text-orange-sec",
          className,
        )}
      >
        <Image
          src="/icons/delete-sec.svg"
          width={18}
          height={18}
          alt="Edit Goal"
        />
        Delete This Goal
      </DialogTrigger>
      <DialogContent className="bg-blue-dark p-[25px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the goal.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-[20px]">
          <Button variant="secondary">Cancel</Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Yes, Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteGoalDialog;
