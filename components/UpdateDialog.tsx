import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import React from "react";

const UpdateDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center justify-start gap-1 bg-transparent px-[16px] py-[8px] text-sm text-bone-white shadow-none">
        <Image src="icons/edit.svg" width={18} height={18} alt="Edit" />
        Edit
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="hidden">Are you sure?</DialogTitle>
        </DialogHeader>
        <DialogFooter>{children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
