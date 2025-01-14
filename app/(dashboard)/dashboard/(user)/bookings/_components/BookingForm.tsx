"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { parseISO, format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { bookingFormSchema } from "@/validation";
import { ServiceType } from "@/typescript/types";
import { useRouter } from "next/navigation";

interface BookingFormProps {
  services: ServiceType[];
}

const BookingForm = ({ services }: BookingFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    defaultValues: {
      service: "",
      appointmentDate: "",
      vehicleDetails: {
        company: "",
        model: "",
        year: "",
        licencePlate: "",
        notes: "",
      },
    },
  });

  const handleFormSubmit = async (
    values: z.infer<typeof bookingFormSchema>
  ) => {
    try {
      const response: Response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          alert(errorData.message);
        } else if (response.status === 400) {
          alert(
            `Invalid booking data: ${errorData.message || "Check your input."}`
          );
        } else {
          alert(
            `Something went wrong: ${errorData.message || "Please try again."}`
          );
        }
      }

      const data = await response.json();

      alert(data.message);

      router.push("/dashboard/bookings");
    } catch (error) {
      console.log("failed to create booking", error);
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Booking Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleFormSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Service</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {services.map((service: ServiceType) => (
                        <SelectItem
                          key={service._id}
                          value={service?._id as string}
                        >
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="appointmentDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Appointment Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={
                          field.value && typeof field.value === "string"
                            ? parseISO(field.value)
                            : undefined
                        }
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleDetails.company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Car company name"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleDetails.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Car model"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleDetails.year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Car year"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleDetails.licencePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Licence Plate No</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Car licence plate no"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleDetails.notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your notes"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Create Booking</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;
