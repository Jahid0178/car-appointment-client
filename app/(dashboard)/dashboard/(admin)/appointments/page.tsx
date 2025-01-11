import React from "react";
import AppointmentTable from "./_components/AppointmentTable";

const AppointmentsPage = () => {
  return (
    <section>
      <div className="container">
        <AppointmentTable caption="Appointments Table" />
      </div>
    </section>
  );
};

export default AppointmentsPage;
