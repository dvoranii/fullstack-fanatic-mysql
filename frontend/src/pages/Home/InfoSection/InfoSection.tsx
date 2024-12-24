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
            <CardLink href="/tutorials">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper>
            <img
              src="/assets/images/Amico-images/master-amico.svg"
              alt="Master Image"
              loading="lazy"
              width="250"
              height="257"
            />
          </CardImgWrapper>
        </Card>
        <Card>
          <CardTitle>Apply</CardTitle>
          <CardContent>
            Apply your knowledge with real-world hands-on projects.
          </CardContent>
          <CardLinkWrapper>
            <CardLink href="/tutorials">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper>
            <img
              src="/assets/images/Amico-images/apply-amico.svg"
              alt="Apply Image"
              loading="lazy"
              width="250"
              height="250"
            />
          </CardImgWrapper>
        </Card>
        <Card>
          <CardTitle>Customize</CardTitle>
          <CardContent>
            Customize your learning path by saving and prioritizing tutorials
            that fit your goals.
          </CardContent>
          <CardLinkWrapper>
            <CardLink href="/tutorials">See more</CardLink>
          </CardLinkWrapper>
          <CardImgWrapper className="card-3">
            <img
              src="/assets/images/Amico-images/customization-amico.svg"
              alt="Customize Image"
              loading="lazy"
              width="250"
              height="250"
            />
          </CardImgWrapper>
        </Card>
      </InfoSectionWrapperInner>
    </InfoSectionWrapper>
  );
};

export default InfoSection;
