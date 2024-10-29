import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const FollowListWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    li {
      user-select: none;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px;
      margin: 10px 0;
      background-color: white;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    }
  }

  p {
    color: ${colors.primary};
  }
`;

export const FollowTitleBanner = styled.div`
  padding: 20px;
  background-color: ${colors.secondary};

  h2 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: ${colors.secondary};
  font-size: 18px;
  margin-top: 20px;
`;

export const FollowButtonsWrapper = styled.div`
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
`;

export const FollowerInfoWrapper = styled.div`
  margin-left: 20px;

  height: 4px;

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
export const FollowerLinkWrapperInner = styled.div`
  display: flex;

  img {
    transition: all 150ms ease;
  }

  img:hover {
    background: lightgrey;
  }
`;
