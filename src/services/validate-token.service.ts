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
  const { statusCode } = await resp.json();

  return statusCode;
};
