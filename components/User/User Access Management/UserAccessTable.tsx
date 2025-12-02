"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil } from "lucide-react";

const data = [
  {
    id: 1,
    role: "Admin",
    pages: "All Page",
  },
  {
    id: 2,
    role: "Sub Admin",
    pages:
      "Add Story, View Story, View Schedule Story, Add Priority, Contact List",
  },
  {
    id: 3,
    role: "Editor",
    pages: "Add Story, View Story, View Schedule Story",
  },
];

interface DataType {
  id: number;
  role: string;
  pages: string;
}

export const UserAccessTable = () => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("role", { header: "Role" }),
    columnHelper.accessor("pages", { header: "Pages" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: (_info) => {
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

  return (
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
  );
};
