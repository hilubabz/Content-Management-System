import {
  BookText,
  Calendar,
  Home,
  Inbox,
  Layers,
  LayoutDashboard,
  Search,
  Settings,
  User,
  Wrench,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Dispatch, SetStateAction } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MainSidebar = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<string>>;
}) => {
  const path = usePathname();
  console.log(path);
  const items = [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: LayoutDashboard,
      link: "/dashboard",
    },
    {
      title: "Story Management",
      key: "story",
      icon: BookText,
      link: "/story/addStory",
    },
    {
      title: "Priority Management",
      key: "priority",
      icon: Layers,
      link: "/priority",
    },
    {
      title: "Tools",
      key: "tools",
      icon: Wrench,
      link: "/tools/categoryManagement",
    },
    {
      title: "User Management",
      key: "user",
      icon: User,
      link: "/tools/userAccessManagement",
    },
  ];

  return (
    <Sidebar className="w-[150px] ">
      <SidebarContent className="bg-black w-[150px]">
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className="text-white text-center w-full">CMS</div>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`h-auto py-4 items-center justify-center`}
                  >
                    <Link
                      href={item.link}
                      className={`flex flex-col text-white ${path.startsWith(`/${item.key}`) ? "bg-gray-800" : "bg-transparent"}`}
                      onClick={() => setActive(item.key)}
                    >
                      <item.icon className="w-7! h-7!" />
                      <div className="text-[10px]">{item.title}</div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="bg-black text-white w-[150px] pb-2">
        <div className="flex flex-col items-center">
          <div className="h-15 w-15 rounded-full bg-gray-500"></div>
          <div>Logout</div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
