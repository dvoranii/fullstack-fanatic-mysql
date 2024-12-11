import styled from "styled-components";

export const Burger = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isopen",
})<{ isopen: boolean }>`
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
  right: 20px;
  top: 20px;
  user-select: none;

  div {
    width: 100%;
    height: 4px;
    background-color: #333;
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
  }

  div:nth-child(1) {
    transform: ${({ isopen }) =>
      isopen ? "translateY(10px) rotate(45deg)" : "translateY(0) rotate(0)"};
  }

  div:nth-child(2) {
    opacity: ${({ isopen }) => (isopen ? 0 : 1)};
  }

  div:nth-child(3) {
    transform: ${({ isopen }) =>
      isopen ? "translateY(-10px) rotate(-45deg)" : "translateY(0) rotate(0)"};
  }

  @media (min-width: 989px) {
    display: none;
  }
`;
