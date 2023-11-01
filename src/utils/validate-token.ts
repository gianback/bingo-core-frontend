import { cookies } from "next/headers";

export const validateToken = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  console.log({ mode: process.env.NODE_ENV });
  const url =
    process.env.NODE_ENV === "development"
      ? process.env.URL_BACKEND
      : process.env.NEXT_PUBLIC_URL_BACKEND;
  try {
    const resp = await fetch(`${url}/auth/check-status`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    });
    return resp.ok;
  } catch (error) {
    console.log({ error });

    // throw new Error("Error validating token");
  }
};
