import styled from "styled-components";

export const SearchBarWrapper = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.5);
  display: flex;
  width: 90%;
  height: fit-content;
  border-radius: 4px;
  user-select: none;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);

  input {
    width: 98%;
    border: none;
    caret-color: #ffb923;

    &:focus-visible {
      outline: none;
    }
  }
`;

export const SearchIconWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  transition: all 150ms ease;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

export const SearchInputWrapper = styled.div`
  ::placeholder {
    font-size: 0.7rem;
  }
  input {
    height: 100%;
  }
`;

export const SearchIconImg = styled.img`
  width: 30px;
  padding: 4px;
`;
