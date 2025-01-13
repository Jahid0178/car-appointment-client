"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const UsersTableAction = ({ id }: { id: string }) => {
  const router = useRouter();
  const handleUserDelete = async () => {
    try {
      const response = await fetch(
        `
        ${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      if (!response.ok) throw new Error("Failed to delete user");

      const result = await response.json();

      alert(result.message);

      router.refresh();
    } catch (error) {
      console.log("user delete error", error);
    }
    console.log("delete");
  };
  return (
    <>
      <Button
        asChild
        variant="link"
      >
        <Link href={`/dashboard/users/edit/${id}`}>Edit</Link>
      </Button>
      <Button
        variant="destructive"
        onClick={handleUserDelete}
      >
        Delete
      </Button>
    </>
  );
};

export default UsersTableAction;
