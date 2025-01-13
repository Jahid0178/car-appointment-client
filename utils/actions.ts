"use server";

import { ServiceType } from "@/typescript/types";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export const addService = async (data: ServiceType) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to add service");

    const newService = await response.json();

    revalidatePath("/dashboard/services");

    return newService;
  } catch (error) {
    console.log("service add action error", error);
  }
};

export const updateService = async (id: string, data: ServiceType) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update service");

    const updatedService = await response.json();

    revalidatePath("/dashboard/services");

    return updatedService;
  } catch (error) {
    console.log("service update action error", error);
  }
};

export const deleteService = async (id: string) => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/services/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to delete service");

    const data = await response.json();

    revalidatePath("/dashboard/services");

    return {
      message: data.message,
    };
  } catch (error) {
    console.log("service delete action error", error);
  }
};

export const getAppointmentById = async (id: string) => {
  try {
    const response: Response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/${id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) throw new Error("Failed to get appointment by id");

    return await response.json();
  } catch (error) {
    console.log("get appointment by id action error", error);
  }
};

export const updateAppointmentByUserId = async (
  userId: string,
  appointmentId: string,
  data: {
    appointmentStatus: string;
    paymentStatus: string;
    paymentMethod: string;
  }
) => {
  try {
    const cookieStore = await cookies();
    const response: Response = await fetch(
      `
      ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments/${userId}/${appointmentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) throw new Error("Failed to update appointment");

    return await response.json();
  } catch (error) {
    console.log("appointment update action error", error);
  }
};
