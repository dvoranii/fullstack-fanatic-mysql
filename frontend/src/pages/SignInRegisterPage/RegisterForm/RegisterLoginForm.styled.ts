import styled from "styled-components";
import checkIcon from "../../../assets/images/check-icon.png";

interface WrapperProps {
  isLogin: boolean;
}

// Define color variables for reuse
const colors = {
  primary: "#14213d",
  secondary: "#ffb923",
  background: "#e5e5e5",
  white: "#ffffff",
};

// Common input and button styles
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
`;

export const RegisterLoginFormWrapperInner = styled.div<WrapperProps>`
  width: clamp(350px, 30vw, 500px);
  background-color: ${({ isLogin }) =>
    isLogin ? colors.primary : colors.background};
  border-radius: 40px;
  margin: 0 auto;
  overflow: hidden;
  height: 600px;
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

export const TermsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 12px 0 10px;

  input[type="checkbox"] {
    display: none;
  }

  label {
    font-size: 0.8rem;
    position: relative;
    padding-left: 29px;
    cursor: pointer;
  }

  label::before {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #ccc;
    border-radius: 4px;
    display: inline-block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    background-color: ${colors.white};
  }

  label::after {
    content: "";
    display: none;
    position: absolute;
    left: 6%;
    top: 6%;
    transform: translate(-50%, -50%);
    width: 30px;
    height: 30px;
    background-image: url(${checkIcon});
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
  }

  input[type="checkbox"]:checked + label::after {
    display: block;
  }
`;

export const FormTitle = styled.h2<WrapperProps>`
  font-family: "ZenKakuGothicNewMedium";
  color: ${colors.primary};
  text-transform: uppercase;
  text-align: center;
  margin-bottom: ${({ isLogin }) => (isLogin ? "40px" : "20px")};
  font-size: ${({ isLogin }) => (isLogin ? "1.5rem" : "1.2rem")};
  transition: all 150ms ease;
  transition-delay: ${({ isLogin }) => (isLogin ? "250ms" : "0ms")};
  user-select: none;
`;

export const RegisterFormTitleWrapper = styled.div<WrapperProps>`
  padding-top: 20px;
  cursor: ${({ isLogin }) => (isLogin ? "pointer" : "default")};

  ${FormTitle} {
    font-size: ${({ isLogin }) => (isLogin ? "1.2rem" : "1.6rem")};
    color: ${({ isLogin }) => (isLogin ? colors.background : colors.primary)};
    margin-top: -1.4rem;
    letter-spacing: 1.4px;
    transition-delay: 0ms;

    &:hover {
      color: ${({ isLogin }) => (isLogin ? colors.secondary : colors.primary)};
    }
  }
`;

export const LoginFormTitleWrapper = styled.div<WrapperProps>`
  padding: 20px;
  border-top-right-radius: 80px;
  border-top-left-radius: 80px;
  cursor: pointer;
  transition: all 150ms ease;

  ${FormTitle} {
    font-size: ${({ isLogin }) => (isLogin ? "1.6rem" : "1.2rem")};
    margin-bottom: 0;
    transition: all 250ms ease;
    transition-delay: 250ms;
  }

  &:hover {
    background-color: ${colors.secondary};
  }
`;

export const LoginFormWrapperOuter = styled.div<WrapperProps>`
  background: ${colors.white};
  position: absolute;
  top: ${({ isLogin }) => (isLogin ? "10%" : "89%")};
  width: 100%;
  height: 100%;
  border-top-right-radius: 76px;
  border-top-left-radius: 76px;
  transition: top 0.5s ease-in-out;
`;

export const LoginFormWrapperInner = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
