import styled from "styled-components";

export const LayoutContainer = styled.div`
  display: flex;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 20px;
  width: 100%;
`;

export const SidebarContainer = styled.div`
  width: 80px;
  background-color: #ffc107;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
`;

export const RightContainer = styled.div`
  flex-grow: 1;
  display: flex;
  background-color: white;
`;

export const ConversationHistoryContainer = styled.div`
  overflow-y: auto;
  padding: 20px;
  border-bottom: 1px solid #ccc;
`;

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background-color: #f9f9f9;
`;
