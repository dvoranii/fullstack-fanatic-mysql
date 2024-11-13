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
    height: 45vh;
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
  margin-top: 1.8rem;
`;

export const TextInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 750px;
  margin: 0 auto;
  width: 95%;
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
  margin: 10px 0px 10px 0px;
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

export const NewChatBarWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: flex-end;
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
`;
