import TutorialDetail from "../../components/TutorialDetail/TutorialDetail";
import { TutorialWrapper } from "./TutorialPage.styled";

const TutorialPage: React.FC = () => {
  return (
    <TutorialWrapper>
      <TutorialDetail />
    </TutorialWrapper>
  );
};

export default TutorialPage;
