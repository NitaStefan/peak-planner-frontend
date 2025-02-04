"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import type React from "react";
import { useState } from "react";

const EventTabs = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //on mount use initial value, then update immediately
  const [activeTab, setActiveTab] = useState(
    searchParams.get("type") === "flexible" ? "flexible" : "planned",
  );

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("type", value);
    router.push(`/events?${params.toString()}`, { scroll: false });
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange}>
      <TabsList className="h-[50px] bg-blue-dark p-[8px]">
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
