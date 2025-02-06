import { TActivityRes } from "@/lib/validations";
import React from "react";

const Activities = ({ activities }: { activities: TActivityRes[] }) => {
  return (
    <div className="">
      <h1 className="bg-orange-act text-xl">Activities component</h1>
      {JSON.stringify(activities)}
    </div>
  );
};

export default Activities;
