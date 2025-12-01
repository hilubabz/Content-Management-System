"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const data = [
  {
    id: 12345,
    title: "Hello there",
    publishDate: "2025-10-20",
    author: "Utsarga",
    verifiedBy: "Utsarga",
    category: "story",
    status: "verified",
  },
];

interface DataType {
  id: number;
  title: string;
  publishDate: string;
  author: string;
  verifiedBy: string;
  category: string;
  status: string;
}

export const Table = () => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("id", { header: "ID" }),
    columnHelper.accessor("title", { header: "Title" }),
    columnHelper.accessor("author", { header: "Author" }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("publishDate", { header: "Publish Date" }),
    columnHelper.accessor("verifiedBy", { header: "Verified By" }),
    columnHelper.accessor("status", { header: "Status" }),
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
