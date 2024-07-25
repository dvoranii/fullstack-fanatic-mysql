import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

interface Tutorial {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

interface TutorialDetailProps {
  id: string;
}

const TutorialDetail: React.FC<TutorialDetailProps> = ({ id }) => {
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);

  useEffect(() => {
    fetch(`/api/tutorials/${id}`)
      .then((response) => response.json())
      .then((data: Tutorial) => setTutorial(data));
  }, [id]);

  if (!tutorial) return <div>Loading...</div>;

  return (
    <div>
      <h1>{tutorial.title}</h1>
      <div>{tutorial.content}</div>
      <CommentSection tutorialId={tutorial.id} />
    </div>
  );
};

export default TutorialDetail;
