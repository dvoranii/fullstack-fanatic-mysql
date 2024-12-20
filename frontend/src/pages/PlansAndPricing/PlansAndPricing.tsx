import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PlansAndPricingContainerOuter } from "./PlansAndPricing.styled";

import PayPerPost from "./PayPerPost/PayPerPost";
import SubscriptionSection from "./Subscriptions/SubscriptionSection";
import ConsultationSection from "./Consultation/ConsultationSection";

const PlansAndPricing: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

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
        <SubscriptionSection />
        <PayPerPost />
        <ConsultationSection />
      </PlansAndPricingContainerOuter>
      <div style={{ height: "0" }}>&nbsp;</div>
    </>
  );
};

export default PlansAndPricing;
