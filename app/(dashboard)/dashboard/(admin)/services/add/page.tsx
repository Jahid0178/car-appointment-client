import React from "react";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import ServiceForm from "@/components/Forms/ServiceForm/ServiceForm";

const AddServicePage = () => {
  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Add Service"
          subtitle="Add your new service"
        />
        <div className="w-full md:w-8/12 xl:w-1/3 mx-auto">
          <ServiceForm isEditing={false} />
        </div>
      </div>
    </section>
  );
};

export default AddServicePage;
