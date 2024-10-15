import React from "react";
import { StyledTitle, TitleWrapper } from "./Title.styled";

interface TitleProps {
  textContent: string;
  pseudoRight?: string;
  pseudoBottom?: string;
  pseudoWidth?: string;
  pseudoHeight?: string;
}
const Title: React.FC<TitleProps> = ({
  textContent,
  pseudoRight,
  pseudoBottom,
  pseudoWidth,
  pseudoHeight,
}) => {
  return (
    <TitleWrapper>
      <StyledTitle
        pseudoRight={pseudoRight}
        pseudoBottom={pseudoBottom}
        pseudoWidth={pseudoWidth}
        pseudoHeight={pseudoHeight}
      >
        {textContent}
      </StyledTitle>
    </TitleWrapper>
  );
};

export default Title;
