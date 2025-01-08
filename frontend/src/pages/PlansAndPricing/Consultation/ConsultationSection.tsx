import React, { useRef } from "react";
import {
  ConsultationSectionWrapperOuter,
  ConsultationSectionWrapperInner,
  ConsultationContentWrapper,
  ConsultationTextWrapper,
  ConsultationImgWrapper,
  ConsultFormTitleWrapper,
  ScrollButton,
} from "./ConsultationSection.styled";
import Title from "../../../components/Title/Title";
import ConsultationForm from "./ConsultationForm/ConsultationForm";

const ConsultationSection: React.FC = () => {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <ConsultationSectionWrapperOuter>
      <img
        src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/bg-images/SquaresAndTriangles.svg"
        alt="squares and triangles"
        className="bg-squares-and-triangles"
        aria-hidden="true"
      />
      <ConsultationSectionWrapperInner id="consultation-section">
        <Title textContent={"Consultations"} className="consultation-title" />
        <ConsultationContentWrapper>
          <ConsultationTextWrapper>
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
                throughout the year—a value-added perk to get the most out of
                your subscription.
              </li>
            </ul>
            <p>
              To request a consultation, simply{" "}
              <ScrollButton onClick={scrollToForm}>
                fill out the request form
              </ScrollButton>
              , and we’ll get back to you to schedule a time that works best for
              you. Let’s work together to help you achieve your goals!
            </p>
          </ConsultationTextWrapper>
          <ConsultationImgWrapper>
            <img
              src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/plansAndPricing/consultation-image.jpg"
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
  );
};

export default ConsultationSection;
