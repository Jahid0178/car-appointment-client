import React from "react";
import Link from "next/link";
import HeaderMobileMenu from "./HeaderMobileMenu";

const Header = () => {
  return (
    <header className="py-4 bg-gray-100">
      <div className="container">
        <nav className="flex justify-between items-center">
          <h3 className="text-3xl font-semibold">ADN</h3>
          <ul className="hidden md:flex items-center gap-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </ul>
          <HeaderMobileMenu />
        </nav>
      </div>
    </header>
  );
};

export default Header;
