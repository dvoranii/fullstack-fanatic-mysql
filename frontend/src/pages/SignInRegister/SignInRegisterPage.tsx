import { PageWrapper } from "../../PageWrapper.styled";
import RegisterLoginForm from "../../components/RegisterForm/RegisterLoginForm";

interface SignInRegisterPageProps {
  defaultToLogin: boolean;
}
const SignInRegisterPage: React.FC<SignInRegisterPageProps> = ({
  defaultToLogin,
}) => {
  return (
    <PageWrapper>
      <RegisterLoginForm defaultToLogin={defaultToLogin}></RegisterLoginForm>
    </PageWrapper>
  );
};

export default SignInRegisterPage;
