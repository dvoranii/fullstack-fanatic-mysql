import React from "react";
import {
  CardWrapper,
  CardTitle,
  PriceTag,
  SubscribeButton,
  SubscribeButtonWrapper,
  CardTitleWrapper,
  MedalWrapper,
} from "./SubscriptionCard.styled";
import GoldenMedalImg from "../../../assets/images/plansAndPricing/golden-medal.svg";

interface SubscriptionCardProps {
  title: string;
  price: string;
  frequency: string;
  buttonLabel: string;
  highlighted?: boolean;
  children: React.ReactNode;
  className?: string;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  frequency,
  buttonLabel,
  highlighted,
  children,
  className,
}) => {
  return (
    <CardWrapper highlighted={highlighted} className={className}>
      {highlighted && (
        <MedalWrapper>
          <img src={GoldenMedalImg} alt="Golden Medal" />
        </MedalWrapper>
      )}
      <CardTitleWrapper>
        <CardTitle highlighted={highlighted}>{title}</CardTitle>
      </CardTitleWrapper>

      {children}
      <PriceTag highlighted={highlighted}>
        {price}
        <span>/{frequency}</span>
      </PriceTag>
      <SubscribeButtonWrapper>
        <SubscribeButton highlighted={highlighted}>
          {buttonLabel}
        </SubscribeButton>
      </SubscribeButtonWrapper>
    </CardWrapper>
  );
};

export default SubscriptionCard;
