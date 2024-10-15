import styled from "styled-components";

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
  }

  button {
    background-color: #ffa723;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover {
      background-color: #ff8c00;
    }
  }
`;

export const ClearCartBtnWrapper = styled.div`
  width: 100%;
`;

export const ShoppingCartContentWrapper = styled.div`
  padding: 20px;
`;

export const CartItemTitleWrapper = styled.div`
  max-width: 200px;
  min-width: 200px;
`;
