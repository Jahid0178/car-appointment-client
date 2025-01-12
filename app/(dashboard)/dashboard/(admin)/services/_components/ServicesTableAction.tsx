"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { deleteService } from "@/utils/actions";

interface ServicesTableActionProps {
  _id: string;
}

const ServicesTableAction = ({ _id }: ServicesTableActionProps) => {
  const handleServiceDelete = async () => {
    const result = await deleteService(_id);

    alert(result?.message);
  };
  return (
    <div>
      <Button
        asChild
        variant="link"
      >
        <Link href={`/dashboard/services/edit/${_id}`}>Edit</Link>
      </Button>
      <Button
        variant="destructive"
        onClick={handleServiceDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default ServicesTableAction;
