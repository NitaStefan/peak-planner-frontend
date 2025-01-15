import React from "react";

const Time = ({
  startTime,
  minutes,
}: {
  startTime?: string;
  minutes?: number;
}) => {
  return (
    <div>
      {startTime}
      {minutes}
    </div>
  );
};

export default Time;
