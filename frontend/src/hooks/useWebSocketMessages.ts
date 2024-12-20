import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../types/Message";

const BASE_URL = import.meta.env.VITE_API_URL.replace("/api", "");

export const useWebSocketMessages = (
  onNewMessage: (message: Message) => void
) => {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(BASE_URL);
      socketRef.current = socket;

      socket.on("newMessage", (message: Message) => {
        onNewMessage(message);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [onNewMessage]);
};
