import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

export const FormComponentContainer = styled.div`
  position: relative;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 35%,
    rgba(240, 240, 240, 1) 62%,
    rgba(204, 204, 204, 1) 100%
  );

  .swoosh-bg {
    position: absolute;
    top: -100px;
    width: 100%;
    height: 400px;
  }
`;

export const ConsultationFormWrapperOuter = styled.div`
  width: 100%;
  padding-bottom: 2.4rem;
  position: relative;
  padding-top: 1.2rem;
`;

export const ConsultationFormWrapper = styled.div`
  max-width: 60%;
  margin: 0 auto;
  caret-color: ${colors.secondary};
  user-select: none;
  z-index: 999;

  label {
    font-family: "ZenKakuGothicNewRegular", sans-serif;
    text-transform: uppercase;
    font-size: 0.8rem;
    color: ${colors.primary};
    font-weight: bold;
    margin-bottom: 4px;
  }

  input {
    padding: 4px 4px 4px 8px;
    font-family: "ZenKakuGothicNewRegular", sans-serif;
    border-radius: 8px;
    border: 1px solid grey;

    &:focus {
      outline: 1px solid ${colors.primary};
    }
  }
`;
export const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const TextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;

  textarea {
    max-width: 100%;
    min-width: 100%;
    max-height: 250px;
    min-height: 100px;
    height: 150px;
    padding: 8px;
    font-family: "ZenKakuGothicNewRegular", sans-serif;
    border-radius: 8px;
    border: 1px solid grey;
  }
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const SubmitBtnWrapper = styled.div`
  width: 100%;

  button {
    padding: 8px 16px;
    margin-top: 10px;
    background-color: ${colors.primary};
    color: ${colors.white};
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 150ms ease;

    &:hover {
      background-color: ${colors.secondary};
      color: ${colors.primary};
    }
  }
`;
