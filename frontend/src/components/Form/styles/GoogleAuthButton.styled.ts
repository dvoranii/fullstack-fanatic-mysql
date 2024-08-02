import styled from "styled-components";

export const GoogleSignInButton = styled.button`
  border: none;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "ZenKakuGothicNewMedium";
  width: fit-content;
  margin: 0 auto;
  border-radius: 20px;
  transition: all 150ms ease;

  img {
    margin-right: 10px;
    width: 25px;
  }

  &:hover {
    background-color: #357ae8;
    color: whitesmoke;
    cursor: pointer;
  }
`;
