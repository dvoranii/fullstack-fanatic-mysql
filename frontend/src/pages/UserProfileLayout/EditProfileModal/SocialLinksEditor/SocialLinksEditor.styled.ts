import styled from "styled-components";

export const SocialLinkWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.4rem;

  button {
    padding: 2px 6px;
    height: fit-content;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  border-radius: 50%;
  margin-left: 0.8rem;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`;

export const SocialMenuDropdown = styled.select`
  margin-top: 1.2rem;
  padding: 4px;

  &:hover {
    cursor: pointer;
  }

  @media screen and (max-width: 375px) {
    margin-top: 0.4rem;
  }
`;
