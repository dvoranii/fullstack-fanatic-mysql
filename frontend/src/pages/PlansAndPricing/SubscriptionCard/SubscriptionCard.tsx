import { useContext } from "react";
import {
  CardWrapper,
  CardTitle,
  PriceTag,
  SubscribeButton,
  SubscribeButtonWrapper,
  CardTitleWrapper,
  MedalWrapper,
  CardFeatures,
} from "./SubscriptionCard.styled";
import GoldenMedalImg from "../../../assets/images/plansAndPricing/golden-medal.svg";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../types/CartItem";
import SubscriptionIcon from "../../../assets/images/plansAndPricing/subscription-icon.png";

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
  const { addSubscriptionToCart = () => {} } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    if (addSubscriptionToCart) {
      const subscriptionItem: CartItem = {
        id: Math.floor(Math.random() * 10000),
        title,
        price: parseFloat(price.replace("$", "")),
        image: SubscriptionIcon,
        description: `${title} - ${frequency}`,
        type: "subscription",
      };

      addSubscriptionToCart(subscriptionItem);
      navigate("/my-subscription-cart");
    }
  };

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

      <CardFeatures>{children}</CardFeatures>
      <PriceTag highlighted={highlighted}>
        {price}
        <span>/{frequency}</span>
      </PriceTag>
      <SubscribeButtonWrapper>
        <SubscribeButton
          highlighted={highlighted}
          onClick={handleSubscribeClick}
        >
          {buttonLabel}
        </SubscribeButton>
      </SubscribeButtonWrapper>
    </CardWrapper>
  );
};

export default SubscriptionCard;
