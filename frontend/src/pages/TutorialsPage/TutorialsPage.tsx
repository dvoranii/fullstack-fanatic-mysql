import React, { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import { PageWrapper } from "../../global.styled";
import { TutorialList, TutorialThumbnail } from "./TutorialsPage.styled";

interface Tutorial {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

const TutorialsPage: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);

  useEffect(() => {
    fetch("/api/tutorials")
      .then((response) => response.json())
      .then((data) => setTutorials(data));
  }, []);

  return (
    <PageWrapper>
      <Title textContent="Tutorials" />
      <TutorialList>
        {tutorials.map((tutorial) => (
          <TutorialThumbnail to={`/tutorial/${tutorial.id}`} key={tutorial.id}>
            <h2>{tutorial.title}</h2>
          </TutorialThumbnail>
        ))}
      </TutorialList>
    </PageWrapper>
  );
};

export default TutorialsPage;
