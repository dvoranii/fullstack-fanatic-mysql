import styled from "styled-components";
import { colors } from "../../GlobalStyles";

export const BlogDetailWrapper = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;

  h1 {
    color: ${colors.primary};
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
    text-align: center;
    padding-top: 2.4rem;
    padding-bottom: 1.2rem;
    user-select: none;
  }

  @media screen and (max-width: 400px) {
    max-width: 100vw;
  }
`;
