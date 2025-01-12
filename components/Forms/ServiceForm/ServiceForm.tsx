"use client";

import React from "react";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceType } from "@/typescript/types";
import { addService, updateService } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

interface ServiceFormProps {
  isEditing?: boolean;
  service?: ServiceType;
}

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .trim(),
  description: z
    .string()
    .min(3, { message: "Description must be at least 3 characters" })
    .trim(),
  price: z.preprocess(
    (value) => Number(value),
    z.number().min(1, { message: "Price is required" })
  ),
  duration: z.preprocess(
    (value) => Number(value),
    z.number().min(1, { message: "Duration is required" })
  ),
  isActive: z.boolean(),
});

const ServiceForm = ({ isEditing = false, service }: ServiceFormProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration: service?.duration || 0,
      isActive: service?.isActive ?? true,
    },
  });

  const handleFormSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formValues = {
        ...values,
        price: Number(values.price),
        duration: Number(values.duration),
      };

      const result = isEditing
        ? await updateService(service!._id!, formValues)
        : await addService(formValues);

      alert(result?.message);

      router.push("/dashboard/services");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Form</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleFormSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Service Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter service name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter service description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter service price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormDescription>Enter duration in a minutes</FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter service duration"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isEditing && (
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Active</FormLabel>
                    <FormDescription>Change service status</FormDescription>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button type="submit">
              {isEditing ? "Update Service" : "Create Service"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ServiceForm;
