import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";
import { tutorialContent } from "../../assets/tutorialContent";
import Accordion from "../Accordion/Accordion";
import { TutorialDetailWrapper } from "./TutorialDetail.styled";
import Title from "../Title/Title";

interface Tutorial {
  id: number;
  title: string;
  created_at: string;
}

const TutorialDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    fetch(`/api/tutorials/${id}`)
      .then((response) => response.json())
      .then((data: Tutorial) => setTutorial(data));
  }, [id]);

  if (!tutorial) return <div>Loading...</div>;

  const content = tutorialContent[tutorial.id];

  return (
    <TutorialDetailWrapper>
      <Title textContent={tutorial.title}></Title>
      <Accordion steps={content.steps} />
      <CommentSection tutorialId={tutorial.id} />
    </TutorialDetailWrapper>
  );
};

export default TutorialDetail;
