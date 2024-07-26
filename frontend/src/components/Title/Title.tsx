import React from "react";
import { StyledTitle } from "./Title.styled";

interface TitleProps {
  textContent: string;
}

const Title: React.FC<TitleProps> = ({ textContent }) => {
  return <StyledTitle>{textContent}</StyledTitle>;
};

export default Title;
