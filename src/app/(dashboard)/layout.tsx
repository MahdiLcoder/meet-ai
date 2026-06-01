import { SidebarProvider } from "@/components/ui/sidebar";

import { DashboardNavbar } from "@/modules/dashboard/ui/components/dashboard-navbar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-sidebar";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col h-screen w-screen bg-background/50">
        <DashboardNavbar />
        <div className="flex-1 overflow-auto">
          <div className="container max-w-7xl mx-auto px-6 py-6">
            {children}
          </div>
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
