"use client";

import { useState } from "react";
import { MainSidebar } from "./MainSidebar";
import { SecondarySidebar } from "./SecondarySidebar";

export const SidebarComponent = () => {
  const [active, setActive] = useState("");

  return (
    <div className="flex">
      <MainSidebar setActive={setActive} />
      <SecondarySidebar active={active} />
    </div>
  );
};
