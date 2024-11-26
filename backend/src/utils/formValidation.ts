export const validateGenericForm = (
  name: string,
  email: string,
  message: string
) => {
  const errors = [];
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!name) {
    errors.push({ msg: "Please enter your name" });
  }
  if (!email) {
    errors.push({ msg: "Please enter your email" });
  } else if (!emailPattern.test(email)) {
    errors.push({ msg: "Please enter a valid email (e.g., 123@abc.com)" });
  }
  if (!message) {
    errors.push({ msg: "Please enter your message" });
  }

  return errors;
};
