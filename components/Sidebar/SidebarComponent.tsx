"use client";

import { useState } from "react";
import { MainSidebar } from "./MainSidebar";
``;
import { SecondarySidebar } from "./SecondarySidebar";
import { usePathname } from "next/navigation";

export const SidebarComponent = () => {
  const path = usePathname();
  const mainSegment = path.split("/")[1];
  const [active, setActive] = useState(mainSegment || "");

  return (
    <div className="flex">
      <MainSidebar setActive={setActive} />
      <SecondarySidebar active={active} />
    </div>
  );
};
