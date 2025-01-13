import React from "react";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import { getAppointmentById } from "@/utils/actions";
import AppointmentForm from "../../_components/AppointmentForm";

interface AppointmentEditPageProps {
  params: Promise<{ id: string }>;
}

const AppointmentEditPage = async ({ params }: AppointmentEditPageProps) => {
  const { id } = await params;
  const { data } = await getAppointmentById(id);

  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Edit Appointment"
          subtitle="Edit your appointment"
        />
        <div className="w-full md:w-8/12 xl:w-1/3 mx-auto">
          <AppointmentForm data={data} />
        </div>
      </div>
    </section>
  );
};

export default AppointmentEditPage;
