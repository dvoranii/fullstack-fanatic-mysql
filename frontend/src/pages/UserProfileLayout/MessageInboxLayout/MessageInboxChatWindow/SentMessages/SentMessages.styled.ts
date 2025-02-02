import styled from "styled-components";

interface SentMessageWrapperProps {
  issender: boolean;
}

export const SentMessageWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "issender",
})<SentMessageWrapperProps>`
  padding: 10px 20px;
  margin: 10px 20px;
  width: fit-content;
  max-width: 60%;
  background-color: ${({ issender }) => (issender ? "#007bff" : "#28a745")};
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-left: ${({ issender }) => (issender ? "auto" : "20px")};
  margin-right: ${({ issender }) => (issender ? "20px" : "auto")};

  @media screen and (max-width: 645px) {
    max-width: 100%;
    width: 75%;
  }

  @media screen and (max-width: 451px) {
    padding: 8px 16px;
    img {
      display: none;
    }
  }
`;

export const SenderName = styled.strong`
  font-weight: bold;
  color: #fff;
  font-family: "Roboto", sans-serif;
  letter-spacing: 0.5px;

  width: fit-content;
`;

export const MessageText = styled.p`
  font-size: 1.1rem;
  color: #fff;
  width: 100%;
  text-align: left;
  margin-top: 10px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const MessageTimestamp = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== "issender",
})<SentMessageWrapperProps>`
  font-size: 0.8rem;
  color: #222;
  margin-top: 5px;
  font-style: italic;
  text-align: ${({ issender }) => (issender ? "right" : "left")};
`;
