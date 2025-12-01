import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { SelectComponent } from "./SelectComponent";

const data = ["All", "Published", "Pending", "Planned", "Reject"];

export const TopNav = () => {
  return (
    <div className="flex justify-between py-5 border-b">
      <div className="text-lg font-semibold text-blue-700">Dashboard</div>
      <div className="flex gap-5">
        <div className="flex items-center border px-2 rounded-lg">
          <Input
            placeholder="Search by Text or ID"
            className="w-[250px] border-none bg-transparent shadow-none"
          />
          <Search />
        </div>
        <SelectComponent data={data} defaultValue="all" />
      </div>
    </div>
  );
};
