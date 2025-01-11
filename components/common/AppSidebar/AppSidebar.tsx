import React from "react";
import Link from "next/link";
import AppSidebarNav from "./AppSidebarNav";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { dashboardSidebarNavigations } from "@/data";
import { User } from "@/typescript/types";
import AppNavUser from "./AppNavUser";
import { Button } from "@/components/ui/button";

interface AppSidebarProps {
  user: User;
}

const AppSidebar = ({ user }: AppSidebarProps) => {
  const role: string = user?.role;
  const navItems =
    role === "admin"
      ? dashboardSidebarNavigations.admin
      : dashboardSidebarNavigations.user;
  return (
    <Sidebar>
      <SidebarHeader>
        <Button
          asChild
          variant={"ghost"}
        >
          <Link
            href="/"
            className="text-lg font-semibold text-center"
          >
            ADN
          </Link>
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <AppSidebarNav
          label="Dashboard"
          navItems={navItems}
        />
      </SidebarContent>
      <SidebarFooter>
        <AppNavUser />
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
