import styled from "styled-components";
import { SearchBarWrapper } from "../../../../components/SearchBar/SearchBar.styled";

export const ConvoHistoryContainer = styled.div`
  width: 30%;

  ${SearchBarWrapper} {
    margin-top: 20px;
  }
`;

export const ConversationWrapper = styled.div`
  border: 1px solid grey;
  border-radius: 4px;
  margin: 10px;
  padding: 10px;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    background-color: #eee;
  }
`;

export const ReadFilterWrapper = styled.div`
  width: 100%;
  text-align: right;
  padding-right: 1.4rem;
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
