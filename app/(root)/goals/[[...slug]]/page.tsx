import StepActions from "@/components/goals/crud-actions/StepActions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { getGoals, getGoalSteps } from "@/lib/api";
import { formatDate4M2d4y } from "@/lib/format";
import { calculateProgress, subtractDaysFromDate } from "@/lib/timeHelpers";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const GoalPage = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const slug = (await params).slug;
  const id = slug?.length ? Number(slug[0]) : (await getGoals())[0]?.id; // the cached goals

  const steps = await getGoalSteps(id);

  const activeStep = steps.find((step) => step.isActive);
  const defaultActiveValue = activeStep ? `item-${activeStep.id}` : undefined;

  let beforeActive = true;
  const isGoalStarted =
    subtractDaysFromDate(steps[0].endDate, steps[0].days) < new Date();

  return (
    id && (
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultActiveValue}
        className="flex flex-col gap-y-[50px] pl-[15px]"
      >
        {steps.map((step) => {
          let progress = beforeActive && isGoalStarted ? 100 : 0;

          if (step.isActive) {
            beforeActive = false;
            progress = calculateProgress(step.endDate, step.days);
          }

          return (
            <AccordionItem
              key={step.id}
              value={`item-${step.id}`}
              className="px relative rounded-md bg-blue-dark"
            >
              <AccordionTrigger className="text-lg">
                <span
                  className={cn(
                    step.isActive && "border-b-2 border-orange-sec",
                  )}
                >
                  {step.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex justify-between gap-[10px] font-karla text-base">
                <div>{step.description}</div>
                <StepActions />
              </AccordionContent>
              <span className="absolute left-[6px] top-[2px] text-sm text-slate-500">{`${step.orderIndex} )`}</span>
              <div className="absolute left-0 flex translate-y-[5px] items-center gap-[3px] text-sm">
                <Image
                  src="/icons/calendar.svg"
                  width={16}
                  height={16}
                  alt="Goal Start Date"
                />
                {formatDate4M2d4y(new Date(step.endDate).toISOString())}
                <div className="absolute flex translate-x-[140px] gap-x-[3px] rounded-full border-2 border-slate-500 px-[6px] text-slate-500">
                  <Image
                    src="/icons/duration-slate.svg"
                    width={15}
                    height={15}
                    alt="Duration"
                  />
                  {`${step.days} day${step.days > 1 ? "s" : ""}`}
                </div>
              </div>
              <Progress
                className="absolute left-[-15px] top-0 h-[calc(100%+25px)]"
                value={progress}
              />
            </AccordionItem>
          );
        })}
      </Accordion>
    )
  );
};

export default GoalPage;
