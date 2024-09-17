import React, { useState, useEffect } from "react";
import { Message } from "../../../../../types/Message";
import {
  SentMessageWrapper,
  SenderName,
  MessageText,
  MessageTimestamp,
} from "./SentMessages.styled";
import { getMessagesForConversation } from "../../../../../services/messageService";

interface SentMessagesProps {
  conversationId: number;
}

const SentMessages: React.FC<SentMessagesProps> = ({ conversationId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesForConversation(conversationId);
        setMessages(data);
      } catch (err) {
        setError("Failed to load messages");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [conversationId]);

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      {messages.map((message) => (
        <SentMessageWrapper key={message.id}>
          <MessageText>
            <SenderName>
              {message.sender_id === conversationId
                ? "You"
                : `User ${message.receiver_id}`}
            </SenderName>
            : {message.content}
          </MessageText>
          <MessageTimestamp>{message.sent_at}</MessageTimestamp>
        </SentMessageWrapper>
      ))}
    </>
  );
};

export default SentMessages;
