import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AppointmentType } from "@/typescript/types";

interface AppointmentTableProps {
  caption: string;
}

async function getAppointments() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch appointments");
    }

    const { data } = await response.json();

    return { data, error: null };
  } catch (error) {
    console.log("get appointments error", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to fetch appointments";
    return {
      data: null,
      error: errorMessage,
    };
  }
}

const ErrorAlert = ({ message }: { message: string }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-4">
    <div className="text-red-700">{message}. Please try again later.</div>
  </div>
);

const EmptyAlert = () => (
  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 my-4">
    <div className="text-gray-700">No appointments found.</div>
  </div>
);

const AppointmentTable = async ({ caption }: AppointmentTableProps) => {
  const { data, error } = await getAppointments();

  if (error) {
    return <ErrorAlert message={error} />;
  }

  if (!data || data.length === 0) {
    return <EmptyAlert />;
  }

  return (
    <div className="border p-4">
      <Table className="border border-collapse">
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border">Id</TableHead>
            <TableHead className="border">Service Name</TableHead>
            <TableHead className="border">Appointment Date</TableHead>
            <TableHead className="border">Status</TableHead>
            <TableHead className="border">User</TableHead>
            <TableHead className="border">Payment Status</TableHead>
            <TableHead className="border">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((appointment: AppointmentType) => (
            <TableRow
              key={appointment._id}
              className="even:bg-slate-100 hover:bg-slate-100"
            >
              <TableCell className="border">{appointment._id}</TableCell>
              <TableCell className="border">
                {appointment.service.name}
              </TableCell>
              <TableCell className="border">
                {new Date(appointment.appointmentDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="border">{appointment.status}</TableCell>
              <TableCell className="border">{appointment.user.name}</TableCell>
              <TableCell className="border">
                {appointment.payment.status}
              </TableCell>
              <TableCell className="border">
                <div className="flex gap-2">
                  <Button
                    asChild
                    variant="link"
                  >
                    <Link href={`/dashboard/appointments/${appointment._id}`}>
                      View
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="link"
                  >
                    <Link
                      href={`/dashboard/appointments/edit/${appointment._id}`}
                    >
                      Edit
                    </Link>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppointmentTable;
