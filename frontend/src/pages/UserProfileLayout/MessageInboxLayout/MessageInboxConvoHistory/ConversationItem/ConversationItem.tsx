import React from "react";
import {
  ConversationWrapper,
  ProfilePictureWrapper,
  ConversationDetailsWrapper,
  SubjectPreview,
  DeleteConvoButtonWrapper,
} from "./ConversationItem.styled";
import ProfilePicture from "../../../../../components/ProfilePicture/ProfilePicture";
import DiscardIcon from "../../../../../assets/images/discard-icon.png";
import { Conversation } from "../../../../../types/Conversations";

interface ConversationItemProps {
  conversation: Conversation;
  userName: string;
  userPicture: string;
  onSelect: (conversationId: number) => void;
  onDelete: (conversationId: number) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  userName,
  userPicture,
  onSelect,
  onDelete,
}) => {
  const handleSelect = () => {
    onSelect(conversation.id);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onDelete(conversation.id);
  };

  return (
    <ConversationWrapper onClick={handleSelect}>
      <ProfilePictureWrapper>
        <ProfilePicture
          src={userPicture || ""}
          alt="User Profile Picture"
          width="45px"
          border="2px solid #ccc"
          bg="#ffffff"
        />
      </ProfilePictureWrapper>

      <ConversationDetailsWrapper>
        <p>{userName || `User ${conversation.user2_id}`}</p>
        <SubjectPreview>{conversation.subject || "No subject"}</SubjectPreview>
      </ConversationDetailsWrapper>

      <DeleteConvoButtonWrapper>
        <button className="delete-button" onClick={handleDelete}>
          <img src={DiscardIcon} alt="Delete Conversation" title="Delete" />
        </button>
      </DeleteConvoButtonWrapper>
    </ConversationWrapper>
  );
};

export default ConversationItem;
