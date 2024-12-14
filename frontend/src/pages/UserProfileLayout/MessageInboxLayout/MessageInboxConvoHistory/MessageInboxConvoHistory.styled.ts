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

export const ConversationItemWrapper = styled.div`
  width: 100%;
  overflow-x: scroll;
  @media screen and (max-width: 981px) {
    display: flex;
    gap: 10px;
    overflow-x: scroll;
    max-width: 67vw;
    border: 1px solid grey;
    padding: 10px;
    margin-top: 1.2rem;
  }

  @media screen and (max-width: 510px) {
    max-width: 76vw;
  }
`;
