import React from "react";
import ServiceForm from "@/components/Forms/ServiceForm/ServiceForm";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import { cookies } from "next/headers";

interface EditServicePageProps {
  params: Promise<{ id: string }>;
}

async function getServiceById(id: string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch service");

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log("get service by id error", error);
  }
}

const EditServicePage = async ({ params }: EditServicePageProps) => {
  const { id } = await params;
  const service = await getServiceById(id);

  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Edit Service"
          subtitle="Edit your service"
        />
        <div className="w-full md:w-8/12 xl:w-1/3 mx-auto">
          <ServiceForm
            isEditing={true}
            service={service}
          />
        </div>
      </div>
    </section>
  );
};

export default EditServicePage;
