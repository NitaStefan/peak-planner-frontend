"use client";

import { TGoalResponse } from "@/lib/validations";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CurrentGoalActions from "./crud-actions/CurrentGoalActions";
import { formatDate4M2d4y } from "@/lib/format";

const GoalsCollapsible = ({ goals }: { goals: TGoalResponse[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // state that rerenders on pathname change

  const pathSegments = pathname.split("/").filter(Boolean);
  const goalIdFromPath =
    pathSegments.length > 1 ? Number(pathSegments[1]) : null;

  const currentGoal =
    goals.find((goal) => goal.id === goalIdFromPath) ?? goals[0];

  const otherGoals = goals.filter((goal) => goal.id !== currentGoal?.id);

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
            <span className="rounded-md bg-orange-sec px-[12px] py-[4px] text-xl">
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
              <span>
                {formatDate4M2d4y(
                  new Date(currentGoal.startDate).toISOString(),
                )}
              </span>
            </div>
          </div>
          <ChevronsUpDown className="h-[18px] w-[18px]" />
        </CollapsibleTrigger>
        <CollapsibleContent className="absolute z-[1000] w-full rounded-xl border-2 border-slate-500 bg-blue-darker p-[8px]">
          {otherGoals.map((goal) => (
            <Button
              className="mx-auto w-[calc(100%-18px)] rounded-md px-[12px] py-[4px] text-lg shadow-none"
              key={goal.id}
              onClick={() => {
                setIsOpen(false);
                router.push(`/goals/${goal.id}`);
              }}
            >
              {goal.title}
            </Button>
          ))}
          {goals.length === 1 && (
            <div className="mx-auto w-fit">There are no other goals...</div>
          )}
        </CollapsibleContent>
      </Collapsible>
      <CurrentGoalActions goal={currentGoal} />
    </>
  );
};

export default GoalsCollapsible;
