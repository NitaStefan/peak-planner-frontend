"use client";

import { TGoalResponse } from "@/lib/validations";
import { notFound, usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import Image from "next/image";
import CurrentGoalActions from "./crud-actions/CurrentGoalActions";

const GoalsCollapsible = ({ goals }: { goals: TGoalResponse[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // state that rerenders on pathname change

  const pathSegments = pathname.split("/").filter(Boolean);
  const goalIdFromPath =
    pathSegments.length > 1 ? Number(pathSegments[1]) : null;

  const potentialGoal = goals.find((goal) => goal.id === goalIdFromPath);
  if (goalIdFromPath !== null && !potentialGoal) notFound();

  const currentGoal = potentialGoal ?? goals[0];

  const otherGoals = goals.filter((goal) => goal.id !== currentGoal?.id);

  const formattedStartDate = currentGoal.startDate
    ? format(
        parseISO(new Date(currentGoal.startDate).toISOString()),
        "MMMM dd, yyyy",
      )
    : "Unknown Date";

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className={cn(
          "relative rounded-md bg-blue-dark",
          isOpen && "rounded-b-none",
        )}
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between px-[8px] pt-[8px]">
          <div className="mx-auto flex flex-col gap-y-[6px]">
            <span className="rounded-md bg-orange-act px-[12px] py-[4px] text-lg">
              {currentGoal.title}
            </span>
            <div className="flex items-center gap-[4px]">
              <span className="pr-[4px] text-slate-500">From</span>
              <Image
                src="/icons/calendar.svg"
                width={18}
                height={18}
                alt="Goal Start Date"
              />
              <span>{formattedStartDate}</span>
            </div>
          </div>
          <ChevronsUpDown className="h-[18px] w-[18px]" />
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute w-full rounded-b-md bg-blue-dark p-[8px]">
          {otherGoals.map((goal) => (
            <Button
              className="mx-auto w-[calc(100%-18px)] rounded-md px-[12px] py-[4px] text-lg"
              key={goal.id}
              onClick={() => {
                setIsOpen(false);
                router.push(`/goals/${goal.id}`);
              }}
            >
              {goal.title}
            </Button>
          ))}
        </CollapsibleContent>
      </Collapsible>
      <CurrentGoalActions />
    </>
  );
};

export default GoalsCollapsible;
