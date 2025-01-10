import React from "react";
import Header from "@/components/common/Header/Header";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <footer>Footer</footer>
    </React.Fragment>
  );
};

export default ClientLayout;
