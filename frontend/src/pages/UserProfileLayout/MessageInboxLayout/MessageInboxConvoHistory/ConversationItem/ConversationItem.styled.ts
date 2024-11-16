import styled from "styled-components";

export const ConversationWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  margin-top: 10px;
  padding: 10px;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }

  &:has(.delete-button:hover) {
    background-color: transparent;
  }

  @media screen and (max-width: 375px) {
    height: 80px;
    display: flex;
  }
`;

export const ProfilePictureWrapper = styled.div`
  margin-right: 10px;
  user-select: none;
`;

export const ConversationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;
`;

export const SubjectPreview = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

export const DeleteConvoButtonWrapper = styled.div`
  width: 100%;
  display: block;
  text-align: right;
  user-select: none;
  button {
    background: transparent;
    border: none;

    img {
      width: 20px;

      &:hover {
        filter: brightness(0.9);
      }
    }
  }
`;
