import styled from "styled-components";

export const ContactPageWrapper = styled.div`
  background-color: #fca311;
  position: relative;
  border-bottom: 4px solid white;

  h1 {
    border-top: 2px solid black;
    width: fit-content;
    margin-top: 4.8rem;
  }
`;

export const ImgWrapper = styled.div`
  img {
    position: absolute;
  }
  .elipse {
    width: 250px;
    bottom: 0;
  }

  .triangle {
    width: 100px;
    top: 100px;
    right: 0;
  }
`;
