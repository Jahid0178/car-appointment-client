import React from "react";
import AppSidebar from "@/components/common/AppSidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import isAuthenticated from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const { user, loggedIn } = await isAuthenticated();

  if (!loggedIn) {
    redirect("/");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={user?.data} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
