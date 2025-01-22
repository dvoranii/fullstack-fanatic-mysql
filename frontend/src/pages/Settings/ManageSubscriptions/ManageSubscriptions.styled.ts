import styled from "styled-components";

export const SubscriptionPageWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1.8rem 1.2rem 12.8rem 1.2rem;
`;
export const SubscriptionOptionDropdown = styled.div`
  display: flex;

  span {
    font-weight: bold;
    letter-spacing: 0.2px;
  }

  select {
    margin-left: 0.5rem;
    cursor: pointer;
  }
`;

export const CancelButton = styled.button`
  width: fit-content;
  padding: 4px 8px;
  margin-top: 1.2rem;
  user-select: none;
`;

export const PremiumText = styled.p.withConfig({
  shouldForwardProp: (prop) => prop !== "isPremium",
})<{ isPremium: boolean }>`
  font-size: 1rem;
  font-weight: bold;
  margin: 10px 0;

  .premium-level {
    color: ${(props) => (props.isPremium ? "green" : "")};
  }
`;
