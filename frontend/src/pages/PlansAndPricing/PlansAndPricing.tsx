import {
  PageBGWrapper,
  CardsContainer,
  PayPerPostWrapper,
  PayPerPostTextWrapper,
} from "./PlansAndPricing.styled";
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
            price="$15"
            frequency="Month"
            buttonLabel="SUBSCRIBE"
            className="third-card"
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
      </PageBGWrapper>

      <PayPerPostWrapper>
        <Title textContent={"Pay per post"} />
        <PayPerPostTextWrapper>
          <p>
            Looking for flexibility? Choose the <b>Pay Per Post </b>option and
            get premium content without the commitment of a subscription! This
            allows you to access individual posts—both tutorials and blogs—based
            on your interests and needs:
          </p>

          <ul>
            <li>
              <b>Tutorials:</b> Dive deep into our high-quality tutorials
              starting from $3 up to $5, providing you with in-depth guides and
              expert knowledge.
            </li>
            <li>
              <b>Blogs:</b> Access premium articles for as little as $2,
              featuring exclusive insights, tips, and industry updates.
            </li>
          </ul>
          <p>
            Pay Per Post is perfect if you prefer a customized learning path or
            only need specific content without a long-term commitment. Get the
            information you need when you need it, without breaking the bank!
          </p>
        </PayPerPostTextWrapper>
      </PayPerPostWrapper>
    </>
  );
};

export default PlansAndPricing;
