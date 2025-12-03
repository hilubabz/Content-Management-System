"use client";

import { useStatus } from "@/context/Dashboard/StatusContext";
import { formatDate } from "@/lib/formatDate";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useMemo } from "react";

interface AuthorType {
  _id: string;
  name: string;
  profilePicture: string;
}

interface DataType {
  _id: number;
  articleTitle: string;
  createdAt: string;
  author: AuthorType;
  verifiedBy: string;
  category: string;
  status: string;
}

export const Table = ({ tableData }: { tableData: DataType[] }) => {
  const { status, category, startDate, endDate, getData } = useStatus();
  console.log(startDate, endDate);
  const initialData = useMemo(() => {
    if (status === "all") return tableData;

    return tableData.filter(
      (val) => val.status.toLowerCase() === status.toLowerCase(),
    );
  }, [tableData, status]);

  const data = useMemo(() => {
    if (category === "all" && startDate && endDate)
      return initialData.filter(
        (val) =>
          formatDate(val.createdAt) >= formatDate(startDate as Date) &&
          formatDate(val.createdAt) <= formatDate(endDate as Date),
      );
    else if (category !== "all" && startDate && endDate)
      return initialData.filter(
        (val) =>
          formatDate(val.createdAt) >= formatDate(startDate as Date) &&
          formatDate(val.createdAt) <= formatDate(endDate as Date) &&
          val.category === category,
      );
    else return initialData;
  }, [getData, tableData]);

  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("_id", { header: "ID" }),
    columnHelper.accessor("articleTitle", { header: "Title" }),
    columnHelper.accessor("author", {
      header: "Author",
      cell: (info) => <div>{info.getValue().name}</div>,
    }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.accessor("createdAt", {
      header: "Publish Date",
      cell: (info) => <div>{formatDate(info.getValue())}</div>,
    }),
    columnHelper.accessor("verifiedBy", {
      header: "Verified By",
      cell: (info) => {
        console.log(info.getValue());
        if (info.getValue() != "") {
          return <div>{info.getValue()}</div>;
        } else {
          return <div>-</div>;
        }
      },
    }),
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
