import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { DatePicker } from "./DatePicker";
import { SelectComponent } from "./SelectComponent";

const data = ["All", "Story", "News", "Blog", "Food", "Biography"];

export const Filter = () => {
  return (
    <div className="flex items-end gap-5 mt-5">
      <div className="space-y-2">
        <Label htmlFor="startData">Start Date</Label>
        <DatePicker />
      </div>
      <div className="space-y-2">
        <Label htmlFor="endDate">End Date</Label>
        <DatePicker />
      </div>
      <div className="space-y-2">
        <Label htmlFor="type">Content Type</Label>
        <SelectComponent data={data} defaultValue="all" />
      </div>
      <Button variant={"secondary"} className="bg-blue-900 text-white">
        Get Data
      </Button>
    </div>
  );
};
