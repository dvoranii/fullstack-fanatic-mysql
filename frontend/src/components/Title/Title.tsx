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
  className?: string;
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
  className,
}) => {
  const nonBreakingText = textContent.replace(/\s+/g, "\u00A0");
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
        className={className}
      >
        {nonBreakingText}
      </StyledTitle>
    </TitleWrapper>
  );
};

export default Title;
