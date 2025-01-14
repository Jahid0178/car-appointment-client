import React from "react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppointmentType } from "@/typescript/types";
import { Button } from "@/components/ui/button";

interface BookingTableProps {
  caption?: string;
  appointments: AppointmentType[];
}

const BookingTable = ({ caption, appointments }: BookingTableProps) => {
  return (
    <div className="border p-4">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/dashboard/bookings/create">Create Booking</Link>
        </Button>
      </div>
      <Table className="border border-collapse">
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border">Date</TableHead>
            <TableHead className="border">Name</TableHead>
            <TableHead className="border">Price</TableHead>
            <TableHead className="border">Duration</TableHead>
            <TableHead className="border">Booking Status</TableHead>
            <TableHead className="border">Payment Status</TableHead>
            <TableHead className="border">Payment Method</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments && appointments.length > 0 ? (
            appointments.map((appointment) => (
              <TableRow key={appointment._id}>
                <TableCell className="border">
                  {new Date(appointment.appointmentDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="border">
                  {appointment.service.name}
                </TableCell>
                <TableCell className="border">
                  {appointment.service.price} BHD
                </TableCell>
                <TableCell className="border">
                  {appointment.service.duration} minutes
                </TableCell>
                <TableCell className="border">{appointment.status}</TableCell>
                <TableCell className="border">
                  {appointment.payment.status}
                </TableCell>
                <TableCell className="border">
                  {appointment.payment.method}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                className="text-center"
                colSpan={7}
              >
                No appointments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingTable;
