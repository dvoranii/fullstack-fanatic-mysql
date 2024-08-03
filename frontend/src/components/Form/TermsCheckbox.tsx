import React from "react";
import { Link } from "react-router-dom";
import { TermsWrapper } from "./styles/TermsCheckbox.styled";

interface TermsCheckboxProps {
  isChecked: boolean;
  onChange: (checked: boolean) => void;
}

const TermsCheckbox: React.FC<TermsCheckboxProps> = ({
  isChecked,
  onChange,
}) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.checked);
  };

  return (
    <TermsWrapper>
      <input
        type="checkbox"
        id="terms-register"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <label htmlFor="terms-register">
        <span className="checkbox-label">I accept</span>
        <Link to="/terms-conditions" className="terms-link">
          terms & conditions
        </Link>
      </label>
    </TermsWrapper>
  );
};

export default TermsCheckbox;
