import styled from "styled-components";

export const ConvoHistoryContainer = styled.div`
  width: 100%;
  padding: 15px;

  @media screen and (max-width: 375px) {
    padding-top: 0;
  }
`;

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

export const ReadFilterWrapper = styled.div`
  width: 100%;
  text-align: left;
  padding-left: 15px;
  caret-color: transparent;

  p {
    font-size: 0.8rem;
    margin-top: 0.4rem;
    padding-right: 20px;

    .bold {
      font-weight: 700;
      color: #14213d;
    }

    .normal {
      font-weight: normal;
      color: #14213d;
    }

    span:hover {
      cursor: pointer;
    }
  }
`;

export const ProfilePictureWrapper = styled.div`
  margin-right: 10px;
`;

export const ConversationDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const SubjectPreview = styled.p`
  font-size: 0.9rem;
  color: gray;
`;

export const SearchBarReadFilterWrapper = styled.div`
  display: flex;
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
