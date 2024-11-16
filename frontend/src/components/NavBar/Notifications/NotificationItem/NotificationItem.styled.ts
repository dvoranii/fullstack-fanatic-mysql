import styled from "styled-components";
import { colors } from "../../../../GlobalStyles";

interface NotificationItemWrapperProps {
  isRead: boolean;
}

export const NotificationItemWrapper = styled.div<NotificationItemWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ isRead }) => (isRead ? "#fff" : "#f0f8ff")};

  p {
    ${({ isRead }) =>
      !isRead &&
      `
      font-weight: bold;
      color: #000;
    `}
    margin: 0;
    padding: 0 10px;
  }

  &:hover {
    ${({ isRead }) => !isRead && `background-color: #f5f5f5; cursor:pointer;`}
  }
`;

export const NotificationMessage = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  padding: 10px;
  width: 100%;
`;

export const NotificationLinkWrapper = styled.div`
  a {
    font-size: 0.8rem;
    background-color: ${colors.primary};
    padding: 6px;
    color: white;
    border-radius: 4px;
    transition: all 150ms ease;

    &:hover {
      cursor: pointer;
      background-color: ${colors.primary_hover};
    }
  }
`;

export const NotificationTimeWrapper = styled.div`
  width: 100%;
  text-align: right;

  time {
    font-size: 12px;
    padding-bottom: 0.4rem;
    margin: 0;
    padding: 0;
  }
`;
