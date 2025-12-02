import { Input } from "@/components/ui/input";
import { UserAccessTable } from "@/components/User/User Access Management/UserAccessTable";
import { Search } from "lucide-react";

export default function Page() {
  return (
    <div className="px-5">
      <div className="flex justify-between py-5 border-b">
        <div className="text-lg font-semibold text-blue-700">
          User Access Management
        </div>

        <div className="flex items-center border px-2 rounded-lg">
          <Input
            placeholder="Search by Text or ID"
            className="w-[250px] border-none bg-transparent shadow-none"
          />
          <Search />
        </div>
      </div>

      <UserAccessTable />
    </div>
  );
}
