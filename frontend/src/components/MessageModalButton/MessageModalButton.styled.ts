import styled from "styled-components";

interface BlockedProps {
  $isBlocked?: boolean;
}

export const BtnWrapper = styled.div`
  width: 100%;
`;

export const CustomIcon = styled.i`
  position: absolute;
  right: 25px;
  top: 15px;
  color: #fff;
`;

export const ButtonText = styled.span<BlockedProps>`
  position: relative;
  z-index: 1;
  font-family: "Alata";
  text-transform: uppercase;
  transition: color 0.3s ease;
  color: ${props => props.$isBlocked ? "#adb5bd" : "#ffa000"};
`;

export const ButtonIcon = styled.div<BlockedProps>`
  background-color: ${props => props.$isBlocked ? "#e9ecef" : "#ffa000"};
  width: 60px;
  height: 100%;
  position: absolute;
  right: -10px;
  top: 0;
  border-radius: 30px 30px 30px 0;
  transition: all 0.3s ease;
  color: #fff;

  &::after {
    content: "";
    width: 0;
    height: 0;
    border-top: 45px solid ${props => props.$isBlocked ? "#e9ecef" : "#fcfcfc"};
    border-right: 40px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

export const StyledButton = styled.a<BlockedProps>`
  width: clamp(170px, 3vw, 100%);
  height: 45px;
  display: inline-block;
  position: relative;
  background-color: ${props => props.$isBlocked ? "#e9ecef" : "#fcfcfc"};
  border-radius: 30px;
  text-align: center;
  font-size: 18px;
  padding: 9px 0;
  padding-right: 8px;
  margin: 12px 4px;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$isBlocked ? "none" : "0 4px 8px rgba(0, 0, 0, 0.2)"};
  color: ${props => props.$isBlocked ? "#adb5bd" : "#ffa000"};
  overflow: hidden;
  cursor: ${props => props.$isBlocked ? "not-allowed" : "pointer"};
  opacity: ${props => props.$isBlocked ? 0.7 : 1};

  &:hover {
    color: ${props => props.$isBlocked ? "#adb5bd" : "#fff"};
    
    ${ButtonText} {
      color: ${props => props.$isBlocked ? "#adb5bd" : "#fff"};
    }

    ${ButtonIcon} {
      width: ${props => props.$isBlocked ? "60px" : "130%"};
      background-color: ${props => props.$isBlocked ? "#e9ecef" : "#ffa000"};
      
      &::after {
        display: ${props => props.$isBlocked ? "block" : "none"};
      }
    }
  }
`;

export const SimpleButton = styled.button<BlockedProps>`
  background-color: ${props => props.$isBlocked ? "#6c757d" : "#007bff"};
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: ${props => props.$isBlocked ? "not-allowed" : "pointer"};
  font-size: 14px;
  transition: all 0.3s;
  opacity: ${props => props.$isBlocked ? 0.7 : 1};

  &:hover {
    background-color: ${props => props.$isBlocked ? "#6c757d" : "#0056b3"};
  }
`;