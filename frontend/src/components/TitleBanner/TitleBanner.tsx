import React from "react";
import { TitleBannerWrapper } from "./TitleBanner.styled";

interface TitleBannerProps {
  textContent: string;
  centered?: boolean;
}

const TitleBanner: React.FC<TitleBannerProps> = ({
  textContent,
  centered = false,
}) => {
  return (
    <TitleBannerWrapper centered={centered}>
      <h2>{textContent}</h2>
    </TitleBannerWrapper>
  );
};

export default TitleBanner;
