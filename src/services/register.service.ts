import { APIResponse } from "../interfaces/api";

interface Props {
  email: string;
  password: string;
  name: string;
  surname: string;
  lastname: string;
  password_confirmation: string;
}

export const registerService = async ({
  email,
  lastname,
  name,
  password,
  password_confirmation,
  surname,
}: Props) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/register`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      lastname,
      name,
      password,
      password_confirmation,
      surname,
    }),
  });

  const data = (await resp.json()) as APIResponse<any>;

  return !!data.type;
};
