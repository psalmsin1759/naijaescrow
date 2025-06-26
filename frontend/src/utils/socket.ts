import { io, Socket } from "socket.io-client";


const SOCKET_URL = "https://chatservice.qnetixtechnologies.com";

let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      transports: ["websocket"],
      autoConnect: true,
    });

    
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
