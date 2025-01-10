"use client";

import React from "react";
import axios from "axios";
import Link from "next/link";
import HeaderMobileMenu from "./HeaderMobileMenu";
import { Button } from "@/components/ui/button";
import { User } from "@/typescript/types";
import { useRouter } from "next/navigation";

interface Props {
  user?: User;
}

const Header = ({ user }: Props) => {
  const router = useRouter();
  async function handleLogout() {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }

      router.push("/login");
    } catch (error) {
      console.log("user logout error", error);
    }
  }
  return (
    <header className="py-4 bg-gray-100">
      <div className="container">
        <nav className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold">ADN</h3>
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
          <HeaderMobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
