import React from "react";
import Time from "./Time";
import { cn } from "@/lib/utils";
import { TEventDetails } from "@/lib/validations";
import EditDeleteDetails from "./EditDeleteDetails";
import { deleteEventDetail } from "@/lib/api";
// Either pass both setToBeUpdated and onDelete or none
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
        className={cn(
          "relative flex justify-between rounded-md bg-blue-dark p-[20px] max-sm:p-[15px]",
          (detail.startTime || detail.minutes) && "pb-[25px] max-sm:pb-[25px]",
        )}
      >
        <div>
          <h2 className="text-lg">{detail.title}</h2>
          <Time startTime={detail.startTime} minutes={detail.minutes} />
          <div className="pt-[10px] font-karla">{detail.description}</div>
        </div>
        {!!setToBeUpdated && (
          <EditDeleteDetails
            onUpdate={() =>
              setToBeUpdated({
                index: index,
                initEventDetails: detail,
              })
            }
            onDelete={() => {
              onDelete(index);
              if (detail.id) deleteEventDetail(detail.id);
            }}
          />
        )}
      </div>
    );
  });
};

export default EventDetails;
