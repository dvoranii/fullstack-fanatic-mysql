import {
  CTAWrapperOuter,
  CTAWrapperInner,
  ImgWrapper,
  BrainImg,
  ContentWrapper,
  TextWrapper,
  LinksWrapper,
  CTALink,
  SubtextWrapper,
} from "./CTASection.styled";
import BrainGraphic from "../../../assets/images/brain sides-cuate.svg";
import { useEffect, useState } from "react";

const CTASection: React.FC = () => {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1100);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1100);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <CTAWrapperOuter>
      <CTAWrapperInner>
        {isLargeScreen && (
          <ImgWrapper>
            <picture>
              <source srcSet={BrainGraphic} media="(min-width: 1100px)" />
              <BrainImg
                src={BrainGraphic}
                loading="lazy"
                alt="brain image"
              ></BrainImg>
            </picture>
          </ImgWrapper>
        )}
        <ContentWrapper>
          <TextWrapper>
            <h2>Think Smarter. Build Better.</h2>
            <SubtextWrapper>
              <h3>
                Get the full stack experience by signing up or reaching out.
              </h3>
            </SubtextWrapper>
          </TextWrapper>
          <LinksWrapper>
            <CTALink to="/contact">
              <span>Contact</span>
            </CTALink>

            <CTALink to="/register">
              <span>Sign Up!</span>
            </CTALink>
          </LinksWrapper>
        </ContentWrapper>
      </CTAWrapperInner>
    </CTAWrapperOuter>
  );
};

export default CTASection;
