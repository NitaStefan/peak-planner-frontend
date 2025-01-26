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
      <TabsContent value="planned">
        <div className="relative py-[20px]">
          <Suspense fallback={<div>Loading...</div>}>
            <PlannedEvents />
          </Suspense>
        </div>
      </TabsContent>
      <TabsContent value="flexible">
        <FlexibleEvents />
      </TabsContent>
    </Tabs>
  );
};

export default Page;
