import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MousePointer2, Trash2 } from "lucide-react";

const SelectDeleteTabs = ({
  setIsDeleting,
}: {
  setIsDeleting: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Tabs
      defaultValue="select"
      className="flex flex-row-reverse rounded-md bg-blue-dark p-[10px] pl-[20px]"
    >
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
