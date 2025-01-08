import Title from "../../../components/Title/Title";
import {
  SwirlyImgBgWrapper,
  PageBGWrapper,
  CardsContainer,
} from "./SubscriptionSection.styled";

import SubscriptionCard from "./SubscriptionCard/SubscriptionCard";

const SubscriptionSection: React.FC = () => {
  return (
    <>
      <PageBGWrapper>
        <img
          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/Ellipse7.svg"
          alt="decorative background swoosh"
          className="bg-swoosh"
        />
        <img
          src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/SquaresAndTriangles.svg"
          alt="decorative background squares and triangles"
          className="bg-squares-and-triangles"
        />
        <Title
          textContent={"Plans And Pricing"}
          className="plans-and-pricing-title"
        />
        <CardsContainer>
          <SubscriptionCard
            title="STARTER"
            price="$5"
            frequency="Month"
            buttonLabel="SUBSCRIBE"
            className="first-card"
            priceId="price_1QWNa3Lg43ij91cK9fevMMvV"
          >
            <li>
              <strong>Cheap:</strong> Only $5 for access to all premium basic
              content as well as access to all user features.
            </li>
            <li>
              <strong>Affordable:</strong> Access individual tutorials for as
              little as $3 each.
            </li>
            <li>
              <strong>No Commitment:</strong> Perfect for those who prefer a la
              carte learning.
            </li>
          </SubscriptionCard>
          <SubscriptionCard
            title="PREMIUM"
            price="$125"
            frequency="Year"
            buttonLabel="SUBSCRIBE"
            highlighted
            className="premium"
            priceId="price_1QAEHFLg43ij91cKJ9Ofrpt5"
          >
            <li>
              <strong>Best Value:</strong> Save more with our yearly
              subscription plan.
            </li>
            <li>
              <strong>All Access Pass:</strong> Unlimited access to all
              tutorials, blogs, and premium content.
            </li>
            <li>
              <strong>Skill Tracking:</strong> Monitor your progress with
              detailed analytics and skill assessments.
            </li>
          </SubscriptionCard>
          <SubscriptionCard
            title="CASUAL PRO"
            price="$20"
            frequency="Month"
            buttonLabel="SUBSCRIBE"
            className="third-card"
            priceId="price_1QAEHFLg43ij91cKjwxB2FCZ"
          >
            <li>
              <strong>Unlimited Access:</strong> Get access to all tutorials.
            </li>
            <li>
              <strong>Cost-Effective:</strong> Save more with a monthly fee of
              $9.99.
            </li>
            <li>
              <strong>Premium Features:</strong> Access to competence tests,
              exclusive content, and more.
            </li>
          </SubscriptionCard>
        </CardsContainer>
        <SwirlyImgBgWrapper>
          <img
            src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/swirly-line-bg.svg"
            className="swirly-1"
            alt="swirly line"
          />
        </SwirlyImgBgWrapper>
      </PageBGWrapper>
    </>
  );
};

export default SubscriptionSection;
