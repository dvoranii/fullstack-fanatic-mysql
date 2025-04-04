import styled from "styled-components";

export const ForgotPasswordWrapper = styled.div`
  padding: 80px 0px;

  @media screen and (max-width: 550px) {
    padding: 140px 0px;
  }

`;

export const Title = styled.h2`
  font-family: "ZenKakuGothicNewMedium";
  font-size: 1.8rem;
  text-align: center;
  margin-bottom: 20px;
  color: #14213d;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-family: "ZenKakuGothicNewRegular";
  font-size: 1rem;
  padding-bottom: 8px;
  color: #14213d;
  margin: 0 auto;
  text-align:center;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #14213d;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease-in-out;
  width: clamp(200px, 20vw,400px);
  margin: 0 auto;

  &:focus {
    border-color: #fca311;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;
export const SubmitButton = styled.button`
  padding: 10px;
  background-color: #fca311;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  width: fit-content;
  margin: 0 auto;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e59400;
  }

  &:active {
    background-color: #d08300;
  }
`;
