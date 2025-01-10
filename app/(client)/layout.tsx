import React from "react";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <React.Fragment>
      <Header />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default ClientLayout;
