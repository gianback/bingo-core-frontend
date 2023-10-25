import { UserData } from "@/store/userStore";

interface LoginApiResponse extends UserData {
  error?: string;
  message?: string[];
  statusCode?: number;
}

export async function loginService(
  email: string,
  password: string
): Promise<LoginApiResponse> {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  return await resp.json();
}
