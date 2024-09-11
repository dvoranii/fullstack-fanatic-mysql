import styled from "styled-components";
export const Burger = styled.div<{ isOpen: boolean }>`
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  cursor: pointer;
  z-index: 1001;
  margin-top: 1.2rem;
  margin-right: 1.2rem;
  position: ${({ isOpen }) =>
    isOpen ? "fixed" : "absolute"}; /* Fixed when open */
  right: 20px; /* Adjust to your needs */
  top: 20px; /* Adjust to your needs */

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
