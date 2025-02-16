import StepActions from "@/components/goals/crud-actions/StepActions";
import ImpactIndicator from "@/components/ImpactIndicator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { getGoals, getGoalSteps } from "@/lib/api";
import { formatDate4M2d4y } from "@/lib/format";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const GoalPage = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const slug = (await params).slug;
  const goalId = slug?.length ? Number(slug[0]) : (await getGoals())[0]?.id; // the cached goals

  if (!goalId) return null;

  const steps = await getGoalSteps(goalId);

  const activeStep = steps.find((step) => step.isActive);
  const defaultActiveValue = activeStep ? `item-${activeStep.id}` : undefined;

  console.log("Hello - GoalPage");

  return (
    goalId && (
      <Accordion
        type="single"
        collapsible
        defaultValue={defaultActiveValue}
        className="flex flex-col gap-y-[50px] pl-[15px]"
      >
        {steps.length ? (
          steps.map((step) => (
            <AccordionItem
              key={step.id}
              value={`item-${step.id}`}
              className="px relative rounded-md bg-blue-dark"
            >
              <AccordionTrigger className="text-lg">
                <span
                  className={cn(
                    "truncate max-sm:max-w-[270px]",
                    step.isActive &&
                      "rounded-b-xl border-b-[4px] border-orange-sec px-[6px]",
                  )}
                >
                  {step.title}
                </span>
              </AccordionTrigger>
              <AccordionContent className="flex justify-between gap-[10px] whitespace-pre-line font-karla text-base">
                <div>{step.description}</div>
                <StepActions step={step} numberOfSteps={steps.length} />
              </AccordionContent>
              <span className="absolute left-[6px] top-[1px] text-sm text-slate-500">{`${step.orderIndex} )`}</span>
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
                value={step.progress}
              />
              <ImpactIndicator impact={step.impact} />
            </AccordionItem>
          ))
        ) : (
          <div>No steps yet...</div>
        )}
      </Accordion>
    )
  );
};

export default GoalPage;
