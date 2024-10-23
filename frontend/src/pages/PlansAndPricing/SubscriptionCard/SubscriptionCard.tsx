import React from "react";
import {
  CardWrapper,
  CardTitle,
  PriceTag,
  SubscribeButton,
  SubscribeButtonWrapper,
} from "./SubscriptionCard.styled";

interface SubscriptionCardProps {
  title: string;
  price: string;
  frequency: string;
  buttonLabel: string;
  highlighted?: boolean;
  children: React.ReactNode;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  price,
  frequency,
  buttonLabel,
  highlighted,
  children,
}) => {
  return (
    <CardWrapper highlighted={highlighted}>
      <CardTitle>{title}</CardTitle>
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
