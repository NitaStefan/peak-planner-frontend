"use client";

import { TPlannedEvent } from "@/lib/validations";
import React, { createContext, ReactNode, useContext } from "react";

type PlannedEventContextType = {
  plannedEvent: TPlannedEvent & { id: number };
  otherDates: Date[];
};

const PlannedEventContext = createContext<PlannedEventContextType | null>(null);

export const PlannedEventContextProvider = ({
  children,
  plannedEvent,
  otherDates,
}: PlannedEventContextType & { children: ReactNode }) => {
  return (
    <PlannedEventContext.Provider value={{ plannedEvent, otherDates }}>
      {children}
    </PlannedEventContext.Provider>
  );
};

export const usePlannedEvent = () => {
  const context = useContext(PlannedEventContext);
  if (!context) {
    throw new Error(
      "usePlannedEvent must be used within a PlannedEventProvider",
    );
  }
  return context;
};
