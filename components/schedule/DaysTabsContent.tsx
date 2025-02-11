import React, { Suspense } from "react";
import { TabsContent } from "../ui/tabs";
import MondayActivities from "./days/MondayActivities";
import TuesdayActivities from "./days/TuesdayActivities";
import WednesdayActivities from "./days/WednesdayActivities";
import ThursdayActivities from "./days/ThursdayActivities";
import FridayActivities from "./days/FridayActivities";
import SaturdayActivities from "./days/SaturdayActivities";
import SundayActivities from "./days/SundayActivities";
import Loading from "../Loading";

const DaysTabsContent = () => {
  return (
    <div className="py-[40px]">
      <TabsContent value="Monday">
        <Suspense fallback={<Loading />}>
          <MondayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Tuesday">
        <Suspense fallback={<Loading />}>
          <TuesdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Wednesday">
        <Suspense fallback={<Loading />}>
          <WednesdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Thursday">
        <Suspense fallback={<Loading />}>
          <ThursdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Friday">
        <Suspense fallback={<Loading />}>
          <FridayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Saturday">
        <Suspense fallback={<Loading />}>
          <SaturdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Sunday">
        <Suspense fallback={<Loading />}>
          <SundayActivities />
        </Suspense>
      </TabsContent>
    </div>
  );
};

export default DaysTabsContent;
