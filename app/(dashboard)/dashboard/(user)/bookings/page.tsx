import React from "react";
import { cookies } from "next/headers";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import BookingTable from "./_components/BookingTable";

async function getUserAppointments() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch user appointments");

    return await response.json();
  } catch (error) {
    console.log("get user appointments error", error);
  }
}

const BookingsPage = async () => {
  const { data: appointments } = await getUserAppointments();

  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Bookings"
          subtitle="Manage your bookings"
        />
        <BookingTable
          caption="Bookings Table"
          appointments={appointments}
        />
      </div>
    </section>
  );
};

export default BookingsPage;
