import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { BlogDetailWrapper } from "./BlogDetail.styled";
import { blogContent } from "../../assets/blogContent";
import Accordion from "../Accordion/Accordion";
import CommentSection from "../CommentSection/CommentSection";
import { BlogContentItem } from "../../types/Blog/Blog";

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const blog: BlogContentItem | undefined = blogContent.find(
    (blog) => blog.id === Number(id)
  );

  if (!blog) {
    return (
      <>
        <Helmet>
          <title>Error: Blog Not Found - Full Stack Fanatic</title>
          <meta
            name="description"
            content="The requested blog post could not be found. Check out our other blog posts on Full Stack Fanatic!"
          />
        </Helmet>
        <div>Error: Blog not found</div>
      </>
    );
  }

  if (!blog.steps) {
    return (
      <>
        <Helmet>
          <title>Error: Steps Missing - Full Stack Fanatic</title>
          <meta
            name="description"
            content="The steps for this blog post are currently unavailable. Stay tuned for updates!"
          />
        </Helmet>
        <div>Error: Steps not found for this blog</div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{`${blog.title} - Full Stack Fanatic`}</title>
        <meta
          name="description"
          content={
            blog.title ||
            "Read this insightful blog post on Full Stack Fanatic!"
          }
        />
      </Helmet>

      <BlogDetailWrapper>
        <h1>{blog.title}</h1>
        <Accordion steps={blog.steps} />
        <CommentSection contentId={blog.id} contentType="blog" />
      </BlogDetailWrapper>
    </>
  );
};

export default BlogDetail;
