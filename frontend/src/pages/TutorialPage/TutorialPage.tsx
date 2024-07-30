import React from "react";
import { useParams } from "react-router-dom";
import TutorialDetail from "../../components/TutorialDetail/TutorialDetail";
import { PageWrapper } from "../../global.styled";

const TutorialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <PageWrapper>
      {id ? <TutorialDetail /> : <div>Error: Tutorial ID not found</div>}
    </PageWrapper>
  );
};

export default TutorialPage;
