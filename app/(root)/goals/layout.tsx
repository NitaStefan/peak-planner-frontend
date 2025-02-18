import AddGoalDialog from "@/components/goals/crud-actions/AddGoalDialog";
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
        <AddGoalDialog firstGoal />
      )}

      <div className="py-[30px]">{children}</div>
    </div>
  );
};

export default GoalLayout;
