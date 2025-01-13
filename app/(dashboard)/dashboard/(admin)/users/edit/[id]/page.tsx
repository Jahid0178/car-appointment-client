import React from "react";
import { cookies } from "next/headers";
import UserForm from "../../_components/UserForm";
import SectionHeading from "@/components/common/SectionHeading/SectionHeading";

interface EditProfilePageProps {
  params: Promise<{ id: string }>;
}

async function getUserById(id: string) {
  try {
    const cookieStore = await cookies();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch user");

    return await response.json();
  } catch (error) {
    console.log("get user by id error", error);
  }
}

const EditProfilePage = async ({ params }: EditProfilePageProps) => {
  const { id } = await params;

  const { data: user } = await getUserById(id);

  return (
    <section>
      <div className="container">
        <SectionHeading title="Edit User Profile" />
        <div className="w-full md:w-8/12 xl:w-1/3 mx-auto">
          <UserForm
            isEditing={true}
            user={user}
          />
        </div>
      </div>
    </section>
  );
};

export default EditProfilePage;
