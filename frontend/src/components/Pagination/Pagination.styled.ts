import styled from "styled-components";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`;

export const PageButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive?: boolean }>`
  background-color: ${(props) => (props.isActive ? "#FFA723" : "#fff")};
  color: ${(props) => (props.isActive ? "#fff" : "#000")};
  border: 2px solid #ffa723;
  border-radius: 8px;
  margin: 0 0.5rem;
  padding: 0rem 1rem;
  cursor: pointer;
  font-size: 1.2rem;
  user-select: none;

  &:disabled {
    background-color: #ccc;
    border: none;
    color: #666;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background-color: ${(props) => (!props.isActive ? "#ffebcc" : "#FFA723")};
    color: ${(props) => (!props.isActive ? "#000" : "#fff")};
  }

  span {
    font-size: 1.8rem;
  }
`;
