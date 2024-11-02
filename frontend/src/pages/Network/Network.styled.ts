import { styled } from "styled-components";
import { colors } from "../../GlobalStyles";

export const NetworkTitleBanner = styled.div`
  padding: 20px;
  background-color: ${colors.secondary};

  h2 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const SearchBarWrapper = styled.div`
  margin-top: 40px;
`;

export const UserListWrapper = styled.div``;

export const NetworkDefaultContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  h3 {
    padding-top: 2.4rem;
    text-align: center;
  }
`;

export const NetworkIconWrapper = styled.div`
  user-select: none;
  img {
    width: 150px;
    padding-top: 2.4rem;
  }
`;
