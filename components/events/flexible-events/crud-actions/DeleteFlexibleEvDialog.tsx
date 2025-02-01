"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../ui/dialog";
import Image from "next/image";
import { Button } from "../../../ui/button";
import { useFlexibleEvent } from "@/contexts/FlexibleEventContext";
import { deleteFlexibleEvent } from "@/lib/api";

const DeleteFlexibleEvDialog = () => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { flexibleEvent } = useFlexibleEvent();

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteFlexibleEvent(flexibleEvent.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex w-full items-center justify-start gap-1 bg-transparent px-[16px] py-[8px] text-sm text-bone-white shadow-none">
        <Image src="/icons/delete.svg" width={18} height={18} alt="Delete" />
        Delete
      </DialogTrigger>
      <DialogContent className="bg-blue-dark p-[25px]">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete the event.
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

export default DeleteFlexibleEvDialog;
