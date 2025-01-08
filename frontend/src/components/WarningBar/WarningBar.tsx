import React from "react";
import { WarningBarWrapper } from "./WarningBar.styled";

const WarningBar: React.FC = () => {
  return (
    <WarningBarWrapper>
      <img
        src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/under-construction.png"
        alt="pylon image"
      />
      <span>
        Important! This section is currently under construction and the intended
        functionality is not yet implemented.
      </span>
      <img
        src="https://fsf-assets.tor1.cdn.digitaloceanspaces.com/assets/static/images/misc/under-construction.png"
        alt="pylon image"
      />
    </WarningBarWrapper>
  );
};

export default WarningBar;
