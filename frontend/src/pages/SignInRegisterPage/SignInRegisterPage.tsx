import { PageWrapper } from "../../global.styled";
import RegisterLoginForm from "./RegisterForm/RegisterLoginForm";

const SignInRegisterPage: React.FC = () => {
  return (
    <PageWrapper>
      <RegisterLoginForm></RegisterLoginForm>
    </PageWrapper>
  );
};

export default SignInRegisterPage;
