import React from "react";
import { InputWrapper, Label, Input } from "./styles/InputField.styled";

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  placeholder: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  id,
  placeholder,
}) => (
  <InputWrapper>
    <Label htmlFor={id}>{label}</Label>
    <Input type={type} id={id} placeholder={placeholder} />
  </InputWrapper>
);

export default InputField;
