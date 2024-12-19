import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const UserListWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    li {
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      /* margin: 10px 0; */
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }
  }

  p {
    color: ${colors.primary};
  }

  @media screen and (max-width: 768px) {
    ul > li {
      flex-direction: column;
    }
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${colors.secondary};
  font-size: 18px;
  margin-top: 20px;
`;

export const FollowButtonsWrapper = styled.div`
  display: flex;
  button {
    margin: 10px;
    padding: 4px;
    background-color: ${colors.primary};
    border: none;
    padding: 8px 16px;
    color: ${colors.white};
    text-transform: uppercase;
    letter-spacing: 1px;
    border-radius: 4px;
    transition: all 150ms ease;
  }

  button:hover {
    background: ${colors.secondary};
    color: ${colors.primary};
  }

  @media screen and (max-width: 768px) {
    padding-top: 1.2rem;
  }

  /* @media screen and (max-width: 475px) {
    flex-direction: row;
  } */
`;

export const UserInfoWrapper = styled.div`
  margin-left: 20px;

  h5,
  h4 {
    transition: all 150ms ease;
  }

  h4 {
    font-family: "Roboto", sans-serif;
  }

  h5 {
    font-weight: 400;
  }

  h4:hover,
  h5:hover {
    text-shadow: 2px 2px 2px rgba(255, 175, 43, 0.5);
  }
`;

export const UserLinkWrapperInner = styled.div`
  display: flex;
  align-items: center;

  img {
    transition: all 150ms ease;
  }

  img:hover {
    background: lightgrey;
  }
`;
