import React from "react";
import Header from "@/components/common/Header/Header";
import isAuthenticated from "@/lib/isAuthenticated";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const { loggedIn } = await isAuthenticated();

  if (loggedIn) {
    redirect("/");
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthLayout;
