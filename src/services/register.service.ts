export interface Response {
  data: any[];
  message: string;
  type: string;
  http_code: number;
  errors: any[];
}

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
  const resp = await fetch(
    `${import.meta.env.VITE_URL_BACKEND}/api/auth/register`,
    {
      method: "POST",
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
    }
  );

  const data = (await resp.json()) as Response;

  return !!data.type;
};
