import styled from "styled-components";

export const ChatWindowContainerOuter = styled.div`
  padding: 10px 30px;
  display: flex;
  flex-direction: column;
  height: 75vh;
  width: 100%;
  gap: 20px;
  justify-content: space-between;
  background-color: #eee;
  border: 2px solid black;
  border-radius: 8px;
  overflow: hidden;

  @media screen and (max-width: 981px) {
    padding: 0px;
    width: 94%;
    margin: 0 auto;
    height: 77vh;
    gap: 10px;
  }
`;

export const ChatWindowContainerInner = styled.div`
  border: 1px solid #666666;
  background-color: #ffffff;
  margin: 0 auto;
  width: 95%;
  max-width: 750px;
  height: calc(100vh - 200px);
  overflow-y: auto;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 0 auto;
  width: 95%;
  user-select: none;
`;

export const ChatInput = styled.textarea`
  vertical-align: top;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  overflow-wrap: break-word;
  word-wrap: break-word;
  resize: none;
  font-family: "ZenKakuGothicNewMedium", sans-serif;
  font-size: 14px;
  width: 100%;
`;

export const ChatSubmitButton = styled.button`
  width: 80px;
  padding: 10px;

  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 0.75px;
  transition: all 150ms ease;
  align-self: flex-end;

  &:hover {
    background-color: #14213d;
  }
`;

export const NewChatBarWrapperOuter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;
export const NewChatBarWrapperInner = styled.div`
  padding: 20px;
  user-select: none;
  position: relative;
  width: fit-content;
`;
export const NewChatBar = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  background-color: #fff;
  align-items: center;
  padding: 8px 16px;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  font-family: "Roboto", sans-serif;
  font-weight: bold;
  img {
    width: 20px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  border-bottom: 1px solid #ccc;
`;

export const ClearButtonWrapper = styled.div`
  user-select: none;
  button {
    background: none;
    border: none;
    font-size: 1.2rem;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
`;

export const EmojiPickerButton = styled.button`
  width: fit-content;
  height: fit-content;
  font-size: 1.2rem;
  border-radius: 8px;
  border: none;
  background-color: #007bff;
  transition: all 250ms ease;

  &:hover {
    filter: brightness(1.15);
  }
`;
export const ButtonsWrapper = styled.div`
  width: 100%;
  margin: 10px 0px 10px 0px;
  display: flex;
  justify-content: space-between;
  position: relative;
  user-select: none;
`;

export const PickerWrapper = styled.div`
  position: absolute;
  bottom: 110%;
  left: 0;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  border-radius: 8px;

  @media (max-width: 981px) {
    width: 90vw;
    max-height: 40vh;
    overflow-y: auto;
  }

  @media screen and (max-width: 768px) {
    width: 60vw;
  }
`;
