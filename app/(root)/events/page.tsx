import EventTabs from "@/components/events/EventTabs";
import FlexibleEvents from "@/components/events/flexible-events";
import PlannedEvents from "@/components/events/planned-events";
import Loading from "@/components/Loading";
import { TabsContent } from "@/components/ui/tabs";
import { convertTimeToISO } from "@/lib/format";
import React, { Suspense } from "react";

const Page = () => {
  console.log(convertTimeToISO("13:00"));

  return (
    <EventTabs>
      <div className="relative py-[20px]">
        <TabsContent value="planned">
          <Suspense fallback={<Loading />}>
            <PlannedEvents />
          </Suspense>
        </TabsContent>
        <TabsContent value="flexible">
          <Suspense fallback={<Loading />}>
            <FlexibleEvents />
          </Suspense>
        </TabsContent>
      </div>
    </EventTabs>
  );
};

export default Page;
