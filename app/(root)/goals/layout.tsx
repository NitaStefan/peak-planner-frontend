import GoalsCollapsible from "@/components/goals/GoalsCollapsible";
import { getGoals } from "@/lib/api";
import { ReactNode } from "react";

const GoalLayout = async ({ children }: { children: ReactNode }) => {
  const goals = await getGoals();
  console.log("Hello - GoalLayout");

  return (
    <div>
      {goals.length ? (
        <GoalsCollapsible goals={goals} />
      ) : (
        <div>
          Presentation (Able to add first goal) - include add Goal dialog
        </div>
      )}

      <div className="py-[30px]">{children}</div>
    </div>
  );
};

export default GoalLayout;
