import axios from "axios";
import { cookies } from "next/headers";

async function isAuthenticated() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.toString();

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/me`,
      {
        headers: {
          Cookie: cookie,
        },
      }
    );

    return {
      user: response.data,
      loggedIn: true,
    };
  } catch {
    return {
      user: null,
      loggedIn: false,
    };
  }
}

export default isAuthenticated;
