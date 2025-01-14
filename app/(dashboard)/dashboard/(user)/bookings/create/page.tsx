import React from "react";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import BookingForm from "../_components/BookingForm";
import { cookies } from "next/headers";

async function getAllServices() {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch all services");

    return await response.json();
  } catch (error) {
    console.log("get all services error", error);
  }
}

const CreateBookingPage = async () => {
  const { data: services } = await getAllServices();

  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Create Booking"
          subtitle="Create your new booking"
        />
        <div className="w-full md:w-8/12 xl:w-1/3 mx-auto">
          <BookingForm services={services} />
        </div>
      </div>
    </section>
  );
};

export default CreateBookingPage;
