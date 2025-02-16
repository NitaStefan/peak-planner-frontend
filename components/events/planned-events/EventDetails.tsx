import React from "react";
import { cn } from "@/lib/utils";
import { TEventDetails } from "@/lib/validations";
import EditDeleteDetails from "./crud-actions/EditDeleteDetails";
import Time from "./Time";
// Either pass all the optional props or none of them at all
type EventDetailsProps =
  | {
      eventDetails: TEventDetails[];
      setToBeUpdated: React.Dispatch<
        React.SetStateAction<{
          index: number | null;
          initEventDetails?: TEventDetails;
        }>
      >;
      onDelete: (indexToRemove: number) => void;
    }
  | {
      eventDetails: TEventDetails[];
      setToBeUpdated?: undefined;
      onDelete?: undefined;
    };

const EventDetails = ({
  eventDetails,
  setToBeUpdated,
  onDelete,
}: EventDetailsProps) => {
  return eventDetails.map((detail, index) => {
    return (
      <div
        key={index}
        className="px relative flex justify-between rounded-md bg-blue-dark py-[20px]"
      >
        <div>
          <h2
            className={cn(
              "text-lg",
              !!setToBeUpdated && "w-[380px] truncate max-sm:w-[260px]",
            )}
          >
            {detail.title}
          </h2>
          <Time startTime={detail.startTime} minutes={detail.minutes} />
          <div
            className={cn(
              "pt-[10px] font-karla",
              !!setToBeUpdated && "w-[380px] truncate max-sm:w-[260px]",
              !setToBeUpdated && "whitespace-pre-line",
            )}
          >
            {detail.description}
          </div>
        </div>
        {!!setToBeUpdated && (
          <EditDeleteDetails
            onUpdate={() =>
              setToBeUpdated({
                index: index,
                initEventDetails: detail,
              })
            }
            onDelete={() => onDelete(index)}
          />
        )}
      </div>
    );
  });
};

export default EventDetails;
