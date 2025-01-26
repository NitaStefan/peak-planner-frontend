import EventDetails from "@/components/events/planned-events/EventDetails";
import { Button } from "@/components/ui/button";
import { TEventDetails } from "@/lib/validations";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  eventDetails: TEventDetails[];
  setToBeUpdated: Dispatch<
    SetStateAction<{
      index: number | null;
      initEventDetails?: TEventDetails;
    }>
  >;
  onDelete: (indexToRemove: number) => void;
};

const EventDetailsManger = (props: Props) => {
  return (
    <div className="pb-[20px]">
      <div className="flex max-h-[470px] flex-col gap-y-[12px] overflow-y-auto pb-[12px] max-sm:max-h-[350px]">
        <EventDetails {...props} />
      </div>
      <div className="px pt-[12px]">
        <Button
          onClick={() => props.setToBeUpdated({ index: -1 })}
          className="w-full border-2 border-orange-act text-base text-orange-act"
        >
          Add Other Event Details
        </Button>
      </div>
    </div>
  );
};

export default EventDetailsManger;
