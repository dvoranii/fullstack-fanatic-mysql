import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../types/Message";

const BASE_URL = "http://localhost:5000";

export const useWebSocketMessages = (
  onNewMessage: (message: Message) => void
) => {
  // Use useRef to maintain the same socket instance
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      const socket = io(BASE_URL);
      socketRef.current = socket;

      socket.on("newMessage", (message: Message) => {
        onNewMessage(message);
      });

      // Clean up connection when the component unmounts
      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    }
  }, [onNewMessage]);
};
