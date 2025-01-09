import React from "react";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  return (
    <React.Fragment>
      <header>Header</header>
      <main>{children}</main>
      <footer>Footer</footer>
    </React.Fragment>
  );
};

export default ClientLayout;
