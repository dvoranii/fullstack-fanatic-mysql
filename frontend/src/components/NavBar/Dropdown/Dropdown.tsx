import { DropdownWrapper } from "./Dropdown.styled";

interface DropdownProps {
  isVisible: boolean;
  children: React.ReactNode;
  alignRight?: boolean;
  width?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  isVisible,
  children,
  alignRight = false,
  width,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <DropdownWrapper alignRight={alignRight} width={width}>
      {children}
    </DropdownWrapper>
  );
};

export default Dropdown;
