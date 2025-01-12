import React from "react";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import ServicesTable from "./_components/ServicesTable";

const ServicesPage = () => {
  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Services"
          subtitle="Manage your services"
        />
        <ServicesTable caption="Services Table" />
      </div>
    </section>
  );
};

export default ServicesPage;
