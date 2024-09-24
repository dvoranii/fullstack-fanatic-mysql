import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const FollowListWrapper = styled.div`
  ul {
    list-style: none;
    padding: 0;
    li {
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
  }
`;
