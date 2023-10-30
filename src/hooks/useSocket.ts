import { useEffect, useState } from "react";
import io from "socket.io-client";

const URL_SOCKET = process.env.NEXT_PUBLIC_URL_SOCKET as string;

export function useSocket(url: string) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const socketIo = io(URL_SOCKET);

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
}
