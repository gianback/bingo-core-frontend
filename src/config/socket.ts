import { io } from "socket.io-client";

const url = process.env.NEXT_PUBLIC_URL_BACKEND as string;
export const socket = io(url, {
  reconnectionDelayMax: 10000,
});
