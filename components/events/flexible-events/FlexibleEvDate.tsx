"use client";

import { formatFlexibleEventDate } from "@/lib/format";

const FlexibleEvDate = ({ date }: { date: Date }) => {
  return (
    <span className="text-xl max-sm:text-lg">
      {formatFlexibleEventDate(date)}
    </span>
  );
};

export default FlexibleEvDate;
