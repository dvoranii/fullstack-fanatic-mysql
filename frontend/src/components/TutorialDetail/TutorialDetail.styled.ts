import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const TutorialDetailWrapper = styled.div`
  padding: 1.2rem;

  h1 {
    color: ${colors.primary};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top: 2.4rem;
    padding-bottom: 1.2rem;
    user-select: none;
  }
`;
