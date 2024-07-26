import React from "react";
import { useParams } from "react-router-dom";
import TutorialDetail from "../../components/TutorialDetail/TutorialDetail";
import { TutorialPageWrapper } from "./TutorialPage.styled";

const TutorialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <TutorialPageWrapper>
      {id ? <TutorialDetail /> : <div>Error: Tutorial ID not found</div>}
    </TutorialPageWrapper>
  );
};

export default TutorialPage;
