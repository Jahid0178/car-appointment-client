import React from "react";
import isAuthenticated from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  const { user } = await isAuthenticated();

  if (!user?.data || user?.data?.role !== "admin") {
    redirect("/dashboard");
  }

  return children;
};

export default AdminLayout;
