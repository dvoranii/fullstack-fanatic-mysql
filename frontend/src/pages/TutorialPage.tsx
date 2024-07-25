import React from "react";
import { useParams } from "react-router-dom";
import TutorialDetail from "../components/TutorialDetail";

const TutorialPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Tutorial Page</h1>
      {id ? (
        <TutorialDetail id={id} />
      ) : (
        <div>Error: Tutorial ID not found</div>
      )}
    </div>
  );
};

export default TutorialPage;
