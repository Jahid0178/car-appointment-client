import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-4 text-center">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} ADN - All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
