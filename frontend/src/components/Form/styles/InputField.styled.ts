import styled from "styled-components";

const colors = {
  primary: "#14213d",
};

const commonInputStyles = `
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px;
  border: 2px solid ${colors.primary};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
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
