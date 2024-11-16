import styled from "styled-components";

export const ConvoHistoryContainer = styled.div`
  width: 100%;
  padding: 15px;

  @media screen and (max-width: 375px) {
    padding-top: 0;
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

export const SearchBarReadFilterWrapper = styled.div`
  display: flex;
`;
