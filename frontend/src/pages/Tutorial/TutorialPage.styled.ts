import styled from "styled-components";

export const TutorialWrapper = styled.div`
  padding: 0 40px 0 40px;
  margin: 0 auto;
  max-width: 80vw;

  @media screen and (max-width: 768px) {
    max-width: clamp(600px, 100vw, 1800px);
    padding: 0px 10px;
  }
`;
