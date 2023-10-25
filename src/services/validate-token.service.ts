export const validateToken = async (token: string): Promise<number> => {
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!resp.ok) {
    throw new Error("Something went wrong with check status");
  }
  const { statusCode } = await resp.json();

  return statusCode;
};
