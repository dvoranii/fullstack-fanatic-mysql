import React from "react";
import { Burger } from "./BurgerMenu.styled";

interface BurgerMenuProps {
  onClick: () => void;
  isOpen: boolean;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick, isOpen }) => (
  <Burger onClick={onClick} isOpen={isOpen}>
    <div></div>
    <div></div>
    <div></div>
  </Burger>
);

export default BurgerMenu;
