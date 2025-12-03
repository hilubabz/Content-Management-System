import { formatDate } from "@/lib/formatDate";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { DropDownComponent } from "./DropDownComponent";

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

export const VerifyStoryTable = ({ data }: { data: DataType[] }) => {
  const columnHelper = createColumnHelper<DataType>();
  const columns = [
    columnHelper.accessor("_id", { header: "ID" }),
    columnHelper.accessor("articleTitle", { header: "Title" }),
    columnHelper.accessor("createdAt", {
      header: "Publish Date",
      cell: (info) => {
        return <div>{formatDate(info.getValue())}</div>;
      },
    }),
    columnHelper.accessor("author", {
      header: "Author",
      cell: (info) => <div>{info.getValue().name}</div>,
    }),
    columnHelper.accessor("category", { header: "Category" }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const rowId = row.original._id;
        return <DropDownComponent id={rowId} />;
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
