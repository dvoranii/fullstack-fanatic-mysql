import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin: 3rem auto;
  width: clamp(500px, 60%, 800px);
  padding: 0 20px;
  position: relative;
  user-select: none;

  label {
    font-weight: bold;
    color: ${colors.primary};
    margin-bottom: 0.5rem;
    display: block;
  }

  div {
    display: flex;
    flex-direction: column;
  }
`;

export const InputField = styled.input`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 2px solid ${colors.white};
  background-color: rgba(228, 172, 27, 0.5);
  width: 100%;
  font-family: "Montserrat";
  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${colors.white};
  }
`;

export const TextArea = styled.textarea`
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border: 2px solid ${colors.white};
  background-color: rgba(228, 172, 27, 0.5);
  border-radius: 4px;
  resize: none;
  height: 150px;
  font-family: "Montserrat";

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${colors.white};
  }
`;

export const SubmitButton = styled.button`
  padding: 12px 24px;
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: ${colors.primary};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }

  &:disabled {
    background-color: ${colors.secondary};
    cursor: not-allowed;
  }
`;

export const NameEmailWrapper = styled.div`
  flex-direction: row !important;
  gap: 1.2rem;

  div {
    width: 100%;
  }
`;

export const SpinnerWrapper = styled.div`
  width: fit-content;
  margin: 0 auto;
`;
