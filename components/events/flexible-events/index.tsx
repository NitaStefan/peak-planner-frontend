import { getFlexibleEvents } from "@/lib/api";
import React from "react";

const FlexibleEvents = async () => {
  const flexibleEvents = await getFlexibleEvents();

  return <div>{JSON.stringify(flexibleEvents)}</div>;
};

export default FlexibleEvents;
