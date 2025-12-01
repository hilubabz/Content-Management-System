import { Crosshair, FileCheck, ShieldX, Watch } from "lucide-react";

const data = [
  {
    icon: FileCheck,
    title: "Published",
    background: "#5bb56f",
    iconFill: "#119C30",
  },
  {
    icon: Watch,
    title: "Pending",
    background: "#f4b967",
    iconFill: "#BF6F00",
  },
  {
    icon: Crosshair,
    title: "Planned",
    background: "#69a0c7",
    iconFill: "#0072C6",
  },
  {
    icon: ShieldX,
    title: "Hold/Reject",
    background: "#ed9c9c",
    iconFill: "#ED1010",
  },
];

export const Data = () => {
  return (
    <div className="grid grid-cols-4 gap-7 mt-5">
      {data.map((val, index) => (
        <div className="flex gap-4 border" key={index}>
          <div style={{ backgroundColor: val.background }} className="p-5">
            <val.icon fill={val.iconFill} color="white" size={50} />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="text-3xl font-bold">0</div>
            <div className="text-gray-500">{val.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
