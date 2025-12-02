"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import Image from "next/image";

interface DataType {
  _id: string;
  name: string;
  username: string;
  email: string;
  profilePicture: string;
  role: string;
  createdAt: Date;
}

export const AdminUserListTable = ({ data }: { data: DataType[] }) => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("_id", { header: "ID" }),
    columnHelper.accessor("profilePicture", {
      header: "Profile Picture",
      cell: (info) => (
        <div className="relative h-25 w-25 rounded-full overflow-hidden">
          <Image
            src={info.getValue()}
            alt="profilePicture"
            fill
            className="h-full w-full object-cover"
          />
        </div>
      ),
    }),
    columnHelper.accessor("name", { header: "Name" }),
    columnHelper.accessor("username", { header: "Username" }),
    columnHelper.accessor("email", { header: "Email" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("createdAt", {
      header: "Joined At",
      cell: (info) => (
        <div>{new Date(info.getValue()).toLocaleDateString()}</div>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => {
        return (
          <div className="flex justify-center">
            <Pencil />
          </div>
        );
      },
    }),
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return data.length > 0 ? (
    <table className="min-w-full border border-gray-500 mt-5">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="p-2 border-b border-r">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="p-2 border-b border-r text-center whitespace-nowrap"
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>No Admins Found</div>
  );
};
