import React from "react";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppointmentType } from "@/typescript/types";

interface ViewAppointmentPageProps {
  params: Promise<{ id: string }>;
}

async function getAppointmentById(
  id: string
): Promise<AppointmentType | undefined> {
  try {
    const response = await axios.get(
      `
      ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    return response.data.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Error details:", error.response?.data?.message);
    }

    return undefined;
  }
}

const ViewAppointmentPage = async ({ params }: ViewAppointmentPageProps) => {
  const { id } = await params;

  const data = await getAppointmentById(id);

  if (!data) {
    return <div>Appointment not found</div>;
  }

  const { service, appointmentDate, vehicleDetails, status, payment, user } =
    data;

  return (
    <section>
      <div className="container">
        <Card>
          <CardHeader className="flex-row justify-between items-center space-y-0">
            <CardTitle className="text-xl md:text-2xl">
              View Appointment
            </CardTitle>
            <Button
              asChild
              variant="link"
            >
              <Link href={`/dashboard/appointments/edit/${id}`}>Edit</Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2">
              <h2 className="text-lg font-semibold">
                Service Type: {service.name}
              </h2>
              <p className="font-semibold">
                Appointment Date:{" "}
                {new Date(appointmentDate).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p>Status: {status}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">User Information</h3>
              <ul>
                <li>Name: {user?.name}</li>
                <li>Email: {user?.email}</li>
                <li>Phone: {user?.phone}</li>
                <li>Street: {user?.address?.street}</li>
                <li>City: {user?.address?.city}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Price Information</h3>
              <ul>
                <li>Status: {payment.status}</li>
                <li>Amount: {payment.amount || 0}</li>
                <li>Method: {payment.method}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Vehicle Details</h3>
              <ul>
                <li>Company: {vehicleDetails?.company}</li>
                <li>Model: {vehicleDetails?.model}</li>
                <li>Year: {vehicleDetails?.year}</li>
                <li>Licence Plate: {vehicleDetails?.licencePlate}</li>
                <li>Notes: {vehicleDetails?.notes}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ViewAppointmentPage;
