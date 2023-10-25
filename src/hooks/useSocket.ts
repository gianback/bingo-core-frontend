import { useEffect, useState } from "react";
import io from "socket.io-client";

export function useSocket(url: string) {
  const [socket, setSocket] = useState<any>();

  useEffect(() => {
    const socketIo = io("https://bingo-app.1.sg-1.fl0.io");

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, [url]);

  return socket;
}
