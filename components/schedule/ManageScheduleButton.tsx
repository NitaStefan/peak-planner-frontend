import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const ManageScheduleButton = () => {
  return (
    <Button
      asChild
      className="bg-orange-act text-lg max-sm:h-[32px] max-sm:px-[12px] max-sm:text-base"
    >
      <Link href={ROUTES.MANAGE_SCHEDULE}>Manage Schedule</Link>
    </Button>
  );
};

export default ManageScheduleButton;
