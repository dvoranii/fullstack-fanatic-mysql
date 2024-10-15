import Title from "../../components/Title/Title";
import { PageWrapper } from "../../PageWrapper.styled";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const HomePage: React.FC = () => {
  const { profile } = useContext(UserContext) || {};

  return (
    <PageWrapper>
      <Title textContent="Home" pseudoRight="4px" pseudoWidth="85px" />
      {!profile && <Link to="register">No account? Sign up!</Link>}
    </PageWrapper>
  );
};

export default HomePage;
