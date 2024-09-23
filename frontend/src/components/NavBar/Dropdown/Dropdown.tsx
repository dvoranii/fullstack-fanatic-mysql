import { DropdownWrapper } from "./Dropdown.styled";

interface DropdownProps {
  isVisible: boolean;
  children: React.ReactNode;
  alignRight?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
  isVisible,
  children,
  alignRight = false,
}) => {
  if (!isVisible) {
    return null;
  }

  return <DropdownWrapper alignRight={alignRight}>{children}</DropdownWrapper>;
};

export default Dropdown;
