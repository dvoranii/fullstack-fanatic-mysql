import styled from "styled-components";

export const ConversationWrapper = styled.div<{ $isBlocked?: boolean }>`
  cursor: ${props => props.$isBlocked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isBlocked ? 0.7 : 1};
  border: 1px solid grey;
  border-radius: 4px;
  padding: 10px;
  transition: all 150ms ease;
  position: relative;

  &:hover {
    background-color: #eee;
  }

  &:has(.delete-button:hover) {
    background-color: transparent;
  }

  @media screen and (max-width: 981px) {
    display: flex;
    flex-direction: column;
    min-width: 120px;
    max-width: 120px;

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
      font-size: 1rem;
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

export const BlockedBadge = styled.span`
  color: #ff4d4f;
  font-size: 0.8em;
  margin-left: 8px;
`;