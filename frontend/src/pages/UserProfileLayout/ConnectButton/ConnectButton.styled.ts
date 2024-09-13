import styled from "styled-components";

// Icon container with sliding animation
export const ButtonIcon = styled.div`
  background-color: #ffa000;
  width: 92px;
  height: 100%;
  position: absolute;
  right: -10px;
  top: 0px;
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
    top: 0px;
    left: 0px;
  }

  &:hover {
    width: 100%;
    border-radius: 30px;
  }

  &:hover::after {
    display: none;
  }
`;

export const ButtonText = styled.span`
  position: relative;
  z-index: 9999;
  font-family: "Alata";
  text-transform: uppercase;
  transition: color 0.3s ease;
  color: #ffa000;
`;

export const StyledButton = styled.a`
  width: 100%;
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

export const CustomIcon = styled.i`
  position: absolute;
  right: 25px;
  top: 15px;
  color: #fff;
`;
