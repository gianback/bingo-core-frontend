import axios from "axios";
export const validateToken = async (token: string) => {
  // console.log(`${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`);
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // method: "GET",
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    }
  );
  console.log({ resp });
  return;
  // try {
  // const resp = await axios.get(
  //   `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`,
  //   {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );
  // const resp = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL_BACKEND}/auth/check-status`,
  //   {
  //     method: "GET",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   }
  // );

  // console.log(token);
  // if (!resp.ok) {
  //   throw new Error("Something went wrong with check status");
  // }
  // console.log({ resp });
  // const { statusCode } = await resp.json();

  // return resp.data;
  // } catch (error) {
  //   console.log({ error });
  // }
};
