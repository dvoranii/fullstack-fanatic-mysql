import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import CommentSection from "../CommentSection/CommentSection";
import { tutorialContent } from "../../assets/tutorialContent";
import Accordion from "../Accordion/Accordion";
import { TutorialDetailWrapper } from "./TutorialDetail.styled";
import { TutorialContentItem } from "../../types/Tutorial/Tutorial";

const TutorialDetail: React.FC = () => {
  const { id, commentId } = useParams<{ id: string; commentId?: string }>();

  const tutorial: TutorialContentItem | undefined = tutorialContent.find(
    (tutorial) => tutorial.id === Number(id)
  );

  if (!tutorial) {
    return (
      <>
        <Helmet>
          <title>Error: Tutorial Not Found - Full Stack Fanatic</title>
          <meta
            name="description"
            content="The requested tutorial could not be found. Explore other tutorials on Full Stack Fanatic!"
          />
        </Helmet>
        <div>Error: Tutorial not found</div>
      </>
    );
  }

  if (!tutorial.steps) {
    return (
      <>
        <Helmet>
          <title>Error: Steps Missing - Full Stack Fanatic</title>
          <meta
            name="description"
            content="The steps for this tutorial are currently unavailable. Please check back later."
          />
        </Helmet>
        <div>Error: Steps not found for this tutorial</div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${tutorial.title} - Full Stack Fanatic`}</title>
        <meta
          name="description"
          content={
            tutorial.description ||
            "Dive into this tutorial on Full Stack Fanatic to learn more."
          }
        />
      </Helmet>
      <TutorialDetailWrapper>
        <h1>{tutorial.title}</h1>
        <Accordion steps={tutorial.steps} />
        <CommentSection
          contentId={tutorial.id}
          contentType="tutorial"
          commentId={commentId ? Number(commentId) : undefined}
        />
      </TutorialDetailWrapper>
    </>
  );
};

export default TutorialDetail;
