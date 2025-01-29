"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";

interface EventTabsProps {
  defaultValue: "planned" | "flexible";
  children: React.ReactNode;
}

const EventTabs: React.FC<EventTabsProps> = ({ defaultValue, children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    router.push(`/events?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs defaultValue={defaultValue} onValueChange={handleTabChange}>
      <TabsList className="h-[50px] bg-blue-dark">
        <TabsTrigger
          value="planned"
          className="text-xl text-bone-white data-[state=active]:bg-orange-act data-[state=active]:text-bone-white"
        >
          Planned Events
        </TabsTrigger>
        <TabsTrigger
          value="flexible"
          className="text-xl text-bone-white data-[state=active]:bg-orange-act data-[state=active]:text-bone-white"
        >
          Flexible Events
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default EventTabs;
