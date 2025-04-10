import { styled } from "styled-components";
import { colors } from "../../../GlobalStyles";

interface FollowBtnProps {
  $isBlocked?: boolean;
  $isFollowing?: boolean;
}

export const FollowBtn = styled.button<FollowBtnProps>`
  background-color: ${props => 
    props.$isBlocked ? "grey": colors.primary};
  color: ${colors.white};
  font-family: "Alata", sans-serif;
  padding: 12px 24px;
  font-size: 1rem;
  text-transform: uppercase;
  border: none;
  border-radius: 30px;
  margin: 0 auto;
  cursor: ${props => props.$isBlocked ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.$isBlocked ? 0.7 : 1};
  transition: all 0.2s ease;

  &:hover {
    filter: ${props => props.$isBlocked ? "" : "brightness(1.5)"};
  }

  &:disabled {
    opacity: 0.6;
  }
`;
