import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <PageWrapper>
      <Title textContent="Home" />
      <Link to="register">No account? Sign up!</Link>
    </PageWrapper>
  );
};

export default HomePage;
