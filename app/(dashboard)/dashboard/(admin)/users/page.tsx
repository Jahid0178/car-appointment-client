import React from "react";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";
import UsersTable from "./_components/UsersTable";
import { cookies } from "next/headers";

const getUsers = async () => {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch users");

    const { data } = await response.json();

    return data;
  } catch (error) {
    console.log("get users error", error);
  }
};

const UsersPage = async () => {
  const users = await getUsers();

  return (
    <section>
      <div className="container">
        <SectionHeading
          title="Users"
          subtitle="Manage your users"
        />
        <div>
          <UsersTable users={users} />
        </div>
      </div>
    </section>
  );
};

export default UsersPage;
