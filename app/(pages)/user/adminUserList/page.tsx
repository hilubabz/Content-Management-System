"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AdminUserListTable } from "@/components/User/AdminUserList/AdminUserListTable";
import { useFetchAllUser } from "@/hooks/User/useFetchAllUser";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

interface DataType {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  role: string;
  createdAt: Date;
}

export default function Page() {
  const { data, isLoading } = useFetchAllUser();
  const authorized = !isLoading && data?.message !== "Unauthorized";
  const filteredData =
    !isLoading && data?.message !== "Unauthorized"
      ? data.data.filter((val: DataType) => val.role === "admin")
      : [];

  return isLoading ? (
    <div>Loading...</div>
  ) : authorized ? (
    <div className="px-5">
      <div className="flex justify-between py-5 border-b">
        <div className="text-lg font-semibold text-blue-700">
          User Access Management
        </div>

        <div className="flex gap-5">
          <div className="flex items-center border px-2 rounded-lg">
            <Input
              placeholder="Search by Text or ID"
              className="w-[250px] border-none bg-transparent shadow-none"
            />
            <Search />
          </div>
          <Button className="bg-blue-900 text-white">+ Add Admin</Button>
        </div>
      </div>

      <AdminUserListTable data={filteredData} />
    </div>
  ) : (
    <div className="w-full flex justify-center">
      <div className="text-red-500">
        You are not authorized to access this page
      </div>
    </div>
  );
}
