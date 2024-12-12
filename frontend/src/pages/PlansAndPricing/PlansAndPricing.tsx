import { Helmet } from "react-helmet-async";
import { useRef } from "react";
import {
  PlansAndPricingContainerOuter,
  PageBGWrapper,
  CardsContainer,
  PayPerPostWrapper,
  PayPerPostTextWrapper,
  ConsultationSectionWrapperInner,
  ConsultationSectionWrapperOuter,
  ScrollButton,
  SwirlyImgBgWrapper,
  ConsultationContentWrapper,
  ConsultationTextWrapper,
  ConsultationImgWrapper,
  ConsultFormTitleWrapper,
} from "./PlansAndPricing.styled";
import Title from "../../components/Title/Title";
import BGSwoosh from "../../assets/images/plansAndPricing/Ellipse7.svg";
import SquaresAndTriangles from "../../assets/images/SquaresAndTriangles.svg";
import SubscriptionCard from "./SubscriptionCard/SubscriptionCard";
import SwirlyLineImg from "../../assets/images/swirly-line-bg.svg";
import ConsultationImg from "../../assets/images/plansAndPricing/consultation-image.jpg";
import ConsultationForm from "./ConsultationForm/ConsultationForm";
import { Link } from "react-router-dom";

const PlansAndPricing: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Helmet>
        <title>Plans and Pricing - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Plans and pricing for access to our premium content."
        />
      </Helmet>
      <PlansAndPricingContainerOuter>
        <PageBGWrapper>
          <img
            src={BGSwoosh}
            alt="decorative background swoosh"
            className="bg-swoosh"
          />
          <img
            src={SquaresAndTriangles}
            alt="decorative background squares and triangles"
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
                <strong>No Commitment:</strong> Perfect for those who prefer a
                la carte learning.
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
              price="$20"
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
          <img src={SwirlyLineImg} className="swirly-1" alt="" />
        </PageBGWrapper>

        <PayPerPostWrapper>
          <Title textContent={"Pay per post"} />
          <PayPerPostTextWrapper>
            <p>
              Looking for flexibility? Only need the info from a specific
              tutorial or blog post? Then the the <b>Pay Per Post</b> option is
              your best bet, granting you access to premium content without the
              commitment of a full subscription.This allows you to curate your
              premium content collection in a more personalized way, choosing
              only what’s most relevant to your needs and interests, while
              keeping costs under control:
            </p>

            <ul>
              <li>
                <Link to="/tutorials">
                  <b>Tutorials :</b>
                </Link>
                &nbsp;Dive deep into our high-quality tutorials starting from{" "}
                <b>$3</b> up to <b>$5</b>, providing you with in-depth guides
                and expert knowledge.
              </li>
              <li>
                <Link to="/blogs">
                  <b>Blogs :</b>
                </Link>
                &nbsp;Access premium articles for <b>as little as $2</b>,
                featuring exclusive insights, tips, and industry updates.
              </li>
            </ul>
            <p>
              Pay Per Post is perfect if you prefer a customized learning path
              or only need specific content without a long-term commitment.
              <br></br>
              Get the knowledge you’re looking for, exactly when you need it,
              exactly the way you want it.
            </p>
          </PayPerPostTextWrapper>
        </PayPerPostWrapper>

        <SwirlyImgBgWrapper>
          <img src={SwirlyLineImg} className="swirly-2" alt="" />
        </SwirlyImgBgWrapper>

        <ConsultationSectionWrapperOuter>
          <img
            src={SquaresAndTriangles}
            alt=""
            className="bg-squares-and-triangles"
          />
          <ConsultationSectionWrapperInner>
            <Title textContent={"Consultations"} />
            <ConsultationContentWrapper>
              <ConsultationTextWrapper>
                {" "}
                <p>
                  Need personalized guidance or expert advice? Our 1-on-1
                  consultations are the perfect opportunity to get tailored
                  assistance directly from our team. Whether you're looking to
                  enhance your skills, dive deeper into complex topics, or need
                  answers to questions about any of our tutorials, we’re here to
                  help!
                </p>
                <ul>
                  <li>
                    <b>Exclusive for Yearly Members:</b> As a yearly subscriber,
                    you’ll receive 5 complimentary 15-minute consultations
                    throughout the year—a value-added perk to get the most out
                    of your subscription.
                  </li>
                </ul>
                <p>
                  To request a consultation, simply{" "}
                  <ScrollButton onClick={scrollToForm}>
                    fill out the request form
                  </ScrollButton>
                  , and we’ll get back to you to schedule a time that works best
                  for you. Let’s work together to help you achieve your goals!
                </p>
              </ConsultationTextWrapper>
              <ConsultationImgWrapper>
                <img
                  src={ConsultationImg}
                  alt="Consultation Graphic"
                  title="Consultation"
                />
              </ConsultationImgWrapper>
            </ConsultationContentWrapper>
          </ConsultationSectionWrapperInner>
          <ConsultFormTitleWrapper>
            <h2>Book Now</h2>
          </ConsultFormTitleWrapper>

          <ConsultationForm formRef={formRef} />
        </ConsultationSectionWrapperOuter>
      </PlansAndPricingContainerOuter>
    </>
  );
};

export default PlansAndPricing;
