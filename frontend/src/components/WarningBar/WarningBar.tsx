import React from "react";
import { WarningBarWrapper } from "./WarningBar.styled";

const WarningBar: React.FC = () => {
  return (
    <WarningBarWrapper>
      <img src="/assets/images/under-construction.png" alt="pylon image" />
      <span>
        Important! This section is currently under construction and the intended
        functionality is not yet implemented.
      </span>
      <img src="/assets/images/under-construction.png" alt="pylon image" />
    </WarningBarWrapper>
  );
};

export default WarningBar;
