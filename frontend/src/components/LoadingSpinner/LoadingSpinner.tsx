import React from "react";
import { Spinner } from "./LoadingSpinner.styled";

interface LoadingSpinnerProps {
  width?: string;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  width = "50px",
  color = "#3498db",
}) => {
  return <Spinner width={width} color={color} />;
};

export default LoadingSpinner;
