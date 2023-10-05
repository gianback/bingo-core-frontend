import { io } from "socket.io-client";

const URL = import.meta.env.VITE_WEBSOCKET_SERVICE || "http://localhost:3000";

export const socket = io(URL);

// socket.on("connect", () => {
//     console.log("CONNECTED !!!");

// });

// socket.on("disconnect", () => {
//     console.log("DISCONNECTED !!!");
// });
