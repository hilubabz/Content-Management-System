import { Crosshair, FileCheck, ShieldX, Watch } from "lucide-react";
import { useMemo } from "react";

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

export const Data = ({ data }: { data: DataType[] }) => {
  const mapData = useMemo(
    () => [
      {
        icon: FileCheck,
        title: "Published",
        background: "#5bb56f",
        iconFill: "#119C30",
        number: data.filter((val) => val.status === "published").length,
      },
      {
        icon: Watch,
        title: "Pending",
        background: "#f4b967",
        iconFill: "#BF6F00",
        number: data.filter((val) => val.status === "pending").length,
      },
      {
        icon: Crosshair,
        title: "Planned",
        background: "#69a0c7",
        iconFill: "#0072C6",
        number: data.filter((val) => val.status === "planned").length,
      },
      {
        icon: ShieldX,
        title: "Hold/Reject",
        background: "#ed9c9c",
        iconFill: "#ED1010",
        number: data.filter((val) => val.status === "reject").length,
      },
    ],
    [data],
  );
  return (
    <div className="grid grid-cols-4 gap-7 mt-5">
      {mapData.map((val, index) => (
        <div className="flex gap-4 border" key={index}>
          <div style={{ backgroundColor: val.background }} className="p-5">
            <val.icon fill={val.iconFill} color="white" size={50} />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-3xl font-bold">{val.number}</div>
            <div className="text-gray-500">{val.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
