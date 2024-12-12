import styled from "styled-components";

export const ResetPasswordWrapper = styled.div`
  padding: 20px;
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
  margin-bottom: 8px;
  color: #14213d;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  border: 2px solid #14213d;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s ease-in-out;

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
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #e59400;
  }

  &:active {
    background-color: #d08300;
  }
`;
