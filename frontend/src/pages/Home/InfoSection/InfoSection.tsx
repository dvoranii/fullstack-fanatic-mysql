import {
  InfoSectionWrapper,
  Card,
  CardTitle,
  CardContent,
  CardLink,
  InfoSectionWrapperInner,
  CardImgWrapper,
  CardLinkWrapper,
} from "./InfoSection.styled";

import MasterImage from "../../../assets/images/Amico-images/master-amico.svg";
import ApplyImage from "../../../assets/images/Amico-images/apply-amico.svg";
import CustomizeImage from "../../../assets/images/Amico-images/customization-amico.svg";

const InfoSection: React.FC = () => {
  return (
    <InfoSectionWrapper>
      <InfoSectionWrapperInner>
        <Card>
          <CardTitle>Master</CardTitle>
          <CardContent>
            Industry-relevant skills with tutorials designed for real-world job
            scenarios.
          </CardContent>
          <CardLinkWrapper>
            <CardLink href="#">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper>
            <img src={MasterImage} alt="" />
          </CardImgWrapper>
        </Card>
        <Card>
          <CardTitle>Apply</CardTitle>
          <CardContent>
            Apply your knowledge with hands-on projects.
          </CardContent>
          <CardLinkWrapper>
            <CardLink href="#">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper>
            <img src={ApplyImage} alt="" />
          </CardImgWrapper>
        </Card>
        <Card>
          <CardTitle>Customize</CardTitle>
          <CardContent>
            Customize your learning path by saving and prioritizing tutorials
            that fit your goals.
          </CardContent>
          <CardLinkWrapper>
            <CardLink href="#">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper className="card-3">
            <img src={CustomizeImage} alt="" />
          </CardImgWrapper>
        </Card>
      </InfoSectionWrapperInner>
    </InfoSectionWrapper>
  );
};

export default InfoSection;