import FlexibleEvents from "@/components/events/flexible-events";
import PlannedEvents from "@/components/events/planned-events";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Tabs defaultValue="planned">
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
      <div className="relative py-[20px]">
        <TabsContent value="planned">
          <Suspense fallback={<div>Loading Planned Events..</div>}>
            <PlannedEvents />
          </Suspense>
        </TabsContent>
        <TabsContent value="flexible">
          <Suspense fallback={<div>Loading Flexible Events..</div>}>
            <FlexibleEvents />
          </Suspense>
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default Page;
