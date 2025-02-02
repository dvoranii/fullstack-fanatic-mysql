import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

export const ViewCartTitleBanner = styled.div`
  padding: 20px;
  background-color: ${colors.secondary};

  h1 {
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export const CartPageWrapperInner = styled.div`
  display: flex;
  gap: 2.4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 4.8rem 2.4rem 4.8rem 2.4rem;

  .mobile-divider {
    display: none;
  }

  @media screen and (max-width: 625px) {
    flex-direction: column;

    .mobile-divider {
      display: block;
    }
  }
`;

export const CartItemsWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CartItem = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 1rem;
  position: relative;
  user-select: none;

  img {
    width: 100px;
    height: auto;
    object-fit: cover;
    border-radius: 8px;
  }

  @media screen and (max-width: 425px) {
    flex-direction: column;
    gap: 1.2rem;
    text-align: center;
  }
`;

export const CartItemDetails = styled.div`
  margin-left: 1rem;
  flex-grow: 1;

  h3 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin: 0.3rem 0;
  }
`;

export const RemoveButton = styled.button`
  position: absolute;
  top: 4px;
  right: 8px;
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  transition: all 150ms ease;

  &:hover {
    color: #444;
  }
`;

export const OrderSummary = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  padding: 1.5rem;
  border-radius: 8px;
  align-self: flex-start;
  h4 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }

  p {
    margin: 0.5rem 0;
  }

  @media screen and (max-width: 625px) {
    width: 100%;
  }
`;

export const ProceedToCheckoutButton = styled.button`
  width: 100%;
  background-color: #0066cc;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  margin-top: 1rem;

  &:hover {
    background-color: #005bb5;
  }
`;
