import React from "react";
import { WarningBarWrapper } from "./WarningBar.styled";
import UnderContructionIcon from "../../assets/images/under-construction.png";

const WarningBar: React.FC = () => {
  return (
    <WarningBarWrapper>
      <img src={UnderContructionIcon} alt="" />
      <span>
        Important! This section is currently under construction and the intended
        functionality is not yet implemented.
      </span>
      <img src={UnderContructionIcon} alt="" />
    </WarningBarWrapper>
  );
};

export default WarningBar;
