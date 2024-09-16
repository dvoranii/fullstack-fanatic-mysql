import styled from "styled-components";
import { colors } from "../../GlobalStyles";

interface WrapperProps {
  $isLogin: boolean;
}

const commonInputStyles = `
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid ${colors.primary};
`;

export const RegisterLoginFormOuter = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: -40px;
`;

export const RegisterLoginFormWrapperInner = styled.div<WrapperProps>`
  width: clamp(450px, 40vw, 600px);
  background-color: ${({ $isLogin }) =>
    $isLogin ? colors.primary : colors.background};
  border-radius: 40px;
  margin: 10vh auto;
  overflow: hidden;
  height: 700px;
  position: relative;
  transition: all 0.25s ease-in-out;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 20px 60px;
  width: 100%;
`;

export const RegisterFormWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;

export const FormLabel = styled.label`
  font-family: "ZenKakuGothicNewRegular";
  display: block;
  font-size: 0.8rem;
  margin-bottom: 0.4rem;
  font-weight: bold;
`;

export const Input = styled.input`
  ${commonInputStyles}

  &::placeholder {
    font-family: "ZenKakuGothicNewRegular";
  }
`;

export const SubmitButton = styled.button`
  padding: 10px;
  background-color: ${colors.secondary};
  font-size: 1.2rem;
  text-transform: uppercase;
  width: fit-content;
  margin: 10px auto;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  color: ${colors.white};
  font-weight: bold;
  box-shadow: 0px 4px 8px rgba(20, 33, 61, 0.4);

  span {
    color: ${colors.primary};
    -webkit-text-fill-color: ${colors.white};
    -webkit-text-stroke: 1px;
  }
`;

export const FormTitle = styled.h2<WrapperProps>`
  font-family: "ZenKakuGothicNewMedium";
  color: ${colors.primary};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${({ $isLogin }) => ($isLogin ? "40px" : "20px")};
  font-size: ${({ $isLogin }) => ($isLogin ? "1.5rem" : "1.2rem")};
  transition: all 150ms ease;
  transition-delay: ${({ $isLogin }) => ($isLogin ? "250ms" : "0ms")};
  user-select: none;
`;

export const RegisterFormTitleWrapper = styled.div<WrapperProps>`
  padding-top: 20px;
  cursor: ${({ $isLogin }) => ($isLogin ? "pointer" : "default")};

  ${FormTitle} {
    font-size: ${({ $isLogin }) => ($isLogin ? "1.2rem" : "1.6rem")};
    color: ${({ $isLogin }) => ($isLogin ? colors.background : colors.primary)};
    margin-top: -1.4rem;
    letter-spacing: 1.4px;
    transition-delay: 0ms;

    &:hover {
      color: ${({ $isLogin }) =>
        $isLogin ? colors.secondary : colors.primary};
    }
  }
`;

export const LoginFormTitleWrapper = styled.div<WrapperProps>`
  padding: 18px;
  border-top-right-radius: 80px;
  border-top-left-radius: 80px;
  cursor: pointer;
  transition: all 150ms ease;

  ${FormTitle} {
    font-size: ${({ $isLogin }) => ($isLogin ? "1.6rem" : "1.2rem")};
    margin-bottom: 0;
    transition: all 250ms ease;
    transition-delay: 250ms;
  }

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const LoginFormWrapperOuter = styled.div<WrapperProps>`
  background: ${({ $isLogin }) =>
    $isLogin ? colors.background : colors.white};

  position: absolute;
  top: ${({ $isLogin }) => ($isLogin ? "10%" : "91%")};
  width: 100%;
  height: 100%;
  border-top-right-radius: 76px;
  border-top-left-radius: 76px;
  transition: top 0.5s ease-in-out;
`;

export const LoginFormWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #999;
  font-family: "ZenKakuGothicNewRegular", sans-serif;
  font-size: 0.8rem;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #999;
  }

  &::before {
    margin-right: 0.5em;
  }

  &::after {
    margin-left: 0.5em;
  }
`;

export const GoogleSignInButton = styled.button`
  border: none;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "ZenKakuGothicNewMedium";
  width: fit-content;
  margin: 0 auto;
  border-radius: 20px;
  transition: all 150ms ease;

  img {
    margin-right: 10px;
    width: 25px;
  }

  &:hover {
    background-color: #357ae8;
    color: whitesmoke;
    cursor: pointer;
  }
`;
