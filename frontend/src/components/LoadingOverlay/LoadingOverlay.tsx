import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { Overlay } from "./LoadingOverlay.styled";

const LoadingOverlay = () => (
  <Overlay>
    <LoadingSpinner />
  </Overlay>
);

export default LoadingOverlay;
