import { RegisterWrapper } from "./SignInRegisterPage.styled";
import { Helmet } from "react-helmet-async";
import RegisterLoginForm from "../../components/RegisterForm/RegisterLoginForm";

interface SignInRegisterPageProps {
  defaultToLogin: boolean;
}
const SignInRegisterPage: React.FC<SignInRegisterPageProps> = ({
  defaultToLogin,
}) => {
  return (
    <>
      <Helmet>
        <title>Sign In/Register - Full Stack Fanatic</title>
        <meta
          name="description"
          content="Sign in to or register for your Full Stack Fanatic user account."
        />
      </Helmet>

      <RegisterWrapper>
        <RegisterLoginForm defaultToLogin={defaultToLogin}></RegisterLoginForm>
      </RegisterWrapper>
    </>
  );
};

export default SignInRegisterPage;
