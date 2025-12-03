"use client";

import { Data } from "@/components/Dashboard/Data";
import { Filter } from "@/components/Dashboard/Filter";
import { Table } from "@/components/Dashboard/Table";
import { TopNav } from "@/components/Dashboard/TopNav";
import { StatusProvider, useStatus } from "@/context/Dashboard/StatusContext";
import { useFetchPost } from "@/hooks/Dashboard/useFetchPost";

export default function Page() {
  const { data, isLoading } = useFetchPost();
  return isLoading ? (
    <div>Loading....</div>
  ) : data.message == "Unauthorized" ? (
    <div className="w-full text-center text-red-500">
      You are not authorized to access this page
    </div>
  ) : (
    <StatusProvider>
      <div className="w-full px-5">
        <TopNav />
        <Filter />
        <Data data={data?.data ?? []} />
        <Table tableData={data?.data ?? []} />
      </div>
    </StatusProvider>
  );
}
