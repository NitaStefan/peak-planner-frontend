"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { daysOfWeek } from "@/constants/daysOfWeek";
import type React from "react";
import { ReactNode, useState } from "react";
import { addDays, format, startOfWeek } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ManageScheduleButton from "./ManageScheduleButton";

const DayTabs = ({ children }: { children: ReactNode }) => {
  const today = new Date();
  const todayName = format(new Date(), "EEEE");
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
        <ManageScheduleButton />
      </div>

      {/* Mobile View */}
      <div className="flex items-center justify-between sm:hidden">
        <Select value={selectedDay} onValueChange={setSelectedDay}>
          <div className="rounded-md bg-blue-dark p-[6px]">
            <SelectTrigger className="h-[28px] w-[170px] border-none bg-orange-act px-[8px] text-xl text-bone-white">
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
          </div>
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
        <ManageScheduleButton />
      </div>

      {children}
    </Tabs>
  );
};

export default DayTabs;
