import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const TitleBannerWrapper = styled.div`
  padding: 20px;
  background-color: ${colors.secondary};
  user-select: none;

  h2 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;
