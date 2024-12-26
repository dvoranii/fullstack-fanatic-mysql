import { styled } from "styled-components";

export const NewChatDropdownWrapper = styled.div`
  position: absolute;
  left: -37%;
  top: 14%;
  width: fit-content;
`;

export const UserItemsWrapper = styled.div`
  padding: 10px;
  max-height: 120px;
  overflow-y: scroll;
`;

export const UserItems = styled.div`
  transition: all 150ms ease;
  border-bottom: 1px solid #eee;
  padding: 8px 0 8px 8px;
  display: flex;
  align-items: center;
  gap: 10px;
  &:hover {
    background-color: #eee;
    cursor: pointer;
  }

  &:last-child {
    border-bottom-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom: none;
  }
`;
