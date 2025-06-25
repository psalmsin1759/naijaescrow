// socket.ts
import { io, Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    // Optional debug
    socket.on("connect", () => {
      console.log(" Connected to socket:", socket);
    });

    socket.on("connect_error", (err) => {
      console.error(" Connection error:", err.message);
    });
  }
  return socket;
};

export const getSocket = (): Socket | null => socket;
