import React from "react";
import isAuthenticated from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";

interface UserLayoutProps {
  children: React.ReactNode;
}

const UserLayout = async ({ children }: UserLayoutProps) => {
  const { user } = await isAuthenticated();

  if (!user?.data || user?.data?.role !== "user") {
    redirect("/dashboard");
  }

  return children;
};

export default UserLayout;
