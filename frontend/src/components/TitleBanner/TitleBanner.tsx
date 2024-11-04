import React from "react";
import { TitleBannerWrapper } from "./TitleBanner.styled";

interface TitleBannerProps {
  textContent: string;
}

const TitleBanner: React.FC<TitleBannerProps> = ({ textContent }) => {
  return (
    <TitleBannerWrapper>
      <h2>{textContent}</h2>
    </TitleBannerWrapper>
  );
};

export default TitleBanner;
