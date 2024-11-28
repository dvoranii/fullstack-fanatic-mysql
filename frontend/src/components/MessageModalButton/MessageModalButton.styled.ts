// MessageModalButton.styled.ts
import styled from "styled-components";

// Simple button styling
export const SimpleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

// Button text styling
export const ButtonText = styled.span`
  position: relative;
  z-index: 1;
  font-family: "Alata";
  text-transform: uppercase;
  transition: color 0.3s ease;
  color: #ffa000;
`;

// Icon container with sliding animation
export const ButtonIcon = styled.div`
  background-color: #ffa000;
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
    border-top: 45px solid #fcfcfc;
    border-right: 40px solid transparent;
    position: absolute;
    top: 0;
    left: 0;
  }

  &:hover {
    width: 100%;
    border-radius: 30px;
  }

  &:hover::after {
    display: none;
  }
`;

// Custom icon styling
export const CustomIcon = styled.i`
  position: absolute;
  right: 25px;
  top: 15px;
  color: #fff;
`;

// Complex button styling for "publicUser" variant
export const StyledButton = styled.a`
  width: clamp(170px, 3vw, 100%);
  height: 45px;
  display: inline-block;
  position: relative;
  background-color: #fcfcfc;
  border-radius: 30px;
  text-align: center;
  font-size: 18px;
  padding: 9px 0;
  padding-right: 8px;
  margin: 20px 5px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  color: #ffa000;
  overflow: hidden;

  &:hover {
    color: #fff;
    cursor: pointer;
  }

  &:hover ${ButtonIcon} {
    width: 130%;
  }

  &:hover ${ButtonText} {
    color: #fff;
  }
`;
