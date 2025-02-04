"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daysOfWeek } from "@/constants/daysOfWeek";
import type React from "react";
import { Suspense, useState } from "react";
import DayActivities from "./DayActivities";
import { addDays, format, startOfWeek } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DayTabs = () => {
  const today = new Date();
  const todayName = format(today, "EEEE");
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // get this week's Monday

  const [selectedDay, setSelectedDay] = useState(todayName);

  return (
    <Tabs value={selectedDay} onValueChange={setSelectedDay}>
      <div className="hidden items-center justify-between sm:flex">
        <TabsList className="h-[50px] bg-blue-dark p-[8px]">
          {daysOfWeek.map((day, index) => {
            const date = addDays(startOfThisWeek, index);

            return (
              <TabsTrigger
                key={day}
                value={day}
                className="group py-[8px] text-xl text-bone-white data-[state=active]:bg-orange-act data-[state=active]:text-bone-white"
              >
                <div className="flex flex-col items-center">
                  <span>{day.slice(0, 3)}</span>
                  <span className="text-sm text-slate-500 group-data-[state=active]:text-bone-white">
                    {format(date, "d MMM")}
                  </span>
                </div>
              </TabsTrigger>
            );
          })}
        </TabsList>
        <div className="cursor-pointer rounded-md border-2 border-orange-act p-[10px] text-xl text-orange-act">
          Modify
        </div>
      </div>

      {/* Mobile View */}
      <div className="flex items-center justify-between sm:hidden">
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <SelectTrigger className="w-[180px] border-none bg-orange-act text-xl text-bone-white">
            <SelectValue placeholder="Select Day" />
          </SelectTrigger>
          <SelectContent className="border-none bg-blue-dark text-bone-white">
            {daysOfWeek.map((day, index) => {
              const date = addDays(startOfThisWeek, index);

              return (
                <SelectItem key={day} value={day}>
                  {day}
                  {", "}
                  <span className="text-sm">{format(date, "d MMM")}</span>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <div className="cursor-pointer rounded-md border-2 border-orange-act p-[10px] text-center text-xl text-orange-act">
          Modify
        </div>
      </div>

      {daysOfWeek.map((day) => (
        <TabsContent key={day} value={day}>
          <Suspense fallback={<div>Loading {day} Activities...</div>}>
            <DayActivities day={day} />
          </Suspense>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default DayTabs;
