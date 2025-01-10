import React from "react";
import RegisterForm from "./_components/RegisterForm";

const RegisterPage = () => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center">
      <div className="container w-full sm:max-w-md">
        <RegisterForm />
      </div>
    </section>
  );
};

export default RegisterPage;
