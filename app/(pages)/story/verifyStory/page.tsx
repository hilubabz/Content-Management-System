"use client";

import { VerifyStoryTable } from "@/components/Story/VerifyStory/VerifyStoryTable";
import { Input } from "@/components/ui/input";
import { useFetchPost } from "@/hooks/Dashboard/useFetchPost";
import { Search } from "lucide-react";

interface DataType {
  _id: string;
  articleTitle: string;
  createdAt: string;
  author: {
    _id: string;
    name: string;
    profilePicture: string;
  };
  verifiedBy: string;
  category: string;
  status: string;
}

export default function Page() {
  const { data, isLoading } = useFetchPost();

  const filteredData =
    !isLoading &&
    (data.data as DataType[]).filter((val) => val.status === "pending");

  return isLoading ? (
    <div>Loading...</div>
  ) : data.message === "Unauthorized" ? (
    <div className="w-full text-center text-red-500">
      You are not authorized to access this page
    </div>
  ) : (
    <div className="px-5">
      <div className="flex justify-between py-5 border-b">
        <div className="text-lg font-semibold text-blue-700">Verify Story</div>
        <div className="flex gap-5">
          <div className="flex items-center border px-2 rounded-lg">
            <Input
              placeholder="Search by Text or ID"
              className="w-[250px] border-none bg-transparent shadow-none"
            />
            <Search />
          </div>
        </div>
      </div>
      <VerifyStoryTable data={filteredData || []} />
    </div>
  );
}
