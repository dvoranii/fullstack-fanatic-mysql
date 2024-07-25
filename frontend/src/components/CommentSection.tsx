import React, { useEffect, useState } from "react";

interface Comment {
  id: number;
  tutorial_id: number;
  content: string;
  created_at: string;
}

interface CommentSectionProps {
  tutorialId: number;
}

const CommentSection: React.FC<CommentSectionProps> = ({ tutorialId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`/api/comments/${tutorialId}`)
      .then((response) => response.json())
      .then((data: Comment[]) => setComments(data));
  }, [tutorialId]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch("/api/comments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tutorial_id: tutorialId, content: newComment }),
    })
      .then((response) => response.json())
      .then((data: Comment) => {
        setComments([...comments, data]);
        setNewComment("");
      });
  };

  return (
    <div>
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
};

export default CommentSection;
