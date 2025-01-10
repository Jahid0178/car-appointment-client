import React from "react";
import Header from "@/components/common/Header/Header";
import Footer from "@/components/common/Footer/Footer";
import isAuthenticated from "@/lib/isAuthenticated";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = async ({ children }: ClientLayoutProps) => {
  const { user } = await isAuthenticated();

  return (
    <React.Fragment>
      <Header user={user} />
      <main>{children}</main>
      <Footer />
    </React.Fragment>
  );
};

export default ClientLayout;
