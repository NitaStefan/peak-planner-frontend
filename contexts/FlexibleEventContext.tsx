"use client";

import { TFlexibleEvent } from "@/lib/validations";
import React, { createContext, ReactNode, useContext } from "react";

type FlexibleEventContextType = {
  flexibleEvent: TFlexibleEvent & { id: number };
};

const FlexibleEventContext = createContext<FlexibleEventContextType | null>(
  null,
);

export const FlexibleEventContextProvider = ({
  children,
  flexibleEvent,
}: FlexibleEventContextType & { children: ReactNode }) => {
  return (
    <FlexibleEventContext.Provider value={{ flexibleEvent }}>
      {children}
    </FlexibleEventContext.Provider>
  );
};

export const useFlexibleEvent = () => {
  const context = useContext(FlexibleEventContext);
  if (!context) {
    throw new Error(
      "useFlexibleEvent must be used within a FlexibleEventProvider",
    );
  }
  return context;
};
