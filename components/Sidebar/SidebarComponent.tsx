import { BookText, Layers, LayoutDashboard, User, Wrench } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Button } from "../ui/button";

export const SidebarComponent = () => {
  const items = [
    {
      title: "Dashboard",
      key: "dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Story Management",
      key: "story",
      icon: BookText,
    },
    {
      title: "Priority Management",
      key: "priority",
      icon: Layers,
    },
    {
      title: "Tools",
      key: "tools",
      icon: Wrench,
    },
    {
      title: "User Management",
      key: "user",
      icon: User,
    },
  ];
  return (
    <Sidebar>
      <SidebarContent className="bg-black w-[150px]">
        <SidebarGroup>
          <SidebarGroupLabel>CMS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="h-50">
                  <SidebarMenuButton asChild className="h-50">
                    <Button
                      variant={"secondary"}
                      className="flex flex-col flex-1 bg-transparent text-white h-50"
                    >
                      <User size={64} absoluteStrokeWidth />
                      <div className="text-[10px]">{item.title}</div>
                    </Button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
