import { Button } from "@/components/ui/button";
import React from "react";

const AddActivity = ({
  handleAddActivity,
}: {
  handleAddActivity: () => void;
}) => {
  return (
    <Button
      onClick={handleAddActivity}
      className="w-full border-[3px] border-orange-act text-base text-orange-act"
    >
      Add New Activity
    </Button>
  );
};

export default AddActivity;
