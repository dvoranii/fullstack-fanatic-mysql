import styled from "styled-components";

export const ConversationWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  margin-top: 10px;
  padding: 10px;
  transition: all 150ms ease;
  position: relative;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }

  &:has(.delete-button:hover) {
    background-color: transparent;
  }

  @media screen and (max-width: 981px) {
    display: flex;
    flex-direction: column;
    width: 85px;
    min-width: 85px;
    height: 120px;
  }
  @media screen and (max-width: 375px) {
    display: flex;
  }
`;

export const ProfilePictureWrapper = styled.div`
  user-select: none;

  @media screen and (max-width: 981px) {
    display: flex;
    justify-content: center;
  }
`;

export const ConversationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  user-select: none;

  @media screen and (max-width: 981px) {
    p {
      line-height: 1;
      text-align: center;
    }
  }
`;

export const SubjectPreview = styled.p`
  font-size: 0.9rem;
  color: gray;

  @media screen and (max-width: 981px) {
    display: none;
  }
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

  @media screen and (max-width: 981px) {
    button {
      position: absolute;
      left: 4px;
      bottom: 0;
    }
  }
`;
