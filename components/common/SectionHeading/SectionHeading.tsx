import React from "react";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

const SectionHeading = ({ title, subtitle }: SectionHeadingProps) => {
  return (
    <div className="mb-4">
      <h2 className="text-2xl md:text-3xl mb-1">{title}</h2>
      {subtitle && (
        <p className="text-sm md:text-base text-gray-500">{subtitle}</p>
      )}
    </div>
  );
};

export default SectionHeading;
