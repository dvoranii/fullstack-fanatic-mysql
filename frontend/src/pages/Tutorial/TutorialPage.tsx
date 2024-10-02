import React from "react";
import TutorialDetail from "../../components/TutorialDetail/TutorialDetail";
import { PageWrapper } from "../../PageWrapper.styled";

const TutorialPage: React.FC = () => {
  return (
    <PageWrapper>
      <TutorialDetail />
    </PageWrapper>
  );
};

export default TutorialPage;
