import styled from "styled-components";
import { colors } from "../../../../GlobalStyles";

interface NotificationItemWrapperProps {
  isUnread: boolean;
}

export const NotificationItemWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isUnread",
})<NotificationItemWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: ${({ isUnread }) => (isUnread ? "#f0f8ff" : "#fff")};

  p {
    ${({ isUnread }) =>
      isUnread &&
      `
      font-weight: bold;
      color: #000;
    `}
    margin: 0;
    padding: 0 10px;
  }

  &:hover {
    ${({ isUnread }) =>
      isUnread && `background-color: #f5f5f5; cursor:pointer;`}
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
