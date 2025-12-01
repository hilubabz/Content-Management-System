import { Data } from "@/components/Dashboard/Data";
import { Filter } from "@/components/Dashboard/Filter";
import { Table } from "@/components/Dashboard/Table";
import { TopNav } from "@/components/Dashboard/TopNav";

export default function Page() {
  return (
    <div className="w-full px-5">
      <TopNav />
      <Filter />
      <Data />
      <Table />
    </div>
  );
}
