"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const AppNavUser = () => {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await response.json();

    alert(data.message);

    router.push("/login");
  };
  return (
    <Button
      variant="destructive"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default AppNavUser;
