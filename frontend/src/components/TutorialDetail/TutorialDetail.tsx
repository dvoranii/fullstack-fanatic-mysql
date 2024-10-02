import React from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";
import { tutorialContent } from "../../assets/tutorialContent";
import Accordion from "../Accordion/Accordion";
import { TutorialDetailWrapper } from "./TutorialDetail.styled";
import Title from "../Title/Title";
import { TutorialContentItem } from "../../types/Tutorial/TutorialContentItem";

const TutorialDetail: React.FC = () => {
  const { id, commentId } = useParams<{ id: string; commentId?: string }>();

  const tutorial: TutorialContentItem | undefined = tutorialContent.find(
    (tutorial) => tutorial.id === Number(id)
  );

  if (!tutorial) {
    return <div>Error: Tutorial not found</div>;
  }

  if (!tutorial.steps) {
    return <div>Error: Steps not found for this tutorial</div>;
  }

  return (
    <TutorialDetailWrapper>
      <Title textContent={tutorial.title} />
      <Accordion steps={tutorial.steps} />
      <CommentSection
        contentId={tutorial.id}
        contentType="tutorial"
        commentId={commentId ? Number(commentId) : undefined}
      />
    </TutorialDetailWrapper>
  );
};

export default TutorialDetail;
