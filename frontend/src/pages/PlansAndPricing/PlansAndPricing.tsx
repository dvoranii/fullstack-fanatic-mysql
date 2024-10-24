import { PageBGWrapper, CardsContainer } from "./PlansAndPricing.styled";
import Title from "../../components/Title/Title";
import BGSwoosh from "../../assets/images/plansAndPricing/Ellipse7.svg";
import SquaresAndTriangles from "../../assets/images/plansAndPricing/SquaresAndTriangles.svg";
import SubscriptionCard from "./SubscriptionCard/SubscriptionCard";

const PlansAndPricing: React.FC = () => {
  return (
    <>
      <PageBGWrapper>
        <img src={BGSwoosh} alt="" className="bg-swoosh" />
        <img
          src={SquaresAndTriangles}
          alt=""
          className="bg-squares-and-triangles"
        />
        <Title textContent={"Plans And Pricing"} />
        <CardsContainer>
          <SubscriptionCard
            title="STARTER"
            price="$5"
            frequency="Month"
            buttonLabel="SUBSCRIBE"
            className="first-card"
          >
            <ul>
              <li>
                <strong>Cheap:</strong> Only $5 for access to all premium basic
                content as well as access to all user features.
              </li>
              <li>
                <strong>Affordable:</strong> Access individual tutorials for as
                little as $3 each.
              </li>
              <li>
                <strong>No Commitment:</strong> Perfect for those who prefer a
                la carte learning.
              </li>
            </ul>
          </SubscriptionCard>
          <SubscriptionCard
            title="PREMIUM"
            price="$125"
            frequency="Year"
            buttonLabel="SUBSCRIBE"
            highlighted
            className="premium"
          >
            <ul>
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
            </ul>
          </SubscriptionCard>
          <SubscriptionCard
            title="CASUAL PRO"
            price="$15"
            frequency="Month"
            buttonLabel="SUBSCRIBE"
            className="third-card"
          >
            <ul>
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
            </ul>
          </SubscriptionCard>
        </CardsContainer>
      </PageBGWrapper>

      <Title textContent={"Pay per post"} />
    </>
  );
};

export default PlansAndPricing;
