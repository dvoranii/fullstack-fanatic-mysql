import { Helmet } from "react-helmet";
import { NotFoundWrapper } from "./NotFound.styled";
import { Link } from "react-router-dom";
import TitleBanner from "../../components/TitleBanner/TitleBanner";

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - Full Stack Fanatic</title>
        <meta name="description" content="404 page not found." />
      </Helmet>
      <TitleBanner textContent="Oops!" centered={true} />
      <NotFoundWrapper>
        <h1>404 - Page Not Found</h1>
        <p>Looks like the page you are trying to reach doesn't exist.</p>
        <Link to="/">Go back to Home</Link>
      </NotFoundWrapper>
    </>
  );
};

export default NotFound;
