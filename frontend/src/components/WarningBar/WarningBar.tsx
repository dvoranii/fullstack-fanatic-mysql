import React, { useState } from "react";
import { WarningBarWrapper, WarningBarWrapperInner, CloseBtnWrapper } from "./WarningBar.styled";

const WarningBar: React.FC = () => {

  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(prev => !prev);
  }


  return (
    <WarningBarWrapper $isVisible={isVisible}>
      <WarningBarWrapperInner>
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
      <CloseBtnWrapper $isVisible={isVisible}>
      <button onClick={handleClose}>
      {isVisible ? '✘' : '+'}
      </button>
      </CloseBtnWrapper>
      </WarningBarWrapperInner>
    </WarningBarWrapper>
  );
};

export default WarningBar;
