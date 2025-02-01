import { getGoalSteps } from "@/lib/api";
import React from "react";

const Goal = async () => {
  // id from search params
  const steps = await getGoalSteps(2);

  return (
    <>
      <div>Goal with id {2}</div>
      <div>{JSON.stringify(steps)}</div>
    </>
  );
};

export default Goal;
