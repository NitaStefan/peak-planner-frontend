import AddPlannedEvent from "@/components/Events/AddPlannedEvent";
import PlannedEvents from "@/components/Events/PlannedEvents";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Tabs defaultValue="planned">
      <TabsList className="h-[50px] bg-blue-dark">
        <TabsTrigger
          value="planned"
          className="text-2xl text-bone-white data-[state=active]:bg-orange-act data-[state=active]:text-bone-white"
        >
          Planned Events
        </TabsTrigger>
        <TabsTrigger
          value="flexible"
          className="text-2xl text-bone-white data-[state=active]:bg-orange-act data-[state=active]:text-bone-white"
        >
          Flexible Events
        </TabsTrigger>
      </TabsList>
      <TabsContent value="planned" className="max-sm:pt-[70px]">
        <div className="relative py-[20px]">
          <AddPlannedEvent />
          <Suspense fallback={<div>Loading...</div>}>
            <PlannedEvents />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="flexible" className="max-sm:pt-[70px]">
        Flexible Events Component
      </TabsContent>
    </Tabs>
  );
};

export default Page;
