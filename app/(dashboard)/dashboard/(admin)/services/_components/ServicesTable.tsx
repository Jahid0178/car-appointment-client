import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ServiceType } from "@/typescript/types";
import ServicesTableAction from "./ServicesTableAction";
import { Badge } from "@/components/ui/badge";

interface ServicesTableProps {
  caption: string;
}

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

    if (!response.ok) {
      throw new Error("Failed to fetch services");
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.log("get all services error", error);
  }
}

const ServicesTable = async ({ caption }: ServicesTableProps) => {
  const services = await getAllServices();

  if (!services || services.length === 0)
    return <div className="border p-4">No services found</div>;

  return (
    <div className="border p-4">
      <div className="flex justify-end mb-4">
        <Button asChild>
          <Link href="/dashboard/services/add">Add service</Link>
        </Button>
      </div>
      <Table className="border border-collapse">
        <TableCaption>{caption}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border">Id</TableHead>
            <TableHead className="border">Service Name</TableHead>
            <TableHead className="border">Price</TableHead>
            <TableHead className="border">Duration</TableHead>
            <TableHead className="border">Status</TableHead>
            <TableHead className="border">Created By</TableHead>
            <TableHead className="border">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services.map((service: ServiceType) => {
            const { _id, name, price, duration, isActive, createdBy } = service;
            return (
              <TableRow key={_id}>
                <TableCell>{_id}</TableCell>
                <TableCell>{name}</TableCell>
                <TableCell>{price} BHD</TableCell>
                <TableCell>{duration} minutes</TableCell>
                <TableCell>
                  <Badge
                    className={`${isActive ? "bg-green-600" : "bg-red-600"}`}
                  >
                    {isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell>{createdBy?.name}</TableCell>
                <TableCell className="flex gap-4">
                  <ServicesTableAction _id={_id!} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServicesTable;
