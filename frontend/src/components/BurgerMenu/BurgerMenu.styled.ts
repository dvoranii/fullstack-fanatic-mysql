import styled from "styled-components";

export const Burger = styled.div`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  z-index: 1001;
  margin-top: 2.2rem;
  margin-right: 1.2rem;

  div {
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
  }

  @media (min-width: 915px) {
    display: none;
  }
`;
