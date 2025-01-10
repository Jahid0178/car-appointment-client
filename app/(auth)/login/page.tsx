import React from "react";
import LoginForm from "./_components/LoginForm";

const LoginPage = () => {
  return (
    <section className="flex min-h-svh w-full items-center justify-center">
      <div className="container w-full sm:max-w-md">
        <LoginForm />
      </div>
    </section>
  );
};

export default LoginPage;
