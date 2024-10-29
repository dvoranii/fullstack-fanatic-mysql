import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

export const ShoppingCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;

  p {
    margin: 0;
    font-size: 0.9rem;
  }

  span {
    font-size: 0.9rem;
    font-weight: bold;
  }

  button {
    background: none;
    border: none;
    color: #ff4b4b;
    cursor: pointer;
    font-size: 0.8rem;

    &:hover {
      color: #ff1a1a;
    }
  }
`;

export const CartDetails = styled.div`
  padding-top: 10px;
  text-align: right;

  p {
    font-weight: bold;
    font-size: 1rem;
    margin: 10px 0;
    padding-bottom: 1.2rem;
  }
`;

export const ClearCartBtnWrapper = styled.div`
  width: 100%;
  margin-top: 1.8rem;

  button {
    border: none;
    padding: 4px 8px;
  }
`;

export const ShoppingCartContentWrapper = styled.div`
  padding: 20px;
`;

export const CartItemTitleWrapper = styled.div`
  max-width: 200px;
  min-width: 200px;
`;

export const CheckoutBtn = styled.button`
  background-color: ${colors.secondary};
  border: none;
  color: ${colors.primary};
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
  transition: all 150ms ease;
  font-size: 1rem;
  height: fit-content;

  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
  }
`;

export const ViewCartLink = styled(Link)`
  background-color: ${colors.primary};
  color: ${colors.white};
  font-weight: bold;
  padding: 8px;
  border-radius: 4px;
  transition: all 150ms ease;
  height: fit-content;
  font-size: 1rem;

  &:hover {
    background-color: ${colors.secondary};
    color: ${colors.primary};
  }
`;

export const CartBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
`;
