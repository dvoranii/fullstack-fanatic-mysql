import styled from "styled-components";

interface WrapperProps {
  $isLogin: boolean;
}

export const FormWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const FormTitleWrapper = styled.div<WrapperProps>`
  padding-top: 20px;
  cursor: ${({ $isLogin }) => ($isLogin ? "pointer" : "default")};
`;

export const FormTitle = styled.h2<WrapperProps>`
  font-family: "ZenKakuGothicNewMedium";
  color: ${({ $isLogin }) => ($isLogin ? "background" : "primary")};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${({ $isLogin }) => ($isLogin ? "40px" : "20px")};
  font-size: ${({ $isLogin }) => ($isLogin ? "1.5rem" : "1.2rem")};
  transition: all 150ms ease;
  transition-delay: ${({ $isLogin }) => ($isLogin ? "250ms" : "0ms")};
  user-select: none;

  &:hover {
    color: ${({ $isLogin }) => ($isLogin ? "secondary" : "primary")};
  }
`;
