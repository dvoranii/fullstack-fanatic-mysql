import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "../types/Message";
import { debounce } from "../utils/debounce";

let socketInstance: Socket | null = null;

const getSocket = (baseUrl: string) => {
  if (!socketInstance) {
    socketInstance = io(baseUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      timeout: 10000,
    });
  }
  return socketInstance;
};

export type ConnectionStatus =
  | "connecting"
  | "connected"
  | "disconnected"
  | "error";

interface UseWebSocketMessagesReturn {
  connectionStatus: ConnectionStatus;
  retryFailedMessage: (message: Message) => Promise<void>;
  clearRetryQueue: () => void;
}

export const useWebSocketMessages = (
  onNewMessage: (message: Message) => void,
  conversationId: number | null,
  userId: number | null,
  baseUrl: string
): UseWebSocketMessagesReturn => {
  const [connectionStatus, setConnectionStatus] =
    useState<ConnectionStatus>("connecting");
  const socketRef = useRef<Socket | null>(null);
  const retryQueueRef = useRef<Message[]>([]);
  const reconnectAttemptsRef = useRef(0);

  const debouncedMessageHandler = useRef<
    ((message: Message) => void) & { cancel: () => void }
  >();

  useEffect(() => {
    debouncedMessageHandler.current = debounce((message: Message) => {
      onNewMessage(message);
    }, 100);

    return () => {
      debouncedMessageHandler.current?.cancel();
    };
  }, [onNewMessage]);

  const handleRoomManagement = useCallback(
    (socket: Socket) => {
      if (conversationId) {
        socket.emit("joinRoom", `conversation_${conversationId}`);
      }
      if (userId) {
        socket.emit("joinRoom", `user_${userId}`);
      }

      return () => {
        if (conversationId) {
          socket.emit("leaveRoom", `conversation_${conversationId}`);
        }
        if (userId) {
          socket.emit("leaveRoom", `user_${userId}`);
        }
      };
    },
    [conversationId, userId]
  );

  const setupSocketListeners = useCallback(
    (socket: Socket) => {
      socket.on("connect", () => {
        setConnectionStatus("connected");
        reconnectAttemptsRef.current = 0;
      });

      socket.on("disconnect", () => {
        setConnectionStatus("disconnected");
      });

      socket.on("connect_error", (error) => {
        console.error("Connection error:", error);
        setConnectionStatus("error");

        // Implement exponential backoff
        const backoffDelay = Math.min(
          1000 * Math.pow(2, reconnectAttemptsRef.current),
          10000
        );
        reconnectAttemptsRef.current++;

        setTimeout(() => {
          socket.connect();
        }, backoffDelay);
      });

      socket.on("newMessage", (message: Message) => {
        if (debouncedMessageHandler.current) {
          debouncedMessageHandler.current(message);
        }
      });

      socket.on("reconnect", () => {
        handleRoomManagement(socket);
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("connect_error");
        socket.off("newMessage");
        socket.off("reconnect");
      };
    },
    [handleRoomManagement]
  );

  useEffect(() => {
    const socket = getSocket(baseUrl);
    socketRef.current = socket;

    const cleanupRooms = handleRoomManagement(socket);
    const cleanupListeners = setupSocketListeners(socket);

    return () => {
      cleanupRooms();
      cleanupListeners();
      debouncedMessageHandler.current?.cancel();
    };
  }, [baseUrl, handleRoomManagement, setupSocketListeners]);

  const retryFailedMessage = useCallback(async (message: Message) => {
    const socket = socketRef.current;
    if (!socket || connectionStatus !== "connected") {
      retryQueueRef.current.push(message);
      return;
    }

    try {
      socket.emit("retryMessage", message);
      retryQueueRef.current = retryQueueRef.current.filter(
        (m) => m.id !== message.id
      );
    } catch (error) {
      console.error("Failed to retry message:", error);
    }
  }, []);

  const clearRetryQueue = () => {
    retryQueueRef.current = [];
  };

  useEffect(() => {
    if (connectionStatus === "connected" && retryQueueRef.current.length > 0) {
      const messagesToRetry = [...retryQueueRef.current];
      retryQueueRef.current = [];

      messagesToRetry.forEach((message) => {
        retryFailedMessage(message);
      });
    }
  }, [connectionStatus, retryFailedMessage]);

  return {
    connectionStatus,
    retryFailedMessage,
    clearRetryQueue,
  };
};
