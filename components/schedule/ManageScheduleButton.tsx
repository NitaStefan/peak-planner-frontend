import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import ROUTES from "@/constants/routes";

const ManageScheduleButton = () => {
  return (
    <Button
      asChild
      className="bg-orange-act text-lg max-md:h-[32px] max-md:px-[12px] max-md:text-base"
    >
      <Link href={ROUTES.MANAGE_SCHEDULE}>Manage Schedule</Link>
    </Button>
  );
};

export default ManageScheduleButton;
