import TutorialDetail from "../../components/TutorialDetail/TutorialDetail";
import { TutorialWrapper } from "./TutorialPage.styled";
// import { PageWrapper } from "../../PageWrapper.styled";

const TutorialPage: React.FC = () => {
  return (
    // <PageWrapper>
    <TutorialWrapper>
      <TutorialDetail />
    </TutorialWrapper>

    // </PageWrapper>
  );
};

export default TutorialPage;
