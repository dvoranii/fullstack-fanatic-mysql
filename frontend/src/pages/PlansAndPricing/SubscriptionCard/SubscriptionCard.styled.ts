import styled from "styled-components";
import { colors } from "../../../GlobalStyles";

interface CardWrapperProps {
  highlighted?: boolean;
}

interface PriceTagProps {
  highlighted?: boolean;
}

interface SubmitButtonprops {
  highlighted?: boolean;
}

export const CardWrapper = styled.div<CardWrapperProps>`
  background: ${({ highlighted }) => (highlighted ? "#14213D" : "white")};
  color: ${({ highlighted }) => (highlighted ? "white" : "inherit")};
  border-bottom-left-radius: 25px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 300px;
  margin: 20px;
`;

export const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  font-weight: bold;
  padding-top: 20px;
  text-align: center;
`;

export const CardFeatures = styled.ul`
  list-style: none;
  margin: 15px 0;
  text-align: left;
  padding: 0 20px 20px 20px;

  li {
    margin-bottom: 10px;
    font-size: 0.9rem;
  }
`;

export const PriceTag = styled.div<PriceTagProps>`
  font-size: 2rem;
  font-weight: bold;
  text-align: center;
  color: ${({ highlighted }) =>
    highlighted ? `${colors.white}` : `${colors.primary}`};
  background: ${({ highlighted }) =>
    highlighted
      ? `linear-gradient(
          180deg,
          rgba(255, 175, 43, 1) 10%,
          rgba(255, 222, 166, 1) 50%,
          rgba(255, 175, 43, 1) 83%
        )`
      : `${colors.secondary}`};
  padding: 10px;
  margin: 20px 0;
  ${({ highlighted }) =>
    highlighted &&
    `
      text-shadow: 1px 1px 0 black, -1px 1px 0 black, 1px -1px 0 black, -1px -1px 0 black;
    `}

  span {
    font-size: 1rem;
    font-weight: normal;
  }
`;

export const SubscribeButtonWrapper = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
`;

export const SubscribeButton = styled.button<SubmitButtonprops>`
  background-color: lightgrey;
  color: ${({ highlighted }) =>
    highlighted ? `${colors.primary}` : `${colors.primary}`};
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-weight: bold;
  &:hover {
    ${({ highlighted }) =>
      highlighted
        ? `
          background-color: white;
          color: ${colors.primary};
        `
        : `
          background-color: #0047be;
        `}
  }
`;
