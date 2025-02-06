import React, { Suspense } from "react";
import { TabsContent } from "../ui/tabs";
import MondayActivities from "./days/MondayActivities";
import TuesdayActivities from "./days/TuesdayActivities";
import WednesdayActivities from "./days/WednesdayActivities";
import ThursdayActivities from "./days/ThursdayActivities";
import FridayActivities from "./days/FridayActivities";
import SaturdayActivities from "./days/SaturdayActivities";
import SundayActivities from "./days/SundayActivities";

const DaysTabsContent = () => {
  return (
    <>
      <TabsContent value="Monday">
        <Suspense fallback={<div>Loading Monday Activities...</div>}>
          <MondayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Tuesday">
        <Suspense fallback={<div>Loading Tuesday Activities...</div>}>
          <TuesdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Wednesday">
        <Suspense fallback={<div>Loading Wednesday Activities...</div>}>
          <WednesdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Thursday">
        <Suspense fallback={<div>Loading Thursday Activities...</div>}>
          <ThursdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Friday">
        <Suspense fallback={<div>Loading Friday Activities...</div>}>
          <FridayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Saturday">
        <Suspense fallback={<div>Loading Saturday Activities...</div>}>
          <SaturdayActivities />
        </Suspense>
      </TabsContent>
      <TabsContent value="Sunday">
        <Suspense fallback={<div>Loading Sunday Activities...</div>}>
          <SundayActivities />
        </Suspense>
      </TabsContent>
    </>
  );
};

export default DaysTabsContent;
