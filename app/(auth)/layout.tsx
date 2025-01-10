import Header from "@/components/common/Header/Header";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AuthLayout;
