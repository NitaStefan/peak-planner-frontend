import EventTabs from "@/components/events/EventTabs";
import FlexibleEvents from "@/components/events/flexible-events";
import PlannedEvents from "@/components/events/planned-events";
import { TabsContent } from "@/components/ui/tabs";
import React, { Suspense } from "react";

const Page = ({ searchParams }: { searchParams: { type?: string } }) => {
  const defaultValue =
    searchParams.type === "flexible" ? "flexible" : "planned";
  return (
    <EventTabs defaultValue={defaultValue}>
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
    </EventTabs>
  );
};

export default Page;
