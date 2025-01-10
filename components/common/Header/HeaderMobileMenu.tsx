import React from "react";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const HeaderMobileMenu = () => {
  return (
    <Sheet>
      <SheetTrigger className="block md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>ADN</SheetTitle>
          <SheetDescription>Here All Navigation Menus</SheetDescription>
        </SheetHeader>
        <ul className="flex flex-col gap-4 mt-6">
          <li>
            <SheetClose asChild>
              <Link href="/">Home</Link>
            </SheetClose>
          </li>
          <li>
            <SheetClose asChild>
              <Link href="/login">Login</Link>
            </SheetClose>
          </li>
          <li>
            <SheetClose asChild>
              <Link href="/register">Register</Link>
            </SheetClose>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
};

export default HeaderMobileMenu;
