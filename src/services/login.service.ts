export const loginService = async (email: string, password: string) => {
  const resp = await fetch(`${process.env.VITE_URL_BACKEND}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  return await resp.json();
};
