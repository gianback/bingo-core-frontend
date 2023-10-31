import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

const URL_SOCKET = process.env.NEXT_PUBLIC_URL_SOCKET as string;

export function useSocket(url: string) {
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketIo = io(URL_SOCKET);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
}
