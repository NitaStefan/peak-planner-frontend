import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer2, Trash2 } from "lucide-react";

const SelectDeleteTabs = ({
  setIsDeleting,
  isDeleting,
  removeSelectedActivity,
}: {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleting: boolean;
  removeSelectedActivity?: () => void;
}) => {
  return (
    <Tabs
      value={isDeleting ? "delete" : "select"}
      className="flex grow flex-row-reverse justify-end rounded-md bg-blue-dark p-[10px] pl-[20px] max-sm:pl-[10px]"
    >
      {removeSelectedActivity && (
        <Button
          onClick={removeSelectedActivity}
          className="ml-[20px] border-2 border-red-400 px-[5px] text-xs text-red-400 max-sm:ml-[10px]"
        >
          Remove <br /> selected
        </Button>
      )}
      <TabsList className="bg-blue-darker">
        <TabsTrigger
          value="select"
          className="px-[6px] py-[3px] data-[state=active]:bg-blue-medium"
          onClick={() => setIsDeleting(false)}
        >
          <MousePointer2 size={20} className="text-bone-white" />
        </TabsTrigger>
        <TabsTrigger
          value="delete"
          className="ml-[5px] px-[6px] py-[3px] data-[state=active]:bg-red-400"
          onClick={() => setIsDeleting(true)}
        >
          <Trash2 size={20} className="text-bone-white" />
        </TabsTrigger>
      </TabsList>
      <TabsContent value="select" className="w-[125px]">
        Select an Activity
      </TabsContent>
      <TabsContent value="delete" className="w-[125px]">
        Delete Activities
      </TabsContent>
    </Tabs>
  );
};

export default SelectDeleteTabs;
