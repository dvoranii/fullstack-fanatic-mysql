import React from "react";
import { StyledTitle, TitleWrapper } from "./Title.styled";

interface TitleProps {
  textContent: string;
  pseudoRight?: string;
  pseudoBottom?: string;
  pseudoWidth?: string;
  pseudoHeight?: string;
  pseudoColor?: string;
  textColor?: string;
  fontWeight?: number;
}
const Title: React.FC<TitleProps> = ({
  textContent,
  textColor,
  pseudoRight,
  pseudoBottom,
  pseudoWidth,
  pseudoHeight,
  pseudoColor,
  fontWeight,
}) => {
  return (
    <TitleWrapper>
      <StyledTitle
        pseudoRight={pseudoRight}
        pseudoBottom={pseudoBottom}
        pseudoWidth={pseudoWidth}
        pseudoHeight={pseudoHeight}
        pseudoColor={pseudoColor}
        textColor={textColor}
        fontWeight={fontWeight}
      >
        {textContent}
      </StyledTitle>
    </TitleWrapper>
  );
};

export default Title;
