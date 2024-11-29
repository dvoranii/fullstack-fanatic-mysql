import styled from "styled-components";
import { PageWrapper, PageWrapperProps } from "../../../PageWrapper.styled";

export const MessageInboxPageWrapper = styled(PageWrapper)<PageWrapperProps>`
  min-width: fit-content;
  @media screen and (max-width: 421px) {
    max-width: 100vw;
    padding: 15px;
  }
`;

export const LayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 0.05fr 1fr;
  width: 100%;
  height: 80vh;
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 20px;
  width: 100%;

  @media screen and (max-width: 981px) {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
`;

export const RightContainer = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  max-height: 620px;

  @media screen and (max-width: 981px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 3fr;
    max-height: 740px;
  }

  @media screen and (max-width: 375px) {
    grid-template-rows: 1fr 3fr;
  }
`;

export const ConversationHistoryContainer = styled.div`
  overflow-y: auto;
  padding: 20px;
  width: 100%;
  border-bottom: 1px solid #ccc;
`;

export const ChatWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 20px;
  background-color: #f9f9f9;
`;
