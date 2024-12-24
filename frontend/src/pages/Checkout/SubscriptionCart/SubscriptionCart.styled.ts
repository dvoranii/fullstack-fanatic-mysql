import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const SubscriptionCartWrapper = styled.div`
  max-width: 80vw;
  margin: 0 auto;
  padding: 6.4rem 1.2rem 6.4rem 1.2rem;

  @media screen and (max-width: 913px) {
    padding: 4.8rem 1.2rem 4.8rem 1.2rem;
  }
  @media screen and (max-width: 768px) {
    padding: 3.2rem 1.2rem 3.2rem 1.2rem;
  }

  @media screen and (max-width: 400px) {
    max-width: 90vw;
  }
`;

export const ViewCartTitleBanner = styled.div`
  width: 100%;
  background-color: ${colors.secondary};
  color: ${colors.primary};
  text-align: left;
  padding: 20px;
  font-size: 1rem;
  font-weight: bold;

  h1 {
    margin: 0;
    text-transform: uppercase;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: clamp(1.4rem, 3vw, 1.8rem);
      text-align: center;
    }
  }
`;

export const CartPageWrapperInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px 0;

  .mobile-divider {
    width: 100%;
    display: none;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 3.2rem;

    .mobile-divider {
      display: block;
    }
  }
`;

export const CartItemsWrapper = styled.div`
  flex: 0 0 65%;
  width: 65%;
  padding: 20px;
  background-color: ${colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  position: relative;

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid ${colors.secondary};
  padding-bottom: 20px;
`;

export const CartItemImgWrapper = styled.div`
  user-select: none;

  img {
    width: clamp(70px, 6vw, 100px);
    height: auto;
    margin-right: 20px;
  }
`;

export const CartItemDetails = styled.div`
  flex-grow: 1;

  h3 {
    margin: 0 0 10px;
    font-weight: bold;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 10px;
    font-size: 0.9rem;
    color: ${colors.black};
  }
`;

export const RemoveButton = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.primary_hover};
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.3s;
  position: absolute;
  right: 0;
  top: 0;
  padding: 10px 20px;

  &:hover {
    color: ${colors.secondary};
  }
`;

export const OrderSummary = styled.div`
  flex: 0 0 30%;
  max-width: 30%;
  padding: 20px;
  background-color: ${colors.white};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: left;

  h4 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 10px;
    font-size: 1rem;
    color: ${colors.black};
  }

  @media screen and (max-width: 768px) {
    max-width: 100%;
    width: 100%;
  }
`;

export const ProceedToCheckoutButton = styled.button`
  background-color: ${colors.primary};
  color: ${colors.white};
  padding: 15px 20px;
  width: 100%;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${colors.primary_hover};
  }
`;
