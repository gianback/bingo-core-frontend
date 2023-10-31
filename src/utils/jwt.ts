import { jwtVerify } from "jose";
export const validateToken = async (token: string) => {
  return await jwtVerify(
    token,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );
};
