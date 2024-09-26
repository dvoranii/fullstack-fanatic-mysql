import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

interface NotificationItemProps {
  isUnread: boolean;
}

export const NavIconWrapper = styled.div`
  position: relative;
  display: flex;
`;

export const NavIconImg = styled.img`
  width: 30px;
  margin: 10px;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    filter: invert(1);
  }
`;

export const NotificationCounter = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px 6px;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16px;
  height: 16px;
`;

export const NotificationContentWrapper = styled.div`
  padding: 10px;
  width: 350px;
  height: 300px;
  overflow-y: auto;
`;

export const NotificationItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isUnread",
})<NotificationItemProps>`
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
    color: ${colors.white};
    border-radius: 4px;

    &:hover {
      cursor: pointer;
    }
  }
`;
