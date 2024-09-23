import styled from "styled-components";

interface DropdownWrapperProps {
  alignRight?: boolean;
}

export const DropdownWrapper = styled.div<DropdownWrapperProps>`
  position: absolute;
  top: 50px;
  ${(props) => (props.alignRight ? "right: 0;" : "left: 0;")}
  background-color: white;
  border-radius: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  width: 220px;
  z-index: 1000;
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
`;
