import styled from "styled-components";

export const TooltipWrapper = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: default;
`;

export const Tooltip = styled.span`
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #333;
  color: #fff;
  padding: 6px;
  border-radius: 4px;
  font-size: 12px;
  white-space: normal;
  text-align: center;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s ease;
  width: 180px;
  z-index: 1;
  height: fit-content;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-width: 5px;
    border-style: solid;
    border-color: #333 transparent transparent transparent;
  }

`;
