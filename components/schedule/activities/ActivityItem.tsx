import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { TActivityRes } from "@/lib/validations";
import React from "react";
import TimeInterval from "./TimeInterval";
import ImpactIndicator from "@/components/ImpactIndicator";
import GoalTitle from "./GoalTitle";
import Image from "next/image";

const ActivityItem = ({
  activity,
  isDayActive = false,
  onEdit,
}: {
  activity: TActivityRes;
  isDayActive?: boolean;
  onEdit?: () => void;
}) => {
  const isCurrentActivity = activity.isActive && isDayActive;

  return (
    <AccordionItem
      value={`item-${activity.id}`}
      className="px relative rounded-md bg-blue-dark"
    >
      <AccordionTrigger className="text-lg">
        <span
          className={cn(
            isCurrentActivity &&
              "rounded-b-xl border-b-[4px] border-orange-act px-[6px]",
          )}
        >
          {activity.title}
        </span>
        {onEdit && (
          <div
            onClick={(event) => {
              event.stopPropagation();
              onEdit();
            }}
            className="ml-auto mr-[10px] flex items-center gap-x-[3px] rounded-md border-2 border-orange-act px-[5px] py-[2px] text-base text-orange-act"
          >
            <Image
              src="/icons/edit-act.svg"
              width={18}
              height={18}
              alt="Edit"
            />
            Edit
          </div>
        )}
      </AccordionTrigger>
      <AccordionContent className="whitespace-pre-line font-karla text-base">
        {activity.description}
      </AccordionContent>
      <TimeInterval
        startTime={activity.startTime}
        endTime={activity.endTime}
        isCurrentActivity={isCurrentActivity || !!onEdit}
        duration={activity.minutes}
      />
      <GoalTitle title={activity.goalTitle} />
      <ImpactIndicator impact={activity.impact} />
    </AccordionItem>
  );
};

export default ActivityItem;
