"use client";

import React from "react";
import { Button } from "@/components/ui/button";

const AppNavUser = () => {
  const handleLogout = () => {
    alert("Logout Successfully!");
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
