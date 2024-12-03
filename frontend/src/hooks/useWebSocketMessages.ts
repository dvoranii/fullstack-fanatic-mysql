import { useEffect } from "react";
import { io } from "socket.io-client";
import { Message } from "../types/Message";

const BASE_URL = "http://localhost:5000";

export const useWebSocketMessages = (
  onNewMessage: (message: Message) => void
) => {
  useEffect(() => {
    const socket = io(BASE_URL);

    socket.on("newMessage", (message: Message) => {
      onNewMessage(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [onNewMessage]);
};
