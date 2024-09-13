import styled from "styled-components";
import { SearchBarWrapper } from "../../../../components/SearchBar/SearchBar.styled";

export const ConvoHistoryContainer = styled.div`
  width: 30%;

  ${SearchBarWrapper} {
    margin-top: 20px;
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
