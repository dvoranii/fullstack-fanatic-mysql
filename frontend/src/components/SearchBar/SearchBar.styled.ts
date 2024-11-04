import styled from "styled-components";
import { colors } from "../../GlobalStyles";

interface SearchBarWrapperOuterProps {
  paddingLeft?: string;
}

export const SearchBarWrapperOuter = styled.div<SearchBarWrapperOuterProps>`
  padding-left: ${(props) => props.paddingLeft || "120px"};
`;

interface SearchBarWrapperInnerProps {
  width?: string;
}

export const SearchBarWrapperInner = styled.div<SearchBarWrapperInnerProps>`
  border: 2px solid rgba(0, 0, 0, 0.5);
  display: flex;
  width: ${(props) => props.width || "25%"};
  height: fit-content;
  border-radius: 4px;
  user-select: none;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.15);

  input {
    border: none;
    caret-color: ${colors.primary};
    width: 100%;

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
  background-color: #eee;

  &:hover {
    cursor: pointer;
    background-color: #ddd;
  }
`;

export const SearchInputWrapper = styled.div`
  width: 100%;
  background-color: #ffffff;
  ::placeholder {
    font-size: 0.9rem;
  }
  input {
    height: 100%;
    padding-left: 0.4rem;
  }
`;

export const SearchIconImg = styled.img`
  width: 30px;
  padding: 4px;
`;
