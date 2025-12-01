import { SidebarComponent } from "@/components/Sidebar/SidebarComponent";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarComponent />
      <main>{children}</main>
    </SidebarProvider>
  );
}
