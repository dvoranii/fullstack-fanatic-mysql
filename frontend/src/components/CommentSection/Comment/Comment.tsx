import { useState, useEffect, useContext } from "react";
import {
  CommentWrapper,
  CommentItem,
  CommentContentWrapper,
  CommentActions,
  ProfilePictureWrapper,
  Username,
  LikesWrapper,
  FormTextArea,
  FormButton,
  ReplyFormWrapper,
  TrashBinButton,
} from "./Comment.styled";
import ProfilePicture from "../../ProfilePicture/ProfilePicture";
import { CommentProps } from "../../../types/Comment/CommentProps";
import like1 from "../../../assets/images/like-1.png";
import like2 from "../../../assets/images/like-2.png";
import { UserContext } from "../../../context/UserContext";
import { toggleLike } from "../../../services/commentService";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "../../../assets/images/edit-icon.png";
import DeleteIcon from "../../../assets/images/discard-icon.png";
import ReplyIcon from "../../../assets/images/reply-icon.png";

const Comment: React.FC<CommentProps> = ({
  comment,
  isEditing,
  editedComment,
  handleEditChange,
  onEdit,
  onDelete,
  onSave,
  onCancelEdit,
  isReply,
  children,
  onReplySubmit,
  ...restProps
}) => {
  const { profile } = useContext(UserContext) || {};
  const [isLiked, setIsLiked] = useState(comment.likedByUser ?? false);
  const [likes, setLikes] = useState(comment.likes);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLiked(comment.likedByUser ?? false);
  }, [comment.likedByUser, profile?.id]);

  const handleLikeClick = async () => {
    try {
      const updatedLikes = await toggleLike(comment.id);
      setLikes(updatedLikes);
      setIsLiked((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle like", error);
    }
  };

  const isCommentOwner = profile && Number(profile?.id) === comment.user_id;

  const handleProfileClick = () => {
    if (Number(profile?.id) === comment.user_id) {
      navigate("/my-account");
    } else {
      navigate(`/user/${comment.user_id}`);
    }
  };

  const handleReply = async () => {
    if (replyContent.trim() === "") return;

    try {
      await onReplySubmit(comment.id, replyContent);
      setReplyContent("");
      setShowReplyForm(false);
    } catch (error) {
      console.error("Failed to submit reply", error);
    }
  };

  console.log(children);

  return (
    <CommentWrapper isreply={isReply} {...restProps}>
      <ProfilePictureWrapper onClick={handleProfileClick}>
        <Link to={`/user/${comment.user_id}`}>
          <ProfilePicture
            src={comment.profile_picture}
            alt={comment.user_name || "Username"}
            width="60px"
            border="none"
            bg="black"
          />
        </Link>
        <Link to={`/user/${comment.user_id}`}>
          <Username>{comment.user_name || "Username"}</Username>
        </Link>
      </ProfilePictureWrapper>
      <CommentItem>
        <CommentContentWrapper>
          {isEditing ? (
            <>
              <FormTextArea value={editedComment} onChange={handleEditChange} />
              <CommentActions>
                <FormButton onClick={() => onSave(comment.id)} variant="edit">
                  Save
                </FormButton>
                <FormButton onClick={onCancelEdit} variant="edit">
                  Cancel
                </FormButton>
              </CommentActions>
            </>
          ) : (
            <>
              <p>{comment.content}</p>
              <LikesWrapper>
                <img
                  src={isLiked ? like2 : like1}
                  alt="like icon"
                  onClick={handleLikeClick}
                />
                {likes}
              </LikesWrapper>
            </>
          )}
        </CommentContentWrapper>

        <CommentActions>
          {!isEditing && isCommentOwner && (
            <>
              <FormButton onClick={onEdit}>
                <img src={EditIcon} alt="Edit" title="Edit" />
              </FormButton>
              <FormButton onClick={onDelete}>
                <img src={DeleteIcon} alt="Delete" title="Delete" />
              </FormButton>
            </>
          )}

          {!isEditing && !isCommentOwner && !showReplyForm && (
            <FormButton onClick={() => setShowReplyForm(true)}>
              <img src={ReplyIcon} alt="Reply" title="Reply" />
            </FormButton>
          )}

          {showReplyForm && (
            <ReplyFormWrapper>
              <FormTextArea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write a reply..."
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.5rem",
                }}
              >
                <FormButton onClick={handleReply} variant="submit">
                  Submit Reply
                </FormButton>
                <TrashBinButton onClick={() => setShowReplyForm(false)} />
              </div>
            </ReplyFormWrapper>
          )}
        </CommentActions>

        {/* make sure the unecessary 0 does not render */}
        {children !== 0 && <div style={{ width: "100%" }}>{children}</div>}
      </CommentItem>
    </CommentWrapper>
  );
};

export default Comment;
