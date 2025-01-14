import PlannedEvents from "@/components/PlannedEvents";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <>
      <h1 className="text-2xl">Planned Events</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <PlannedEvents />
      </Suspense>

      <h1 className="text-2xl">Flexible Events</h1>
    </>
  );
};

export default Page;
