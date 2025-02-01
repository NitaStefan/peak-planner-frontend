import { getGoals, getGoalSteps } from "@/lib/api";
import React from "react";

const GoalPage = async ({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) => {
  const slug = (await params).slug;
  const id = slug?.length ? Number(slug[0]) : (await getGoals())[0]?.id; // the cached goals

  const steps = await getGoalSteps(id);

  return id && steps.map((step) => <p key={step.id}>{step.title}</p>);
};

export default GoalPage;
