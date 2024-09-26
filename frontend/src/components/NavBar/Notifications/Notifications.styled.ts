import styled from "styled-components";

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
