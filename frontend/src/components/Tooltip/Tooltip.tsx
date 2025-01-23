import { TooltipWrapper, Tooltip } from "./Tooltip.styled";

interface TooltipProps {
  message: string;
  top?: string;
  left?: string;
}

const TooltipComponent: React.FC<TooltipProps> = ({ message, top, left }) => {
  return (
    <TooltipWrapper>
      <Tooltip style={{ top, left }}>{message}</Tooltip>
    </TooltipWrapper>
  );
};

export default TooltipComponent;
