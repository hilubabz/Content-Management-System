import { BookText, Layers, LayoutDashboard, User, Wrench } from "lucide-react";
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
import { Dispatch, SetStateAction, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useGetUser } from "@/hooks/Sidebar/useGetUser";
import Image from "next/image";
import { useLogout } from "@/hooks/Auth/useLogout";
import { useRouter } from "next/navigation";

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

export const MainSidebar = ({
  setActive,
}: {
  setActive: Dispatch<SetStateAction<string>>;
}) => {
  const path = usePathname();
  const userData = useGetUser();
  const logout = useLogout();
  const router = useRouter();

  useEffect(() => {
    if (!userData.isLoading && userData.data.message === "Unauthorized") {
      router.push("/login");
    }
  }, [userData]);

  const handleLogout = () => {
    logout.mutate();
  };

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
        {userData.isLoading ? (
          <div></div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="h-15 w-15 rounded-full bg-gray-500 relative overflow-hidden">
              <Image
                src={userData.data?.data?.profilePicture}
                alt="profilePicture"
                fill
              />
            </div>
            <div className="text-sm">{userData.data?.data?.name}</div>
            <div className="text-sm text-gray-500">
              @{userData.data?.data?.username}
            </div>
            <div onClick={handleLogout} className="cursor-pointer">
              Logout
            </div>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
