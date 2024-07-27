import React from "react";
import { Burger } from "./BurgerMenu.styled";

interface BurgerMenuProps {
  onClick: () => void;
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ onClick }) => (
  <Burger onClick={onClick}>
    <div></div>
    <div></div>
    <div></div>
  </Burger>
);

export default BurgerMenu;
