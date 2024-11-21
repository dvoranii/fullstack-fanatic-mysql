const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

export interface ValidationRule {
  value: string;
  compareValue?: string;
  type: "username" | "email" | "password" | "confirmPassword";
}

export const validateField = ({
  type,
  value,
  compareValue,
}: ValidationRule): string | null => {
  switch (type) {
    case "username":
      return value ? null : "Please enter a username.";

    case "email":
      if (!value) return "Please enter an email address.";
      return emailRegex.test(value) ? null : "Invalid email format.";

    case "password":
      if (!value) return "Please enter a password.";
      return passwordRegex.test(value)
        ? null
        : "Password must be at least 8 characters long, contain one special character, and one capital letter.";

    case "confirmPassword":
      if (!value) return "Please confirm your password.";
      return value === compareValue ? null : "Passwords do not match.";

    default:
      return null;
  }
};
