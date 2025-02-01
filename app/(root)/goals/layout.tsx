import GoalsCollapsible from "@/components/goals/GoalsCollapsible";
import { getGoals } from "@/lib/api";
import { ReactNode } from "react";

const GoalLayout = async ({ children }: { children: ReactNode }) => {
  const goals = await getGoals();

  return (
    <div>
      {goals.length ? (
        <GoalsCollapsible goals={goals} />
      ) : (
        <div>Presentation (Able to add first goal)</div>
      )}

      <div className="py-[30px]">{children}</div>
    </div>
  );
};

export default GoalLayout;
